#!/usr/bin/env python3
"""Static file server for ./serve, with the non-content paths blocked.

`python3 -m http.server` serves every file under the repository root and
links every file from its generated directory listings. That included
`.nightowl-backups/` (8,000+ editor backups, 286 MB), `_students/` (student
records), and `_readings/` (set texts in copyright). Any client that walked
a directory listing could pull all of them.

This server blocks three kinds of path, at the request and in the listings:

  * any path component that starts with "." — `.git`, `.nightowl-backups`
  * any path component that starts with "_" — hidden content, except the
    generated index page `_preview.html`
  * any file name that ends with ".bak" — editor backups

A blocked path gets 404. A blocked name never appears in a directory
listing, so nothing can find it to request in the first place.

Pass --include-hidden to preview a page under a `_*` folder. The dot-path
rule and the ".bak" rule stay on.

Usage: preview_server.py [PORT] [--include-hidden]
"""

import html
import io
import os
import sys
import urllib.parse
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

INDEX_NAME = "_preview.html"


def blocked_name(name, include_hidden):
    """True when this single path component must never be served."""
    if name == INDEX_NAME:
        return False
    if name.startswith("."):
        return True
    if name.endswith(".bak"):
        return True
    if not include_hidden and name.startswith("_"):
        return True
    return False


def blocked_path(url_path, include_hidden):
    """True when any component of this URL path must never be served."""
    path = url_path.split("?", 1)[0].split("#", 1)[0]
    path = urllib.parse.unquote(path, errors="surrogatepass")
    return any(
        blocked_name(part, include_hidden)
        for part in path.split("/")
        if part not in ("", ".", "..")
    )


class PreviewHandler(SimpleHTTPRequestHandler):
    include_hidden = False

    def send_head(self):
        if blocked_path(self.path, self.include_hidden):
            self.send_error(HTTPStatus.NOT_FOUND, "Not served by ./serve")
            return None
        return super().send_head()

    def list_directory(self, path):
        try:
            names = os.listdir(path)
        except OSError:
            self.send_error(HTTPStatus.NOT_FOUND, "No permission to list directory")
            return None

        rows = []
        for name in sorted(names, key=lambda n: n.lower()):
            if blocked_name(name, self.include_hidden):
                continue
            link = name + "/" if os.path.isdir(os.path.join(path, name)) else name
            rows.append(
                '<li><a href="%s">%s</a></li>'
                % (
                    urllib.parse.quote(link, errors="surrogatepass"),
                    html.escape(link, quote=False),
                )
            )

        where = html.escape(
            urllib.parse.unquote(self.path, errors="surrogatepass"), quote=False
        )
        body = (
            "<!doctype html>\n"
            '<html lang="en"><head><meta charset="utf-8">\n'
            "<title>%s</title>\n"
            "<style>body{font-family:ui-monospace,monospace;margin:2rem;line-height:1.6}"
            "ul{list-style:none;padding-left:0}</style>\n"
            "</head><body>\n<h1>%s</h1>\n<ul>\n%s\n</ul>\n</body></html>\n"
            % (where, where, "\n".join(rows))
        )
        encoded = body.encode("utf-8", "surrogateescape")

        self.send_response(HTTPStatus.OK)
        self.send_header("Content-type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(encoded)))
        self.end_headers()
        return io.BytesIO(encoded)


def main(argv):
    port = 8000
    include_hidden = False

    for arg in argv[1:]:
        if arg == "--include-hidden":
            include_hidden = True
        elif arg.isdigit():
            port = int(arg)
        else:
            print("preview_server.py: unknown argument %s" % arg, file=sys.stderr)
            return 2

    PreviewHandler.include_hidden = include_hidden
    # Bind to the loopback address only. The old server listened on every
    # interface, so the whole local network could read the repository.
    server = ThreadingHTTPServer(("127.0.0.1", port), PreviewHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print()
    finally:
        server.server_close()
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))

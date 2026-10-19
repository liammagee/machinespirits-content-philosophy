#!/usr/bin/env python3
"""Load board documents into the machinespirits.org store (/api/boards), e.g. to move the claude.ai artifact data across.

    BOARDS_ADMIN_KEY=... python3 import_to_site.py EXPORT_DIR BOARD [--base https://machinespirits.org]

EXPORT_DIR holds <collection>/<doc id>.json files, as an ArtifactData list with out_dir writes them.
BOARD is epol590-map (students, terms, papers) or epol590-respond (prompts, answers).
Never commit an export: it can hold student names.
"""
import json, os, pathlib, sys, urllib.request

CHUNK = 20  # stays under the site's 100 KB JSON body limit


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    base = sys.argv[sys.argv.index("--base") + 1] if "--base" in sys.argv else "https://machinespirits.org"
    if len(args) < 2 or "BOARDS_ADMIN_KEY" not in os.environ:
        sys.exit(__doc__)
    root, board = pathlib.Path(args[0]), args[1]
    docs = [{"path": f"{f.parent.name}/{f.stem}", "data": json.loads(f.read_text())} for f in sorted(root.glob("*/*.json"))]
    for i in range(0, len(docs), CHUNK):
        body = json.dumps({"docs": docs[i:i + CHUNK]}).encode()
        req = urllib.request.Request(f"{base}/api/boards/{board}/import", data=body, method="POST",
                                     headers={"Content-Type": "application/json", "X-Admin-Key": os.environ["BOARDS_ADMIN_KEY"]})
        with urllib.request.urlopen(req) as r:
            print(f"{board}: imported {json.load(r)['count']} documents ({i + 1}-{min(i + CHUNK, len(docs))} of {len(docs)})")


if __name__ == "__main__":
    main()

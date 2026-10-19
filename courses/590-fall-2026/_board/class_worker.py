#!/usr/bin/env python3
"""Class worker for the constellation board while it runs on claude.ai, where the page cannot reach OpenAlex.

Give it the board's interests (terms) as JSON; it searches OpenAlex for each one and writes one JSON file per
paper, plus a batch list that Claude applies to the board with the ArtifactData tool.

    python3 class_worker.py terms.json OUT_DIR [--existing W123,W456]

terms.json is a list of {"key": ..., "label": ...}. Papers already on the board (--existing) are skipped.
Once the board is hosted on machinespirits.org, the page's own background worker does this instead.
"""
import datetime, json, pathlib, sys, urllib.parse, urllib.request

SELECT = "id,title,publication_year,doi,authorships,primary_location,abstract_inverted_index,open_access,best_oa_location"


def uninvert(idx):
    if not idx:
        return ""
    words = {}
    for w, positions in idx.items():
        for i in positions:
            words[i] = w
    return " ".join(words[i] for i in sorted(words))


def search(label, since, per_page=5):
    label = label.replace("?", " ").replace("*", " ").strip()  # OpenAlex reads ? and * as wildcards
    q = urllib.parse.urlencode({"search": label, "filter": f"from_publication_date:{since},type:article",
                                "sort": "relevance_score:desc", "per-page": per_page, "select": SELECT})
    with urllib.request.urlopen("https://api.openalex.org/works?" + q, timeout=30) as r:
        return json.load(r).get("results", [])


def paper(w, key, now):
    authors = [a["author"]["display_name"] for a in (w.get("authorships") or [])[:8] if a.get("author")]
    best = w.get("best_oa_location") or {}
    return {"id": w["id"].split("/")[-1], "title": w["title"], "year": w.get("publication_year"), "doi": w.get("doi") or "",
            "url": w["id"], "venue": ((w.get("primary_location") or {}).get("source") or {}).get("display_name") or "",
            "authors": ", ".join(authors) + (" et al." if len(w.get("authorships") or []) > 8 else ""),
            "abstract": uninvert(w.get("abstract_inverted_index"))[:4000],
            "oaUrl": best.get("landing_page_url") or best.get("pdf_url") or (w.get("open_access") or {}).get("oa_url") or "",
            "terms": [key], "addedAt": now}


def main():
    terms = json.loads(pathlib.Path(sys.argv[1]).read_text())
    out = pathlib.Path(sys.argv[2]); out.mkdir(parents=True, exist_ok=True)
    existing = set(sys.argv[sys.argv.index("--existing") + 1].split(",")) if "--existing" in sys.argv else set()
    now = datetime.datetime.now(datetime.timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z")
    since = (datetime.date.today() - datetime.timedelta(days=730)).isoformat()
    writes, seen = [], {}
    for t in terms:
        try:
            results = search(t["label"], since)
        except Exception as e:  # one bad query should not stop the rest
            print(f"skipped {t['label']!r}: {e}")
            continue
        for w in results:
            if not w.get("title"):
                continue
            p = paper(w, t["key"], now)
            if p["id"] in existing:
                continue
            if p["id"] in seen:  # found by two interests: link it to both
                seen[p["id"]]["terms"].append(t["key"])
                continue
            seen[p["id"]] = p
        writes.append({"op": "update", "collection": "terms", "doc_id": t["key"], "data": {"fetchedAt": now, "searchingAt": ""}})
    for pid, p in seen.items():
        f = out / f"{pid}.json"; f.write_text(json.dumps(p))
        writes.append({"op": "set", "collection": "papers", "doc_id": pid, "file_path": str(f.resolve())})
        print(f"{p['year']}  {p['title'][:80]}  [{', '.join(p['terms'])}]")
    (out / "batch.json").write_text(json.dumps(writes, indent=1))
    print(f"{len(seen)} papers, {len(writes)} writes -> {out / 'batch.json'}")


if __name__ == "__main__":
    main()

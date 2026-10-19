#!/usr/bin/env python3
"""Build the private EPOL 590 weekly check from Canvas data.

    python3 build.py canvas.json notes.json OUT.html

canvas.json is what gather.js returns in a logged-in Canvas tab. notes.json holds the week's judgment calls:
{"heading": "Week 2 check", "focus": "2 Review design method and scope", "todo": [["When", "What"], ...]}.
Each assignment's Canvas due date is checked against the Evaluation table in ../../syllabus.md.
OUT.html holds student names and activity, so write it under the gitignored _students/ folder, never elsewhere.
"""
import json, pathlib, re, sys
from datetime import date

HERE = pathlib.Path(__file__).parent
MONTHS = {m: i for i, m in enumerate(["January", "February", "March", "April", "May", "June", "July", "August",
                                      "September", "October", "November", "December"], 1)}


def syllabus_dates():
    text = (HERE / "../../syllabus.md").read_text()
    out = {}
    for name, when in re.findall(r"^\| (\d [^|]+?|Peer review of Task \d) \| [^|]+ \| \w+ (\d+ \w+) \|$", text, re.M):
        day, month = when.split()
        out[key(name)] = date(2026, MONTHS[month], int(day)).isoformat()
    return out


def key(name):
    m = re.match(r"(\d) ", name) or re.match(r"Peer review of Task (\d)", name)
    return ("peer-" if name.startswith("Peer") else "task-") + m.group(1)


def main(canvas, notes, out):
    data = json.loads(pathlib.Path(canvas).read_text())
    data.update(json.loads(pathlib.Path(notes).read_text()))
    syl = syllabus_dates()
    data["assignments"] = [a + [syl.get(key(a[0]), "")] for a in data["assignments"]]
    html = (HERE / "template.html").read_text().replace("/*REPORT*/null", json.dumps(data, ensure_ascii=False))
    pathlib.Path(out).write_text(html)
    print(f"wrote {out}: {len(data['students'])} students, {len(data['assignments'])} assignments, syllabus dates for {len(syl)}")


if __name__ == "__main__":
    main(*sys.argv[1:4])

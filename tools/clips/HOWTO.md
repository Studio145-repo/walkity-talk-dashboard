# Clip helpers — quick ref
Studio-owned media only. Don't paste whole transcripts into chat; grep them.
```bash
python3 -m venv .venv && . .venv/bin/activate && pip install -r tools/clips/requirements.txt   # once
python tools/clips/transcribe.py IN.mp4 --model small     # out/IN.txt .srt .json(word times); --model tiny = fast draft
grep -n -i "keyword" out/IN.txt                           # find moments -> [start-end] text
tools/clips/scenes.sh IN.mp4 out                          # out/IN-Scenes.csv (cut times); add --split for files
tools/clips/cut.sh IN.mp4 00:01:10.2 00:01:48.9 out/clip01.mp4   # add --fast for no re-encode
```
Flow: grep hit → snap start/end to nearest scene in CSV (or word time in .json) → cut.sh.
Report back only: clip file, start–end, one-line quote.
Notes: keep `av<16` (newer breaks faster-whisper). Variable-frame-rate video = slightly off scene times. Needs ffmpeg on PATH.

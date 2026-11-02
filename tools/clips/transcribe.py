#!/usr/bin/env python3
"""transcribe.py IN [--model small] [--out DIR] -> DIR/NAME.txt .srt .json (word timestamps)."""
import argparse, json, os
from faster_whisper import WhisperModel
a = argparse.ArgumentParser(); a.add_argument("inp"); a.add_argument("--model", default="small")
a.add_argument("--out", default="out"); a.add_argument("--lang", default=None); x = a.parse_args()
os.makedirs(x.out, exist_ok=True); base = os.path.join(x.out, os.path.splitext(os.path.basename(x.inp))[0])
m = WhisperModel(x.model, device="cpu", compute_type="int8")
segs, info = m.transcribe(x.inp, vad_filter=True, word_timestamps=True, language=x.lang)
ts = lambda s: f"{int(s//3600):02}:{int(s%3600//60):02}:{s%60:06.3f}".replace(".", ",")
J = []
with open(base + ".txt", "w") as t, open(base + ".srt", "w") as s:
    for i, g in enumerate(segs, 1):
        txt = g.text.strip()
        t.write(f"[{g.start:.2f}-{g.end:.2f}] {txt}\n")
        s.write(f"{i}\n{ts(g.start)} --> {ts(g.end)}\n{txt}\n\n")
        J.append({"start": round(g.start, 2), "end": round(g.end, 2), "text": txt,
                  "words": [{"w": w.word.strip(), "s": round(w.start, 2), "e": round(w.end, 2)} for w in (g.words or [])]})
json.dump({"lang": info.language, "duration": info.duration, "segments": J}, open(base + ".json", "w"), ensure_ascii=False)
print(f"{base}.txt/.srt/.json  segs={len(J)} lang={info.language} dur={info.duration:.1f}s")

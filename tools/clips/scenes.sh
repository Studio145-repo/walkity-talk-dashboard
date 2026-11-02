#!/usr/bin/env bash
# scenes.sh IN [OUTDIR] [--split]  -> OUTDIR/NAME-Scenes.csv (+ per-scene mp4 with --split)
set -euo pipefail; IN=$1; OUT=${2:-out}; mkdir -p "$OUT"
if [[ "${3:-}" == "--split" ]]; then scenedetect -q -i "$IN" -o "$OUT" detect-adaptive list-scenes split-video
else scenedetect -q -i "$IN" -o "$OUT" detect-adaptive list-scenes; fi
ls "$OUT"/*Scenes.csv

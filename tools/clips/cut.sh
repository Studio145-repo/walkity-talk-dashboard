#!/usr/bin/env bash
# cut.sh IN START END OUT.mp4 [--fast]   times as HH:MM:SS(.ms) or seconds
# default re-encodes (frame-accurate); --fast = stream copy (snaps to keyframes)
set -euo pipefail; IN=$1; S=$2; E=$3; O=$4
if [[ "${5:-}" == "--fast" ]]; then ffmpeg -loglevel error -y -ss "$S" -to "$E" -i "$IN" -c copy "$O"
else ffmpeg -loglevel error -y -ss "$S" -to "$E" -i "$IN" -c:v libx264 -crf 18 -preset veryfast -c:a aac -b:a 160k "$O"; fi
echo "$O"

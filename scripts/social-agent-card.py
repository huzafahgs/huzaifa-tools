#!/usr/bin/env python3
"""Create an original, text-led JPEG card using only local fonts and Pillow."""
import json
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

state_dir = Path(sys.argv[1] if len(sys.argv) > 1 else "data/social-agent")
plan = json.loads((state_dir / "today.json").read_text(encoding="utf-8"))
tool = plan["tool"]
out = state_dir / plan["asset"]["imagePath"]
out.parent.mkdir(parents=True, exist_ok=True)

W, H = 1080, 1350
image = Image.new("RGB", (W, H), "#090909")
draw = ImageDraw.Draw(image)
gold = "#D7B56D"
muted = "#B5B0A5"
white = "#F6F3EC"
draw.rounded_rectangle((58, 58, W - 58, H - 58), radius=28, outline="#5B4927", width=3)
logo_path = Path(__file__).resolve().parents[1] / "public" / "logo.png"
logo = Image.open(logo_path).convert("RGBA")
logo.thumbnail((145, 145), Image.Resampling.LANCZOS)
image.paste(logo, (102, 78), logo)
draw.text((278, 112), "A QUICK TOOL TIP", fill=muted, font=ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 22))

font_path = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
body_path = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
title_font = ImageFont.truetype(font_path, 66)
body_font = ImageFont.truetype(body_path, 35)
small_font = ImageFont.truetype(body_path, 25)

def wrap(text, font, max_width):
    words, lines, current = text.split(), [], ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if draw.textbbox((0, 0), candidate, font=font)[2] <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines

y = 350
for line in wrap(tool["name"], title_font, 850):
    draw.text((104, y), line, font=title_font, fill=white)
    y += 86
y += 35
for line in wrap(tool["description"], body_font, 820):
    draw.text((104, y), line, font=body_font, fill=muted)
    y += 53

draw.rounded_rectangle((104, 900, W - 104, 1010), radius=22, fill="#241D0F", outline=gold, width=2)
draw.text((145, 931), "Try a small example. Review the result.", font=small_font, fill=white)
draw.text((104, 1116), "Free utilities for work, study & development", font=small_font, fill=muted)
draw.text((104, 1178), "ai-tools-by-huzaifa.vercel.app", font=small_font, fill=gold)
draw.text((104, 1254), "Check the output before relying on it.", font=small_font, fill="#8E897F")
image.save(out, format="JPEG", quality=90, optimize=True, progressive=True)
print(f"Created {out} ({out.stat().st_size} bytes)")

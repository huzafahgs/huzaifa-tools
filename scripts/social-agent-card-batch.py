#!/usr/bin/env python3
"""Render and verify the 30 JPEG previews with the existing branded card renderer."""
import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path
from PIL import Image

state_dir = Path(sys.argv[1] if len(sys.argv) > 1 else 'data/social-agent')
repo_root = Path(__file__).resolve().parents[1]
renderer = repo_root / 'scripts' / 'social-agent-card.py'
queue = json.loads((state_dir / 'queue.json').read_text(encoding='utf-8'))
output_dir = state_dir / 'assets'
output_dir.mkdir(parents=True, exist_ok=True)
if len(queue.get('items', [])) != 30:
    raise SystemExit('Refusing batch render: queue must contain exactly 30 plans.')
for plan in queue['items']:
    with tempfile.TemporaryDirectory(prefix='hgs-social-card-') as tmp:
        work = Path(tmp)
        (work / 'today.json').write_text(json.dumps(plan, ensure_ascii=False), encoding='utf-8')
        subprocess.run([sys.executable, str(renderer), str(work)], check=True, cwd=repo_root)
        produced = work / plan['asset']['imagePath']
        if not produced.is_file():
            raise SystemExit(f'Missing JPEG for {plan["id"]}')
        with Image.open(produced) as image:
            if image.format != 'JPEG' or image.size != (1080, 1350):
                raise SystemExit(f'Invalid branded JPEG for {plan["id"]}: {image.format} {image.size}')
            image.verify()
        target = output_dir / Path(plan['asset']['imagePath']).name
        shutil.copy2(produced, target)
        if target.stat().st_size < 1000:
            raise SystemExit(f'JPEG too small: {target}')
print(f'Created and verified {len(queue["items"])} premium black/gold JPEG cards at 1080×1350 using the unchanged official logo.')

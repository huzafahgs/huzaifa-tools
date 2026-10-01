import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

test('social preview storyboard is continuous and exactly 20 seconds', () => {
  const stateDir = fs.mkdtempSync(path.join(os.tmpdir(), 'hgs-social-preview-'));

  try {
    execFileSync(process.execPath, ['scripts/social-agent.mjs', 'plan'], {
      cwd: process.cwd(),
      env: { ...process.env, SOCIAL_STATE_DIR: stateDir },
      stdio: 'pipe',
    });

    const plan = JSON.parse(fs.readFileSync(path.join(stateDir, 'today.json'), 'utf8'));
    const ranges = plan.youtube.shortVideoScript.map(({ seconds }) =>
      seconds.split('–').map(Number));

    assert.equal(ranges[0][0], 0);
    assert.equal(ranges.at(-1)[1], 20);
    for (let index = 1; index < ranges.length; index += 1) {
      assert.equal(ranges[index - 1][1], ranges[index][0]);
    }
  } finally {
    fs.rmSync(stateDir, { recursive: true, force: true });
  }
});

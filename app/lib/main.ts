import { Settings } from './config';
import { State } from './state';
import { ensureLayerCount, Layer } from './layers';
import { initUI, syncControls } from './ui';
import { initInput } from './input';
import { createPerlin } from './noise';
import { applyContextLimits } from './context';
import { bindCanvas, resize } from './main-canvas';
import { loop } from './main-loop';
import { setupHotkeys } from './main-hotkeys';

export function boot() {
  if (typeof window === 'undefined') return;
  bindCanvas();
  resize();
  for (let i=0; i<Settings.wave.count; i++) State.layers.push(new Layer(i));
  State.desiredWaveCount = Settings.wave.count;
  ensureLayerCount();
  State.perlin = createPerlin(Settings.turbulence.seed);
  initUI();
  initInput();
  State.ro = new ResizeObserver(() => resize());
  if (State.canvas) State.ro.observe(State.canvas);
  State.last = performance.now();
  applyContextLimits();
  syncControls();
  requestAnimationFrame(loop);
  window.addEventListener('resize', resize);
  setupHotkeys();
}

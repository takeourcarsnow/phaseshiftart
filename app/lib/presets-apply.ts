import { Settings, SettingsShape } from './config';
import { State } from './state';
import { ensureLayerCount } from './layers';
import { setStride } from './samples';
import { applyContextLimits } from './context';

export function currentPresetObject() {
  return JSON.parse(JSON.stringify(Settings));
}

export function applyPreset(p:Partial<SettingsShape>, perlin:any) {
  Object.assign(Settings.wave, p.wave || {});
  State.desiredWaveCount = Math.round(Settings.wave.count);
  Object.assign(Settings.turbulence, p.turbulence || {});
  Object.assign(Settings.interaction, p.interaction || {});
  Object.assign(Settings.physics, p.physics || {});
  Object.assign(Settings.visual, p.visual || {});
  Object.assign(Settings.system, p.system || {});
  ensureLayerCount();
  if (typeof Settings.turbulence.seed === 'number' && perlin) perlin.reseed(Settings.turbulence.seed);
  setStride(Settings.system.detail);
  applyContextLimits();
}
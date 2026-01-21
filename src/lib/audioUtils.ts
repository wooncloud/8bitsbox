import * as Tone from 'tone';
import type { Channel } from '@/store/useSequencerStore';

/**
 * 채널 타입에 따라 적절한 Synth 인스턴스 생성
 */
export function createSynthForChannel(
  channel: Channel
): Tone.Synth | Tone.NoiseSynth {
  if (channel.type === 'noise') {
    // Noise 채널: NoiseSynth 사용
    return new Tone.NoiseSynth({
      noise: { type: 'white' },
      envelope: {
        attack: 0.001,
        decay: 0.2,
        sustain: 0,
      },
    }).toDestination();
  } else {
    // Pulse, Triangle 채널: 일반 Synth 사용
    return new Tone.Synth({
      oscillator: {
        type: channel.waveform,
      },
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.3,
        release: 0.1,
      },
    }).toDestination();
  }
}

/**
 * 채널별 Synth 맵 생성
 */
export function createSynthMap(
  channels: Channel[]
): Map<string, Tone.Synth | Tone.NoiseSynth> {
  const synthMap = new Map<string, Tone.Synth | Tone.NoiseSynth>();
  channels.forEach((channel) => {
    synthMap.set(channel.id, createSynthForChannel(channel));
  });
  return synthMap;
}

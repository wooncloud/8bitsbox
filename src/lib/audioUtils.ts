import { Synth, NoiseSynth } from 'tone/build/esm/index';
import type { Channel } from '@/store/useSequencerStore';

/**
 * 채널 타입에 따라 적절한 Synth 인스턴스 생성
 */
export function createSynthForChannel(
  channel: Channel
): Synth | NoiseSynth {
  if (channel.type === 'noise') {
    // Noise 채널: NoiseSynth 사용
    return new NoiseSynth({
      noise: { type: 'white' },
      envelope: {
        attack: channel.envelope.attack,
        decay: channel.envelope.decay,
        sustain: channel.envelope.sustain,
        release: channel.envelope.release,
      },
    }).toDestination();
  } else {
    // Pulse, Triangle 채널: 일반 Synth 사용
    return new Synth({
      oscillator: {
        type: channel.waveform,
      },
      envelope: {
        attack: channel.envelope.attack,
        decay: channel.envelope.decay,
        sustain: channel.envelope.sustain,
        release: channel.envelope.release,
      },
    }).toDestination();
  }
}

/**
 * 채널별 Synth 맵 생성
 */
export function createSynthMap(
  channels: Channel[]
): Map<string, Synth | NoiseSynth> {
  const synthMap = new Map<string, Synth | NoiseSynth>();
  channels.forEach((channel) => {
    synthMap.set(channel.id, createSynthForChannel(channel));
  });
  return synthMap;
}

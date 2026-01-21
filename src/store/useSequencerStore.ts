import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface NoteStep {
  isActive: boolean;
  pitch: string; // 예: "C4"
}

export interface Channel {
  id: string;
  name: string;
  type: 'pulse' | 'triangle' | 'noise';
  waveform: 'square' | 'sine' | 'triangle' | 'sawtooth';
  steps: NoteStep[]; // 16 steps
  volume: number;
  mute: boolean;
}

export interface SequencerState {
  channels: Channel[];
  bpm: number;
  isPlaying: boolean;
  currentStep: number;
  // Actions
  toggleStep: (channelId: string, stepIndex: number) => void;
  setPitch: (channelId: string, stepIndex: number, pitch: string) => void;
  setBpm: (bpm: number) => void;
  setVolume: (channelId: string, volume: number) => void;
  toggleMute: (channelId: string) => void;
  setWaveform: (channelId: string, waveform: Channel['waveform']) => void;
  play: () => void;
  stop: () => void;
  setCurrentStep: (step: number) => void;
  clearChannel: (channelId: string) => void;
  clearAll: () => void;
}

// 16개 스텝 초기화 함수
const createEmptySteps = (pitch: string = 'C4'): NoteStep[] => {
  return Array.from({ length: 16 }, () => ({
    isActive: false,
    pitch,
  }));
};

// 초기 4개 채널 데이터 생성
const initialChannels: Channel[] = [
  {
    id: 'pulse1',
    name: 'Pulse 1',
    type: 'pulse',
    waveform: 'square',
    steps: createEmptySteps('C4'),
    volume: 0.5,
    mute: false,
  },
  {
    id: 'pulse2',
    name: 'Pulse 2',
    type: 'pulse',
    waveform: 'square',
    steps: createEmptySteps('E4'),
    volume: 0.5,
    mute: false,
  },
  {
    id: 'triangle',
    name: 'Triangle',
    type: 'triangle',
    waveform: 'triangle',
    steps: createEmptySteps('C3'),
    volume: 0.5,
    mute: false,
  },
  {
    id: 'noise',
    name: 'Noise',
    type: 'noise',
    waveform: 'sawtooth',
    steps: createEmptySteps('C4'),
    volume: 0.5,
    mute: false,
  },
];

export const useSequencerStore = create<SequencerState>()(
  persist(
    (set) => ({
      channels: initialChannels,
      bpm: 120,
      isPlaying: false,
      currentStep: 0,

      // 스텝 토글 (활성화/비활성화)
      toggleStep: (channelId: string, stepIndex: number) =>
        set((state) => ({
          channels: state.channels.map((channel) =>
            channel.id === channelId
              ? {
                  ...channel,
                  steps: channel.steps.map((step, idx) =>
                    idx === stepIndex
                      ? { ...step, isActive: !step.isActive }
                      : step
                  ),
                }
              : channel
          ),
        })),

      // 특정 스텝의 피치 변경
      setPitch: (channelId: string, stepIndex: number, pitch: string) =>
        set((state) => ({
          channels: state.channels.map((channel) =>
            channel.id === channelId
              ? {
                  ...channel,
                  steps: channel.steps.map((step, idx) =>
                    idx === stepIndex ? { ...step, pitch } : step
                  ),
                }
              : channel
          ),
        })),

      // BPM 설정
      setBpm: (bpm: number) =>
        set({ bpm: Math.max(60, Math.min(200, bpm)) }),

      // 채널 볼륨 설정
      setVolume: (channelId: string, volume: number) =>
        set((state) => ({
          channels: state.channels.map((channel) =>
            channel.id === channelId
              ? { ...channel, volume: Math.max(0, Math.min(1, volume)) }
              : channel
          ),
        })),

      // 채널 음소거 토글
      toggleMute: (channelId: string) =>
        set((state) => ({
          channels: state.channels.map((channel) =>
            channel.id === channelId
              ? { ...channel, mute: !channel.mute }
              : channel
          ),
        })),

      // 파형 변경
      setWaveform: (channelId: string, waveform: Channel['waveform']) =>
        set((state) => ({
          channels: state.channels.map((channel) =>
            channel.id === channelId ? { ...channel, waveform } : channel
          ),
        })),

      // 재생 시작
      play: () => set({ isPlaying: true }),

      // 재생 정지
      stop: () => set({ isPlaying: false, currentStep: 0 }),

      // 현재 스텝 설정 (시퀀서 진행용)
      setCurrentStep: (step: number) => set({ currentStep: step % 16 }),

      // 특정 채널 클리어
      clearChannel: (channelId: string) =>
        set((state) => ({
          channels: state.channels.map((channel) =>
            channel.id === channelId
              ? {
                  ...channel,
                  steps: channel.steps.map((step) => ({
                    ...step,
                    isActive: false,
                  })),
                }
              : channel
          ),
        })),

      // 모든 채널 클리어
      clearAll: () =>
        set((state) => ({
          channels: state.channels.map((channel) => ({
            ...channel,
            steps: channel.steps.map((step) => ({
              ...step,
              isActive: false,
            })),
          })),
          currentStep: 0,
        })),
    }),
    {
      name: '8bitsbox-storage',
    }
  )
);

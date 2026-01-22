'use client';

import { useEffect, useRef } from 'react';
import { Loop, Synth, NoiseSynth, Transport, Draw, gainToDb, start } from 'tone';
import { useSequencerStore } from '@/store/useSequencerStore';
import { createSynthMap } from '@/lib/audioUtils';

/**
 * Tone.js 오디오 엔진 훅
 * - 4개 채널별 Synth 인스턴스 관리
 * - Tone.Transport 기반 16스텝 루프 구현
 * - BPM 동기화 및 재생/정지 처리
 */
export function useAudioEngine() {
  const synthsRef = useRef<Map<string, Synth | NoiseSynth>>(
    new Map()
  );
  const loopRef = useRef<Loop | null>(null);
  const stepRef = useRef(0);
  const isInitializedRef = useRef(false);

  const { channels, bpm, isPlaying, setCurrentStep } = useSequencerStore();
  const channelsRef = useRef(channels);

  // 최신 channels 상태를 ref에 저장 (Loop 콜백에서 사용)
  useEffect(() => {
    channelsRef.current = channels;
  }, [channels]);

  // 초기화: Synth 생성 및 Loop 설정
  useEffect(() => {
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    // 각 채널별 Synth 생성
    synthsRef.current = createSynthMap(channels);

    // 16스텝 루프 생성 (16n = 16분음표)
    loopRef.current = new Loop((time) => {
      const step = stepRef.current;
      const currentChannels = channelsRef.current;

      // 각 채널의 현재 스텝 확인 및 재생
      currentChannels.forEach((channel) => {
        const noteStep = channel.steps[step];
        if (noteStep.isActive && !channel.mute) {
          const synth = synthsRef.current.get(channel.id);
          if (synth instanceof NoiseSynth) {
            // Noise는 피치 없이 재생
            synth.triggerAttackRelease('16n', time);
          } else if (synth instanceof Synth) {
            // 일반 Synth는 피치와 함께 재생
            synth.triggerAttackRelease(noteStep.pitch, '16n', time);
          }
        }
      });

      // UI 업데이트 (메인 스레드에서 실행)
      Draw.schedule(() => {
        stepRef.current = (step + 1) % 16;
        setCurrentStep(stepRef.current);
      }, time);
    }, '16n');

    // 클린업
    return () => {
      synthsRef.current.forEach((synth) => synth.dispose());
      synthsRef.current.clear();
      loopRef.current?.dispose();
      loopRef.current = null;
      Transport.stop();
      Transport.cancel();
      isInitializedRef.current = false;
    };
  }, []);

  // BPM 동기화
  useEffect(() => {
    Transport.bpm.value = bpm;
  }, [bpm]);

  // 채널별 볼륨, 파형, 엔벨로프 업데이트
  useEffect(() => {
    channels.forEach((channel) => {
      const synth = synthsRef.current.get(channel.id);
      if (synth) {
        // 볼륨 설정 (0~1 → dB 변환)
        synth.volume.value = gainToDb(channel.volume);

        // 엔벨로프 업데이트
        synth.envelope.attack = channel.envelope.attack;
        synth.envelope.decay = channel.envelope.decay;
        synth.envelope.sustain = channel.envelope.sustain;
        synth.envelope.release = channel.envelope.release;

        // 파형 업데이트 (Synth만 해당)
        if (synth instanceof Synth) {
          synth.oscillator.type = channel.waveform;
        }
      }
    });
  }, [channels]);

  // 재생/정지 처리
  useEffect(() => {
    const handlePlayback = async () => {
      if (isPlaying) {
        // 오디오 컨텍스트 시작 (사용자 상호작용 필요)
        await start();

        // 스텝 초기화 및 재생 시작
        stepRef.current = 0;
        setCurrentStep(0);
        loopRef.current?.start(0);
        Transport.start();
      } else {
        // 정지
        Transport.stop();
        loopRef.current?.stop();
        stepRef.current = 0;
        setCurrentStep(0);
      }
    };

    handlePlayback();
  }, [isPlaying, setCurrentStep]);
}

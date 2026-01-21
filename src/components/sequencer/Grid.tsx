'use client';

import { useSequencerStore } from '@/store/useSequencerStore';
import StepButton from './StepButton';

export default function Grid() {
  const { channels, currentStep, isPlaying, toggleStep } = useSequencerStore();

  return (
    <div className="nes-container with-title is-dark">
      <p className="title">Sequencer Grid</p>

      <div className="sequencer-grid">
        {channels.map((channel) => (
          <div key={channel.id} className="channel-row">
            {/* 채널 이름 라벨 */}
            <div className="channel-label">
              <span className="nes-text is-primary">{channel.name}</span>
              {channel.mute && (
                <span className="nes-text is-disabled ml-2">[MUTE]</span>
              )}
            </div>

            {/* 16개 스텝 버튼 */}
            <div className="steps-container">
              {channel.steps.map((step, stepIndex) => (
                <StepButton
                  key={stepIndex}
                  stepIndex={stepIndex}
                  isActive={step.isActive}
                  isCurrent={isPlaying && currentStep === stepIndex}
                  pitch={step.pitch}
                  channelName={channel.name}
                  onClick={() => toggleStep(channel.id, stepIndex)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .sequencer-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1rem;
        }

        .channel-row {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .channel-label {
          min-width: 120px;
          font-size: 0.75rem;
          display: flex;
          align-items: center;
        }

        .steps-container {
          display: grid;
          grid-template-columns: repeat(16, 1fr);
          gap: 0.25rem;
          flex: 1;
        }

        /* 4의 배수마다 구분선 추가 */
        .steps-container :global(.step-button:nth-child(4n)) {
          margin-right: 0.5rem;
        }

        @media (max-width: 1024px) {
          .channel-label {
            min-width: 80px;
            font-size: 0.625rem;
          }
        }

        @media (max-width: 768px) {
          .channel-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .steps-container {
            width: 100%;
            overflow-x: auto;
          }
        }
      `}</style>
    </div>
  );
}

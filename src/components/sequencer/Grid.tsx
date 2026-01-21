'use client';

import { useSequencerStore } from '@/store/useSequencerStore';

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
              {channel.steps.map((step, stepIndex) => {
                const isActive = step.isActive;
                const isCurrent = isPlaying && currentStep === stepIndex;

                // 버튼 클래스 결정
                let buttonClass = 'nes-btn step-button';
                if (isActive) {
                  buttonClass += ' is-success';
                } else {
                  buttonClass += ' is-normal';
                }

                return (
                  <button
                    key={stepIndex}
                    className={buttonClass}
                    onClick={() => toggleStep(channel.id, stepIndex)}
                    data-current={isCurrent}
                    title={`${channel.name} - Step ${stepIndex + 1} - ${step.pitch}`}
                  >
                    <span className="step-number">{stepIndex + 1}</span>
                  </button>
                );
              })}
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

        .step-button {
          min-width: 40px;
          min-height: 40px;
          padding: 0.25rem;
          font-size: 0.625rem;
          position: relative;
          transition: all 0.1s;
        }

        .step-button.is-normal {
          background-color: #212529;
          border-color: #495057;
        }

        .step-button.is-success {
          background-color: #92cc41;
          border-color: #76c442;
        }

        .step-button[data-current='true'] {
          box-shadow: 0 0 10px #f7d51d, 0 0 20px #f7d51d;
          border-color: #f7d51d !important;
          animation: pulse 0.3s ease-in-out;
        }

        .step-button:hover {
          transform: scale(1.05);
        }

        .step-button:active {
          transform: scale(0.95);
        }

        .step-number {
          display: block;
          line-height: 1;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        /* 4의 배수마다 구분선 추가 */
        .step-button:nth-child(4n) {
          margin-right: 0.5rem;
        }

        @media (max-width: 1024px) {
          .step-button {
            min-width: 32px;
            min-height: 32px;
            font-size: 0.5rem;
          }

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

          .step-button {
            min-width: 28px;
            min-height: 28px;
          }
        }
      `}</style>
    </div>
  );
}

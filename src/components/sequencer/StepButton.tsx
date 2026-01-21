'use client';

import { memo } from 'react';

interface StepButtonProps {
  stepIndex: number;
  isActive: boolean;
  isCurrent: boolean;
  pitch: string;
  channelName: string;
  onClick: () => void;
}

const StepButton = memo(function StepButton({
  stepIndex,
  isActive,
  isCurrent,
  pitch,
  channelName,
  onClick,
}: StepButtonProps) {
  const buttonClass = `nes-btn step-button ${
    isActive ? 'is-success' : 'is-normal'
  }`;

  return (
    <>
      <button
        className={buttonClass}
        onClick={onClick}
        data-current={isCurrent}
        title={`${channelName} - Step ${stepIndex + 1} - ${pitch}`}
      >
        <span className="step-number">{stepIndex + 1}</span>
      </button>

      <style jsx>{`
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

        @media (max-width: 1024px) {
          .step-button {
            min-width: 32px;
            min-height: 32px;
            font-size: 0.5rem;
          }
        }

        @media (max-width: 768px) {
          .step-button {
            min-width: 28px;
            min-height: 28px;
          }
        }
      `}</style>
    </>
  );
});

export default StepButton;

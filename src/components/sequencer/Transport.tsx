'use client';

import { useSequencerStore } from '@/store/useSequencerStore';

export default function Transport() {
  const { bpm, isPlaying, play, stop, setBpm, clearAll } = useSequencerStore();

  const handleBpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setBpm(value);
    }
  };

  const handlePlayStop = () => {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
  };

  return (
    <div className="nes-container with-title is-dark">
      <p className="title">Transport Controls</p>

      <div className="transport-controls">
        {/* Play/Stop 버튼 */}
        <div className="control-group">
          <button
            type="button"
            className={`nes-btn ${isPlaying ? 'is-error' : 'is-primary'}`}
            onClick={handlePlayStop}
          >
            {isPlaying ? '■ Stop' : '▶ Play'}
          </button>

          <button
            type="button"
            className="nes-btn is-warning"
            onClick={clearAll}
            disabled={isPlaying}
          >
            Clear All
          </button>
        </div>

        {/* BPM 컨트롤 */}
        <div className="control-group bpm-control">
          <label htmlFor="bpm-slider" className="control-label">
            <span className="nes-text is-primary">BPM</span>
          </label>
          <div className="bpm-inputs">
            <input
              id="bpm-slider"
              type="range"
              min="60"
              max="200"
              value={bpm}
              onChange={handleBpmChange}
              className="bpm-slider"
              disabled={isPlaying}
            />
            <input
              type="number"
              min="60"
              max="200"
              value={bpm}
              onChange={handleBpmChange}
              className="nes-input bpm-number"
              disabled={isPlaying}
            />
          </div>
        </div>

        {/* 현재 상태 표시 */}
        <div className="status-display">
          <span className="nes-text is-disabled">
            Status: {isPlaying ? '🔊 Playing' : '⏸️ Stopped'}
          </span>
        </div>
      </div>

      <style jsx>{`
        .transport-controls {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 1rem;
        }

        .control-group {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .control-group button {
          min-width: 120px;
        }

        .bpm-control {
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;
        }

        .control-label {
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
        }

        .bpm-inputs {
          display: flex;
          align-items: center;
          gap: 1rem;
          width: 100%;
        }

        .bpm-slider {
          flex: 1;
          height: 8px;
          background: #212529;
          border: 4px solid #fff;
          outline: none;
          -webkit-appearance: none;
          appearance: none;
        }

        .bpm-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          background: #92cc41;
          border: 2px solid #fff;
          cursor: pointer;
          image-rendering: pixelated;
        }

        .bpm-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #92cc41;
          border: 2px solid #fff;
          cursor: pointer;
          image-rendering: pixelated;
        }

        .bpm-slider:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .bpm-number {
          width: 100px;
          text-align: center;
        }

        .status-display {
          margin-top: 0.5rem;
          padding: 0.5rem;
          background: rgba(0, 0, 0, 0.3);
          border: 2px solid #495057;
          border-radius: 4px;
        }

        @media (max-width: 768px) {
          .control-group {
            width: 100%;
          }

          .control-group button {
            flex: 1;
            min-width: auto;
          }

          .bpm-inputs {
            flex-direction: column;
          }

          .bpm-slider {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

'use client';

import { useSequencerStore } from '@/store/useSequencerStore';
import FileManager from '@/components/ui/FileManager';
import Slider from '@/components/ui/Slider';

export default function Transport() {
  const { bpm, isPlaying, play, stop, setBpm, clearAll } = useSequencerStore();

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
        <div className="bpm-section">
          <Slider
            label="BPM"
            value={bpm}
            min={60}
            max={200}
            step={1}
            onChange={setBpm}
            formatter={(v) => `${v}`}
          />
        </div>

        {/* 현재 상태 표시 */}
        <div className="status-display">
          <span className="nes-text is-disabled">
            Status: {isPlaying ? '🔊 Playing' : '⏸️ Stopped'}
          </span>
        </div>

        {/* File Manager */}
        <FileManager />
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

        .bpm-section {
          width: 100%;
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
        }
      `}</style>
    </div>
  );
}

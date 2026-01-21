'use client';

import { useSequencerStore } from '@/store/useSequencerStore';
import type { Channel } from '@/store/useSequencerStore';

interface ChannelCardProps {
  channel: Channel;
}

export default function ChannelCard({ channel }: ChannelCardProps) {
  const { setVolume, toggleMute, setWaveform, setEnvelope, clearChannel } =
    useSequencerStore();

  const waveformOptions =
    channel.type === 'noise'
      ? ['white', 'pink', 'brown']
      : ['square', 'sine', 'triangle', 'sawtooth'];

  return (
    <div className="nes-container with-title is-dark channel-card">
      <p className="title">{channel.name}</p>

      <div className="controls">
        {/* Waveform Selector */}
        <div className="control-row">
          <label className="control-label">Waveform</label>
          <div className="nes-select">
            <select
              value={channel.waveform}
              onChange={(e) =>
                setWaveform(
                  channel.id,
                  e.target.value as Channel['waveform']
                )
              }
            >
              {waveformOptions.map((wave) => (
                <option key={wave} value={wave}>
                  {wave.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Volume */}
        <div className="control-row">
          <label className="control-label">
            Volume: {Math.round(channel.volume * 100)}%
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={channel.volume}
            onChange={(e) => setVolume(channel.id, parseFloat(e.target.value))}
            className="slider"
          />
        </div>

        {/* ADSR Envelope */}
        <div className="envelope-section">
          <div className="envelope-label">ADSR</div>

          <div className="envelope-control">
            <label>A: {channel.envelope.attack.toFixed(3)}s</label>
            <input
              type="range"
              min="0.001"
              max="1"
              step="0.001"
              value={channel.envelope.attack}
              onChange={(e) =>
                setEnvelope(channel.id, { attack: parseFloat(e.target.value) })
              }
              className="slider mini"
            />
          </div>

          <div className="envelope-control">
            <label>D: {channel.envelope.decay.toFixed(3)}s</label>
            <input
              type="range"
              min="0.001"
              max="1"
              step="0.001"
              value={channel.envelope.decay}
              onChange={(e) =>
                setEnvelope(channel.id, { decay: parseFloat(e.target.value) })
              }
              className="slider mini"
            />
          </div>

          <div className="envelope-control">
            <label>S: {channel.envelope.sustain.toFixed(2)}</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={channel.envelope.sustain}
              onChange={(e) =>
                setEnvelope(channel.id, {
                  sustain: parseFloat(e.target.value),
                })
              }
              className="slider mini"
            />
          </div>

          <div className="envelope-control">
            <label>R: {channel.envelope.release.toFixed(3)}s</label>
            <input
              type="range"
              min="0.001"
              max="2"
              step="0.001"
              value={channel.envelope.release}
              onChange={(e) =>
                setEnvelope(channel.id, {
                  release: parseFloat(e.target.value),
                })
              }
              className="slider mini"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="button-row">
          <button
            type="button"
            className={`nes-btn ${channel.mute ? 'is-warning' : 'is-success'}`}
            onClick={() => toggleMute(channel.id)}
          >
            {channel.mute ? 'Unmute' : 'Mute'}
          </button>
          <button
            type="button"
            className="nes-btn is-error"
            onClick={() => clearChannel(channel.id)}
          >
            Clear
          </button>
        </div>
      </div>

      <style jsx>{`
        .channel-card {
          min-width: 250px;
        }

        .controls {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1rem;
        }

        .control-row {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .control-label {
          font-size: 0.75rem;
          color: #92cc41;
        }

        .slider {
          width: 100%;
          height: 8px;
          background: #212529;
          border: 2px solid #fff;
          outline: none;
          -webkit-appearance: none;
          appearance: none;
        }

        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          background: #92cc41;
          border: 2px solid #fff;
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #92cc41;
          border: 2px solid #fff;
          cursor: pointer;
        }

        .envelope-section {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0.5rem;
          background: rgba(0, 0, 0, 0.3);
          border: 2px solid #495057;
        }

        .envelope-label {
          font-size: 0.75rem;
          color: #f7d51d;
          font-weight: bold;
        }

        .envelope-control {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .envelope-control label {
          font-size: 0.625rem;
          color: #ccc;
        }

        .slider.mini {
          height: 6px;
        }

        .button-row {
          display: flex;
          gap: 0.5rem;
        }

        .button-row button {
          flex: 1;
          font-size: 0.625rem;
          padding: 0.5rem;
        }

        @media (max-width: 768px) {
          .channel-card {
            min-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

'use client';

import { useSequencerStore } from '@/store/useSequencerStore';
import Slider from '@/components/ui/Slider';
import EnvelopeControl from '@/components/synth/EnvelopeControl';
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
                setWaveform(channel.id, e.target.value as Channel['waveform'])
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
        <Slider
          label="Volume"
          value={channel.volume}
          min={0}
          max={1}
          step={0.01}
          onChange={(value) => setVolume(channel.id, value)}
          formatter={(v) => `${Math.round(v * 100)}%`}
        />

        {/* ADSR Envelope */}
        <EnvelopeControl
          envelope={channel.envelope}
          onEnvelopeChange={(envelope) => setEnvelope(channel.id, envelope)}
        />

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

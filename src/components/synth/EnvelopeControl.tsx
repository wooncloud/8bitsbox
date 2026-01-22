'use client';

import Slider from '@/components/ui/Slider';
import type { Envelope } from '@/store/useSequencerStore';

interface EnvelopeControlProps {
  envelope: Envelope;
  onEnvelopeChange: (envelope: Partial<Envelope>) => void;
}

export default function EnvelopeControl({
  envelope,
  onEnvelopeChange,
}: EnvelopeControlProps) {
  return (
    <div className="envelope-section">
      <div className="envelope-label">ADSR</div>

      <Slider
        label="A"
        value={envelope.attack}
        min={0.001}
        max={1}
        step={0.001}
        onChange={(value) => onEnvelopeChange({ attack: value })}
        formatter={(v) => `${v.toFixed(3)}s`}
        size="mini"
      />

      <Slider
        label="D"
        value={envelope.decay}
        min={0.001}
        max={1}
        step={0.001}
        onChange={(value) => onEnvelopeChange({ decay: value })}
        formatter={(v) => `${v.toFixed(3)}s`}
        size="mini"
      />

      <Slider
        label="S"
        value={envelope.sustain}
        min={0}
        max={1}
        step={0.01}
        onChange={(value) => onEnvelopeChange({ sustain: value })}
        formatter={(v) => v.toFixed(2)}
        size="mini"
      />

      <Slider
        label="R"
        value={envelope.release}
        min={0.001}
        max={2}
        step={0.001}
        onChange={(value) => onEnvelopeChange({ release: value })}
        formatter={(v) => `${v.toFixed(3)}s`}
        size="mini"
      />

      <style jsx>{`
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
      `}</style>
    </div>
  );
}

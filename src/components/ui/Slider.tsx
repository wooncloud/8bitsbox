'use client';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  formatter?: (value: number) => string;
  size?: 'normal' | 'mini';
}

export default function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  formatter,
  size = 'normal',
}: SliderProps) {
  const displayValue = formatter ? formatter(value) : value.toString();

  return (
    <div className="slider-container">
      <label className="slider-label">{label}: {displayValue}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className={`slider ${size === 'mini' ? 'mini' : ''}`}
      />

      <style jsx>{`
        .slider-container {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .slider-label {
          font-size: 0.625rem;
          color: #ccc;
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

        .slider.mini {
          height: 6px;
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
      `}</style>
    </div>
  );
}

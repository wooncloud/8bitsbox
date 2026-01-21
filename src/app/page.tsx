'use client';

import Grid from '@/components/sequencer/Grid';
import Transport from '@/components/sequencer/Transport';
import { useAudioEngine } from '@/hooks/useAudioEngine';

export default function Home() {
  // Tone.js 오디오 엔진 초기화
  useAudioEngine();

  return (
    <main className="container">
      <div className="header-section">
        <h1 className="nes-text is-primary">8bitsbox</h1>
        <p className="nes-text">NES-Style Chiptune Sequencer</p>
      </div>

      <Transport />

      <Grid />

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 2rem;
          background-color: #212529;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .header-section {
          text-align: center;
          margin-bottom: 1rem;
        }

        h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        @media (max-width: 768px) {
          .container {
            padding: 1rem;
            gap: 1rem;
          }

          h1 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </main>
  );
}

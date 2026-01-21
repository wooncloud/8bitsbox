'use client';

import Grid from '@/components/sequencer/Grid';

export default function Home() {
  return (
    <main className="container">
      <div className="header-section">
        <h1 className="nes-text is-primary">8bitsbox</h1>
        <p className="nes-text">NES-Style Chiptune Sequencer</p>
      </div>

      <Grid />

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 2rem;
          background-color: #212529;
        }

        .header-section {
          text-align: center;
          margin-bottom: 2rem;
        }

        h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        @media (max-width: 768px) {
          .container {
            padding: 1rem;
          }

          h1 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </main>
  );
}

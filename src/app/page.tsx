'use client';

import Grid from '@/components/sequencer/Grid';
import Transport from '@/components/sequencer/Transport';
import ChannelCard from '@/components/synth/ChannelCard';
import { useAudioEngine } from '@/hooks/useAudioEngine';
import { useSequencerStore } from '@/store/useSequencerStore';

export default function Home() {
  // Tone.js 오디오 엔진 초기화
  useAudioEngine();

  const { channels } = useSequencerStore();

  return (
    <main className="container">
      <div className="header-section">
        <h1 className="nes-text is-primary">8bitsbox</h1>
        <p className="nes-text">NES-Style Chiptune Sequencer</p>
      </div>

      <Transport />

      <Grid />

      {/* Channel Controls */}
      <div className="channels-section">
        <h2 className="section-title nes-text is-primary">Channel Settings</h2>
        <div className="channels-grid">
          {channels.map((channel) => (
            <ChannelCard key={channel.id} channel={channel} />
          ))}
        </div>
      </div>

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

        .channels-section {
          margin-top: 1rem;
        }

        .section-title {
          font-size: 1.25rem;
          margin-bottom: 1rem;
          text-align: center;
        }

        .channels-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        @media (max-width: 768px) {
          .container {
            padding: 1rem;
            gap: 1rem;
          }

          h1 {
            font-size: 1.5rem;
          }

          .section-title {
            font-size: 1rem;
          }

          .channels-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}

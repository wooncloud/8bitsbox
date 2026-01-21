import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '8bitsbox - NES Chiptune Sequencer',
  description: '80년대 NES 스타일 8비트 음악 워크스테이션',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://unpkg.com/nes.css@latest/css/nes.min.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

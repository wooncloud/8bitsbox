'use client';

import { useRef, useState } from 'react';
import { useSequencerStore } from '@/store/useSequencerStore';
import { exportProject, importProject } from '@/lib/fileUtils';

export default function FileManager() {
  const { channels, bpm, loadProject, stop } = useSequencerStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = () => {
    try {
      const projectName = prompt('Enter project name:', '8bitsbox-project');
      if (projectName === null) return; // 취소

      exportProject(channels, bpm, projectName || undefined);
      setError(null);
    } catch (err) {
      setError('Failed to export project');
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await importProject(file);

      // 재생 중이면 먼저 정지
      stop();

      // 프로젝트 로드
      loadProject(data.channels, data.bpm);

      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load project'
      );
    } finally {
      setIsLoading(false);
      // 파일 입력 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleLoadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="file-manager">
      <div className="button-group">
        <button
          type="button"
          className="nes-btn is-success"
          onClick={handleExport}
          disabled={isLoading}
        >
          💾 Save Project
        </button>

        <button
          type="button"
          className="nes-btn is-primary"
          onClick={handleLoadClick}
          disabled={isLoading}
        >
          📂 Load Project
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json,.8bb.json"
          onChange={handleImport}
          style={{ display: 'none' }}
        />
      </div>

      {error && (
        <div className="error-message">
          <span className="nes-text is-error">⚠️ {error}</span>
        </div>
      )}

      <style jsx>{`
        .file-manager {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .button-group {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .button-group button {
          flex: 1;
          min-width: 150px;
          font-size: 0.75rem;
        }

        .error-message {
          padding: 0.5rem;
          background: rgba(209, 17, 65, 0.1);
          border: 2px solid #d11141;
          border-radius: 4px;
        }

        @media (max-width: 768px) {
          .button-group button {
            flex: 1 1 100%;
          }
        }
      `}</style>
    </div>
  );
}

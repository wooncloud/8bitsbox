import type { SequencerState } from '@/store/useSequencerStore';

export interface ProjectData {
  version: string;
  name: string;
  createdAt: string;
  channels: SequencerState['channels'];
  bpm: number;
}

/**
 * 현재 프로젝트를 JSON 파일로 내보내기
 */
export function exportProject(
  channels: SequencerState['channels'],
  bpm: number,
  projectName?: string
): void {
  const projectData: ProjectData = {
    version: '1.0.0',
    name: projectName || `8bitsbox-${Date.now()}`,
    createdAt: new Date().toISOString(),
    channels,
    bpm,
  };

  const json = JSON.stringify(projectData, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${projectData.name}.8bb.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * JSON 파일에서 프로젝트 불러오기
 */
export function importProject(
  file: File
): Promise<Pick<ProjectData, 'channels' | 'bpm'>> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data: ProjectData = JSON.parse(content);

        // 버전 호환성 체크
        if (!data.version || !data.channels || !data.bpm) {
          throw new Error('Invalid project file format');
        }

        // 기본 검증
        if (!Array.isArray(data.channels) || data.channels.length !== 4) {
          throw new Error('Invalid channel data');
        }

        if (typeof data.bpm !== 'number' || data.bpm < 60 || data.bpm > 200) {
          throw new Error('Invalid BPM value');
        }

        resolve({
          channels: data.channels,
          bpm: data.bpm,
        });
      } catch (error) {
        reject(
          error instanceof Error
            ? error
            : new Error('Failed to parse project file')
        );
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
}

/**
 * 프로젝트 이름 추출
 */
export function getProjectName(filename: string): string {
  return filename.replace(/\.8bb\.json$/, '');
}

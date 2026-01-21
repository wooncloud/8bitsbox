# 🕹️ 8bitsbox

NES 스타일 8비트 음악 워크스테이션 - 브라우저 기반 칩튠 시퀀서

## 🎮 프로젝트 소개

80년대 게임 콘솔(NES)의 사운드 칩을 웹 기술로 재해석한 음악 제작 도구입니다.

## 🛠️ 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Styling**: NES.css + Tailwind CSS
- **Audio**: Tone.js
- **State**: Zustand (with persist middleware)
- **Language**: TypeScript

## 📦 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
npm start
```

## 🎵 기능

### 현재 구현됨
**Phase 1: 인프라 구축**
- ✅ 4개 채널 시퀀서 (Pulse 1, Pulse 2, Triangle, Noise)
- ✅ 채널당 16개 스텝
- ✅ NES 스타일 UI (NES.css)
- ✅ localStorage 자동 저장

**Phase 2: 오디오 엔진**
- ✅ Tone.js 오디오 엔진 통합
- ✅ 재생/정지/BPM 컨트롤 (60-200 BPM)
- ✅ 실시간 스텝 하이라이트
- ✅ 4채널 동시 재생

**Phase 3: 신디사이저 디테일**
- ✅ ADSR 엔벨로프 조정 (Attack, Decay, Sustain, Release)
- ✅ 파형 선택 UI (사각파, 삼각파, 톱니파, 사인파)
- ✅ 채널별 볼륨 슬라이더
- ✅ 채널별 뮤트/언뮤트
- ✅ 채널별 클리어 기능

### 개발 예정

**Phase 4: 폴리싱**
- 🔄 JSON 파일 내보내기/불러오기
- 🔄 파형 시각화
- 🔄 추가 UI 개선

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 메인 페이지
│   └── globals.css        # 전역 스타일
├── components/
│   ├── sequencer/
│   │   ├── Grid.tsx       # 시퀀서 그리드 컨테이너
│   │   ├── StepButton.tsx # 개별 스텝 버튼
│   │   └── Transport.tsx  # 재생 컨트롤 (Play/Stop/BPM)
│   └── synth/
│       └── ChannelCard.tsx # 채널별 설정 카드 (ADSR, 파형, 볼륨)
├── store/
│   └── useSequencerStore.ts  # Zustand 상태 관리 (ADSR 포함)
├── hooks/
│   └── useAudioEngine.ts     # Tone.js 오디오 엔진 훅
└── lib/
    └── audioUtils.ts         # Synth 생성 유틸리티
```

## 🎹 사용법

### 기본 시퀀싱
1. **패턴 만들기**: Grid에서 스텝 버튼을 클릭하여 노트 활성화/비활성화
2. **재생하기**: Transport의 ▶ Play 버튼을 눌러 패턴 재생
3. **템포 조절**: BPM 슬라이더로 60~200 BPM 사이 조절
4. **초기화**: Clear All 버튼으로 모든 패턴 삭제

### 채널 설정 (Channel Settings)
각 채널 카드에서:
- **Waveform**: 파형 선택 (Square, Sine, Triangle, Sawtooth)
- **Volume**: 볼륨 조절 (0-100%)
- **ADSR**:
  - Attack (A): 소리 시작 속도
  - Decay (D): 초기 감쇠 시간
  - Sustain (S): 지속 레벨
  - Release (R): 소리 종료 속도
- **Mute/Unmute**: 채널 음소거/해제
- **Clear**: 해당 채널 패턴 삭제

### 자동 저장
모든 설정(패턴, ADSR, 볼륨, 파형)은 localStorage에 자동 저장됩니다.

## 📝 라이선스

MIT
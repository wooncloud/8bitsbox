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

### 현재 구현됨 (Phase 1)
- ✅ 4개 채널 시퀀서 (Pulse 1, Pulse 2, Triangle, Noise)
- ✅ 채널당 16개 스텝
- ✅ NES 스타일 UI (NES.css)
- ✅ localStorage 자동 저장

### 개발 예정
- 🔄 Tone.js 오디오 엔진 통합
- 🔄 재생/정지/BPM 컨트롤
- 🔄 ADSR 엔벨로프 조정
- 🔄 파형 선택 (사각파, 삼각파, 노이즈)
- 🔄 MIDI 내보내기/불러오기

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 메인 페이지
│   └── globals.css        # 전역 스타일
├── components/
│   └── sequencer/
│       ├── Grid.tsx       # 시퀀서 그리드 컨테이너
│       └── StepButton.tsx # 개별 스텝 버튼
├── store/
│   └── useSequencerStore.ts  # Zustand 상태 관리
├── hooks/                 # 커스텀 훅 (개발 예정)
└── lib/                   # 유틸리티 (개발 예정)
```

## 🎹 사용법

1. 각 채널의 스텝 버튼을 클릭하여 노트 활성화/비활성화
2. 4개 채널을 조합하여 8비트 사운드 패턴 생성
3. 설정은 자동으로 localStorage에 저장됨

## 📝 라이선스

MIT
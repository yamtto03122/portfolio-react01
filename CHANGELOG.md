# 업무일지 (CHANGELOG)

> 새 세션 시작 시 이 파일을 먼저 읽어 현재 상태를 파악할 것.
> 팀원 정보는 `CLAUDE.md` → **개발 팀원** 섹션 참고.

---

## 2026-05-26

### 한 일

**팀 전체 회의 — 포트폴리오 개선점 도출 및 반영**

기획자(지수), 백엔드 개발자(민준), 면접관(현우 팀장) 세 팀원 관점에서 포트폴리오 전체를 검토한 뒤 아래 사항을 일괄 수정.

#### 버그 수정

- **localStorage 키 불일치 수정** `context/DataContext.js` `components/Projects/index.js` `pages/projects.js`
  - GitHub repos 저장 시 `"user_repo"`, 읽을 때는 `"user_repos"`로 키가 달라 캐시가 전혀 동작하지 않던 버그
  - 세 파일 모두 `"user_repos"`로 통일
  - *민준: "캐시가 안 되면 매 로드마다 GitHub API 새로 호출하게 됩니다."*

#### 데이터 수정

- **`github_username` / `display_name` 필드 분리** `data/usersInfo.json` `components/Footer/index.js`
  - 기존 `github_username: "DoYoung"` — 표시 이름으로는 맞지만 GitHub API 호출 시 실제 계정이 아니어서 repo 수·아바타 데이터 미수신 상태였음
  - `github_username: "yamtto03122"` (API용), `display_name: "DoYoung"` (표시용) 으로 분리
  - Footer는 `display_name` 사용하도록 변경
  - *민준: "API 호출 계정이랑 표시 이름을 같은 필드로 쓰면 둘 중 하나는 망가집니다."*

- **`favorites_quote` 영어 오타 수정** `data/usersInfo.json`
  - `intelligient` → `intelligent` / `archive` → `achieve` (2곳) / `people10` → `people 10` / `lessed focused` → `less focused`
  - *현우 팀장: "포트폴리오에 오타가 있으면 꼼꼼함 부족으로 읽힙니다."*

- **Instagram 타인 계정 URL 제거** `data/socials.json`
  - `instagram` 값이 템플릿 원작자 계정(`_benrobo`)으로 남아 있던 것 빈 문자열로 초기화
  - *현우 팀장: "다른 사람 SNS 링크가 걸려 있으면 신뢰도 0입니다."*

#### 콘텐츠 개선

- **Skills 설명 표현 개선** `data/skills.json`
  - TailwindCSS: "최근 즐겨 사용하고 있습니다." → "실무 프로젝트에서 꾸준히 활용하고 있으며, 유틸리티 클래스 기반의 빠른 UI 구현에 익숙합니다."
  - SCSS: "교육 이수 과정 중 학습했습니다." → "교육 과정에서 학습하였으며, 변수·믹스인·중첩 등의 기능을 이해하고 실무에서 활용한 경험이 있습니다."
  - *현우 팀장: "자신감 없는 표현은 채용 담당자 눈에 전문성 낮아 보입니다."*

#### UX 개선

- **Hero 영역 이메일 문의 버튼 추가** `components/Intro/index.js`
  - "More Profile" 버튼 옆에 "이메일 문의" 버튼 추가. `socials.json`의 `email` 값으로 `mailto:` 링크 연결.
  - *지수: "채용 담당자가 메인 페이지에서 바로 연락할 수 있어야 해요."*

#### 코드 정리

- **`console.log` 제거** `components/Intro/index.js` `components/Projects/index.js`
  - *민준: "배포 코드에 로그 남기지 마세요."*

---

### 미완료 / 다음 세션에서 할 것

| # | 항목 | 내용 | 담당 |
|---|------|------|------|
| 1 | `socials.json` github | GitHub 프로필 URL 비어 있음 | 도영 |
| 2 | `projects.json` 역할 구체화 | 각 프로젝트 "기여도 %" 외에 담당 기능·역할 한 줄 추가 권장 (현우 팀장) | 도영 |
| 3 | `about.js` 이메일 오타 | `hell03122@naver.com` → `hello03122@naver.com` (`o` 누락) | — |
| 4 | `about.js` `resume` 변수 미정의 | Download 버튼 클릭 시 `ReferenceError` 발생, 다운로드 불가 | — |

---

## 2026-05-26 (2차)

### 한 일

**운영 사이트(https://doyoung.me.kr) 전체 점검**

직접 접속 및 코드 분석으로 아래 사항 확인.

- `/` `/about/` `/projects/` — 세 페이지 모두 정상 로드 확인
- `pages/about.js` 파일 실존 확인 → 이전 CHANGELOG 미완료 항목에서 제거
- `/public/CV/resume_kimdoyoung.pdf` 파일 존재 확인 → iframe 이력서 뷰어 정상

**Navbar instagram 하드코딩 → socials.json 연동** `components/Navbar/index.js`

- `https://www.instagram.com/celsius_o/` 가 코드에 직접 박혀 있던 것을 `socials.socials.instagram` 참조로 변경
- `socials.json` instagram 값을 `https://www.instagram.com/celsius_o/` 로 설정
- instagram 값이 비어 있을 경우 링크 자체를 숨기도록 조건부 렌더링 추가

### 발견된 미수정 버그 (미완료 항목 3·4번으로 등록)

- `about.js:166` 이메일 오타 — `hell03122` (`o` 누락)
- `about.js:37` `resume` 변수 미정의 — Download 버튼 클릭 시 콘솔 `ReferenceError`

---

## 2026-05-26 (3차)

### 한 일

**미완료 버그 수정 및 전체 배포**

**about.js 이메일 오타 수정** `pages/about.js:166`
- `hell03122@naver.com` → `hello03122@naver.com` (`o` 누락 수정)

**about.js resume 변수 미정의 수정** `pages/about.js:37`
- Download 버튼 클릭 시 `ReferenceError: resume is not defined` 오류 수정
- `link.href = resume` → `link.href = "/CV/resume_kimdoyoung.pdf"` (iframe과 동일 경로로 고정)

**배포**
- 커밋: `47d3ea3` — 포트폴리오 전체 개선: 버그 수정·콘텐츠·UX 개선 일괄 반영
- `git push origin master` → GitHub Actions 자동 빌드·배포
- 배포 결과: ✅ success (완료: 2026-05-26T09:08:25Z)
- 운영 확인: https://doyoung.me.kr — Navbar Instagram(celsius_o) 정상, 이메일 링크 정상

### 미완료 / 다음 세션에서 할 것

| # | 항목 | 내용 | 담당 |
|---|------|------|------|
| 1 | `socials.json` github | GitHub 프로필 URL 비어 있음 | 도영 |
| 2 | `projects.json` 역할 구체화 | 각 프로젝트 "기여도 %" 외에 담당 기능·역할 한 줄 추가 권장 (현우 팀장) | 도영 |

---

## 2026-05-26 (4차)

### 한 일

**사이트 타이틀 display_name 적용** `components/Head/index.js`

- 타이틀이 `yamtto03122 Portfolio` 로 노출되던 것을 `DoYoung Portfolio` 로 수정
- `github_username` → `display_name` 으로 변경 (github_username / display_name 분리 작업 마무리)
- 커밋: `aacb6e4`
- 배포 결과: ✅ success (완료: 2026-05-26T09:15:04Z)
- 운영 확인: 타이틀 `DoYoung Portfolio - Home Page` 정상 노출

---

## 2026-05-26 (5차)

### 한 일

**이메일 문의 버튼 Contact form 연동** `components/Intro/index.js`
- Hero 영역 "이메일 문의" 버튼: `mailto:` 링크 → `openContactForm()` 호출로 변경 (Contact 섹션 "Saying Hi!" 와 동일 액션)
- `DataContext`에서 `openContactForm` 가져오도록 수정, 불필요해진 `socials` import 제거

**Navbar Instagram `target="_blank"` 추가** `components/Navbar/index.js`
- Instagram 링크 클릭 시 새 탭으로 열리도록 `target="_blank" rel="noopener noreferrer"` 추가

**배포**
- 커밋: `master` push → GitHub Actions 자동 배포
- 운영 확인: https://doyoung.me.kr

---

## 2026-05-26 (6차)

### 한 일

**Hero 버튼 텍스트 변경** `components/Intro/index.js`
- "이메일 문의" → "Contact Me" 로 변경

---

## 2026-05-26 (7차)

### 한 일

**projects.json URL .html 확장자 제거** `data/projects.json`
- `cms.Html` → `cms`
- `cosmetic.Html` → `cosmetic`
- `bakum.html` → `bakum`

---

<!-- 새 날짜 작업 시 위 형식으로 ## YYYY-MM-DD 섹션 추가 -->

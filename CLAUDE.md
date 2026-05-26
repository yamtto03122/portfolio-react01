# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at localhost:3000
npm run build     # Static export to /out directory
npm run start     # Serve the production build
npm run lint      # Run Next.js ESLint
```

There are no tests in this project.

## Architecture

This is a **Next.js 14 portfolio site** configured for **static export** (`output: "export"` in `next.config.js`). This means no server-side features (API routes, SSR) — everything is statically generated.

### Pages
- `/` — Main landing page: Intro, Projects, Contact, Footer
- `/about` — About page with resume viewer
- `/projects` — Projects listing

### Data layer (`/data/*.json`)
All portfolio content lives in JSON files — no database, no CMS:
- `usersInfo.json` — name, tagline, GitHub username, bio
- `projects.json` — project cards shown on the home/projects pages
- `careers.json`, `skills.json`, `languages.json`, `socials.json` — supporting data

**To update portfolio content, edit the JSON files in `/data/`.**

### State management
`DataContext` (`/context/DataContext.js`) is the single React context. It manages:
- Contact form open/close state (`contactActive`)
- Background GitHub API fetching (repo count + avatar), cached in `localStorage` with a per-minute refresh gate

### Environment variables
EmailJS credentials are required for the contact form and must be set in `.env.local`:
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

### Styling
Tailwind CSS with a custom palette defined in `tailwind.config.js`:
- `dark-100/200/300/400` — dark background shades
- `green-100` through `green-600` — accent greens (`#64f4ac` family)
- `blue-100` (`#3e64ff`) — primary action color

Fonts: Poppins (Google) + Pretendard (local, variable, `--font-pretendard`).
AOS (Animate On Scroll) is initialized in the home page with `duration: "1000"`. Add `data-aos="fade-right"` (or other AOS attributes) to animate elements.

### Component exports
All components are re-exported from `components/index.js`. Import like:
```js
import { Layout, NavBar, Contact } from "../components"
```

### Helpers (`/helpers/index.js`)
- `Notification` — wraps Notyf for top-right toast notifications
- `validateEmail` — RFC-compliant email validator used before EmailJS sends

---

## 개발 팀원

이 프로젝트에는 세 명의 가상 팀원이 함께합니다. 작업 맥락에 따라 이들의 관점을 자연스럽게 반영하세요.

### 📋 기획자 — 지수

역할: IT 서비스 기획 3년차. UX 흐름, 기능 우선순위, 사용자 관점을 담당합니다.

언제 개입하는가:
- 새로운 기능이나 UI 변경을 제안할 때 → 사용자 입장에서 이 기능이 필요한지, 흐름이 자연스러운지 의견을 냅니다.
- 콘텐츠(JSON 데이터) 수정 작업 시 → 어떤 정보를 어떤 순서로 보여줄지 기획 관점 조언을 합니다.
- "이게 맞는 방향인가?" 싶을 때 → 기획자 지수의 목소리로 확인해 줍니다.

말투: 실용적이고 직관적. "사용자 입장에선 이 버튼이 왜 여기 있는지 헷갈릴 수 있어요." 같은 식.

---

### ⚙️ 백엔드 개발자 — 민준

역할: Node.js/Spring 기반 백엔드 5년차. API 설계, 데이터 흐름, 성능, 보안을 담당합니다.

언제 개입하는가:
- API 연동 코드(fetch, axios, React Query)를 작성하거나 수정할 때 → 요청 구조, 에러 처리, 캐싱 전략에 의견을 냅니다.
- 환경변수나 외부 서비스(EmailJS, GitHub API) 관련 작업 시 → 보안 및 안정성 측면에서 조언합니다.
- 성능이나 구조 개선이 필요할 때 → 백엔드 시각으로 병목이나 개선점을 짚어줍니다.

말투: 기술적이고 간결. "이 fetch 요청은 debounce 없이 연속 호출되면 서버에 부담이 될 수 있어요." 같은 식.

---

### 💼 면접관 — 현우 팀장

역할: 프론트엔드 채용 담당 시니어 개발자 7년차. 코드 품질, 기술적 완성도, 포트폴리오 설득력을 평가합니다.

언제 개입하는가:
- 코드 작성 후 리뷰가 필요할 때 → "면접관이 이 코드를 보면 어떤 인상을 받을까?" 관점에서 평가합니다.
- 포트폴리오 콘텐츠(프로젝트 설명, 기술 스택 표현) 수정 시 → 채용 담당자 눈높이에서 더 매력적인 표현을 제안합니다.
- 변경 사항이 포트폴리오의 전체적인 완성도에 영향을 줄 때 → 실무자 시각으로 강점/보완점을 짚어줍니다.

말투: 날카롭지만 건설적. "기여도 50%라고만 쓰면 면접관이 '그래서 뭘 했는데?'라고 물어볼 수 있어요. 구체적인 담당 기능을 한 줄 더 쓰면 좋겠습니다." 같은 식.

---

### 팀 협업 방식

- 팀원들은 **요청하지 않아도** 작업 맥락에 맞게 자연스럽게 개입합니다.
- 단순 버그 수정이나 소소한 스타일 변경에는 끼어들지 않습니다.
- 중요한 결정(UI 구조 변경, 새 기능 추가, 콘텐츠 방향) 앞에서는 관련 팀원이 한마디씩 합니다.
- 팀원의 의견은 짧고 실용적으로, 한국어로 전달합니다.

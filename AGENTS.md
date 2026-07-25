# AGENTS.md — Ghiras Academy (غراس العلم للعلوم)

> **Single source of truth** for all AI coding agents working on this repository.
> Read and strictly adhere to every rule below. If a user prompt contradicts these instructions, you MUST explicitly point out the conflict before proceeding.

---

## 1. Project Overview

**Ghiras Academy** is a comprehensive Arabic e-learning platform delivering structured educational programs through online and in-person attendance. It replaces external tools (Telegram) with a self-contained system for content delivery, student tracking, assessments, certificates, and payments.

| Property | Value |
|----------|-------|
| **Project** | Ghiras Academy (أكاديمية غراس العلم للعلوم) |
| **Version** | 2.0 |
| **Market** | Jordan (primary), MENA (future) |
| **Language** | Arabic-first (RTL), English (Phase 2) |
| **Backend** | Custom REST API (NOT Supabase) |

---

## 2. Tech Stack

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| Framework | Next.js | 16.x | App Router |
| Language | TypeScript | 5.9 | Strict Mode |
| UI | React | 19.x | Server Components default |
| Styling | Tailwind CSS | v4 | shadcn/ui components |
| Data Fetching | TanStack Query | 5.x | Server state management |
| HTTP Client | Axios | — | Singleton with interceptors |
| Validation | Zod | v4 | Form + API validation |
| Forms | React Hook Form | — | With @hookform/resolvers/zod |
| State | Zustand | — | Client state only (no server data) |
| Icons | Lucide React | — | — |
| Toast | Sonner | — | Via `notify` utility |
| Fonts | Cairo | — | Google Fonts (Arabic) |
| Video | YouTube IFrame API | — | Custom ReactMediaPlayer wrapper |
| Charts | Recharts | — | Statistics dashboards |

---

## 3. Architecture Rules

### 3.1 Feature-Based Architecture
The application is modularized by domain. Each feature is a self-contained module.

```
src/features/[name]/
├── types/index.ts        # DTOs, interfaces
├── services/index.ts     # API calls (Axios)
├── hooks/                # React Query hooks
├── schema/index.ts       # Zod validation
├── constants/index.ts    # Query keys, defaults
├── components/           # Feature-specific UI
└── index.ts              # Public exports
```

### 3.2 Feature Isolation (STRICT)
A feature **MUST NEVER** import from another feature.

```typescript
// ❌ FORBIDDEN
import { useGetProgram } from "@programs/hooks";
// inside features/courses/

// ✅ CORRECT
// If courses needs program data, pass it as props from the page
```

### 3.3 Dependency Direction
```
App Router (pages) → Features → Global layers (hooks, components, lib)
```

### 3.4 Shared Code
If two features need the same logic, it **MUST** be extracted to the Global Core (`src/hooks/`, `src/components/`, `src/lib/`).

---

## 4. Folder Responsibilities

| Folder | Purpose | Rules |
|--------|---------|-------|
| `app/` | Next.js App Router only | `page.tsx`, `layout.tsx`, loading, error |
| `src/features/*` | Independent feature modules | Owns UI, hooks, services, schema, types |
| `src/components/` | Global shared UI | shadcn/ui, layout, data-table, video-player |
| `src/hooks/` | Global shared business logic | `useApiMutation`, `usePaginatedQuery` |
| `src/lib/api/` | API configuration | Axios singleton, endpoints, interceptors |
| `src/lib/routes.ts` | Route constants | All navigation paths |
| `src/types/` | Global interfaces | API responses, domain types |
| `src/notifications/` | Toast utilities | `notify.success()`, `notify.error()` |
| `src/middlewares/` | Middleware composition | Auth, rate limiting |
| `src/providers/` | React providers | React Query, auth context |

---

## 5. Required Workflow

When assigned a task, you **MUST** execute:

1. **Understand**: Analyze the prompt and target domain.
2. **Inspect**: Find similar implementations (e.g., `src/features/programs/`).
3. **Identify**: Locate reusable abstractions (types, hooks, components).
4. **Implement**: Write code following exact conventions.
5. **Self-Review**: Verify against checklist in Section 22.

---

## 6. Feature Development Workflow

When building a new feature, follow this sequence:

```
1. Create src/features/[name]/
2. Create types/index.ts          → Define data contracts (DTOs)
3. Create services/index.ts       → Define API calls
4. Create constants/index.ts      → Query keys + defaults
5. Create hooks/                  → React Query hooks (useGet*, useCreate*, etc.)
6. Create schema/index.ts         → Zod validation schemas
7. Create components/             → Feature-specific UI
8. Create index.ts                → Export public APIs
9. Add path alias in tsconfig.json → @"[name]"/* → ./src/features/[name]/*
10. Add endpoints in src/lib/api/endpoints/endpoints.ts
```

---

## 7. API Layer

### 7.1 Axios Singleton
**Location**: `src/lib/api/axios/index.ts`

- Client-side ONLY
- Includes interceptors for auth tokens + refresh
- NEVER create a new Axios instance

```typescript
import api from "@/lib/api/axios";

// Use everywhere in services
const response = await api.get<IPagedResponse<ICourse>>(coursesEndpoints.getAll);
```

### 7.2 Endpoint Builder
**Location**: `src/lib/api/endpoints/builder.ts`

```typescript
import { endpoints } from "@/lib/api/endpoints";

const courses = endpoints("courses");

// Generates:
courses.getAll    → /courses/v1
courses.getById   → (id) => /courses/v1/{id}
courses.post      → /courses/v1
courses.put       → (id) → /courses/v1/{id}
courses.delete    → (id) → /courses/v1/{id}
courses.dropDown  → /courses/v1/dropdown
```

### 7.3 Endpoint Definitions
**Location**: `src/lib/api/endpoints/endpoints.ts`

All API endpoints are defined centrally. NEVER hardcode paths.

```typescript
export const coursesEndpoints = {
  ...courses.crud(""),
  byProgram: (programId: string) => courses.path(`program/${programId}`),
};
```

### 7.4 Token Management
**Location**: `src/lib/api/axios/tokenManager.ts`

```typescript
import { tokenManager } from "@/lib/api/axios/tokenManager";

tokenManager.setTokens(accessToken, refreshToken);
tokenManager.getAccessToken();
tokenManager.clearTokens();
tokenManager.isAuthenticated();
```

---

## 8. React Query Rules

### 8.1 Data Fetching
- Use `useQuery` for reading data
- Use `usePaginatedQuery` for paginated lists
- NEVER use `useEffect` for data fetching

```typescript
// Paginated query
import usePaginatedQuery from "@/hooks/usePaginatedQuery";

export default function useGetAllCourses() {
  return usePaginatedQuery({
    queryKey: COURSE_QUERY_KEYS.LISTS(),
    queryFn: getAllCourses,
  });
}

// Single item query
import { useQuery } from "@tanstack/react-query";

export default function useGetCourse(id: string) {
  return useQuery({
    queryKey: COURSE_QUERY_KEYS.DETAIL(id),
    queryFn: () => getCourseById(id),
  });
}
```

### 8.2 Mutations
**ALWAYS** wrap mutations in feature-specific hooks. NEVER use `useMutation` directly in components.

```typescript
// ✅ CORRECT - Feature hook
export default function useCreateCourse(
  options?: MutationHookOptions<typeof postCourse>,
) {
  const router = useRouter();

  return useApiMutation({
    mutationFn: postCourse,
    invalidateKeys: [COURSE_QUERY_KEYS.ALL],
    ...options,
    onSuccess: (...args) => {
      if (options?.onSuccess) {
        options.onSuccess(...args);
      } else {
        router.push(ROUTES.SUPERVISOR_COURSES);
      }
    },
  });
}

// ❌ FORBIDDEN - Direct use in component
export default function CourseForm() {
  const mutation = useMutation({ mutationFn: postCourse }); // DON'T DO THIS
}
```

### 8.3 Optimistic Updates
Use `useOptimisticUpdate` for PUT/PATCH requests that update cached data.

```typescript
import useOptimisticUpdate from "@/hooks/useOptimisticUpdate";

const { mutate } = useOptimisticUpdate<ICourse>({
  queryKey: COURSE_QUERY_KEYS.ALL,
  mutationFn: putCourse,
  match: (item, vars) => item.id === vars.id,
  update: (item, vars) => ({ ...item, ...vars }),
});
```

### 8.4 Query Keys
Define in `constants/index.ts`:

```typescript
export const COURSE_QUERY_KEYS = {
  ALL: ["courses"] as const,
  LISTS: () => [...COURSE_QUERY_KEYS.ALL, "list"] as const,
  LIST: (filters?: Record<string, unknown>) =>
    [...COURSE_QUERY_KEYS.LISTS(), { filters }] as const,
  DETAILS: () => [...COURSE_QUERY_KEYS.ALL, "details"] as const,
  DETAIL: (id: string | number) =>
    [...COURSE_QUERY_KEYS.DETAILS(), id] as const,
} as const;
```

---

## 9. Forms Rules

- **ALWAYS** use React Hook Form
- **ALWAYS** combine with `@hookform/resolvers/zod`
- **ALWAYS** define schemas in `schema/index.ts`

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseCreateSchema, CourseCreateSchema } from "../schema";

export default function CourseForm() {
  const form = useForm<CourseCreateSchema>({
    resolver: zodResolver(courseCreateSchema),
    defaultValues: { name: "", description: "", type: "electronic" },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* form fields */}
    </form>
  );
}
```

---

## 10. Validation Rules

- **ALWAYS** use Zod v4
- **ALWAYS** use Arabic error messages
- Place schemas in `src/features/[name]/schema/index.ts`
- Export types with `z.infer<typeof schema>`

```typescript
import { z } from "zod";

export const courseCreateSchema = z.object({
  name: z.string().min(1, "اسم المقرر مطلوب"),
  description: z.string().min(10, "وصف المقرر مطلوب"),
  type: z.enum(["electronic", "hybrid"]).describe("نوع المقرر مطلوب"),
  programId: z.string().uuid("معرف البرنامج غير صحيح"),
  price: z.number().min(0, "السعر يجب أن يكون 0 أو أكثر").default(0),
  isSequential: z.boolean().default(false),
  isActive: z.boolean().default(true),
});

export type CourseCreateSchema = z.infer<typeof courseCreateSchema>;
```

---

## 11. Component Rules

### 11.1 Server Components (Default)
- Pages (`page.tsx`) are **ALWAYS** server components
- Layouts (`layout.tsx`) are **ALWAYS** server components
- Fetch data in server components, pass as props to client components

### 11.2 Client Components
Use `"use client"` **ONLY** when:
- Using hooks (useState, useEffect, useRef, etc.)
- Handling events (onClick, onSubmit, etc.)
- Using browser APIs (localStorage, window, etc.)

```typescript
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function CourseList() {
  const [filter, setFilter] = useState("");
  // ...
}
```

### 11.3 Naming Conventions
| Type | Convention | Example |
|------|-----------|---------|
| Components | `PascalCase.tsx` | `CourseForm.tsx` |
| Hooks | `useCamelCase.ts` | `useCreateCourse.ts` |
| Services | `index.ts` in feature | `features/courses/services/index.ts` |
| Schemas | `index.ts` in schema/ | `features/courses/schema/index.ts` |
| Types | `index.ts` in types/ | `features/courses/types/index.ts` |

---

## 12. Styling Rules

- Use **Tailwind CSS v4**
- Use **shadcn/ui** components
- Always check `src/components/ui/` before building custom UI
- RTL is default: `<html lang="ar" dir="rtl">`
- Use `cn()` utility for conditional classes

```typescript
import { cn } from "@/lib/utils";

<div className={cn("base-class", isActive && "active-class")} />
```

---

## 13. Toast Notifications

**ALWAYS** use the `notify` utility. NEVER import sonner directly.

```typescript
import { notify } from "@/notifications/notify";

notify.success("تم بنجاح");
notify.error("حدث خطأ", ["تفاصيل الخطأ"]);
notify.warning("تنبيه");
notify.info("معلومات");
```

---

## 14. Route Constants

**ALWAYS** use routes from `src/lib/routes.ts`. NEVER hardcode paths.

```typescript
import { ROUTES } from "@/lib/routes";

router.push(ROUTES.SUPERVISOR_COURSES);
router.push(ROUTES.STUDENT_COURSE_DETAIL(courseId));
```

---

## 15. TypeScript Rules

- **ALWAYS** enforce strict typing
- **NEVER** use `any`. Use `unknown` if truly dynamic.
- Define DTOs for API payloads and responses
- Prefer type inference when obvious

```typescript
// ✅ CORRECT
interface ICourse {
  id: string;
  name: string;
  type: "electronic" | "hybrid";
}

// ❌ FORBIDDEN
const data: any = await fetch(...);
```

---

## 16. Video Player Implementation

### 16.1 ReactMediaPlayer Component
**Location**: `src/components/video-player/ReactMediaPlayer.tsx`

Custom YouTube IFrame wrapper with:
- Play/Pause/Volume/Fullscreen controls
- Playback speed settings (0.5x - 2x)
- Rewind/Forward 10s
- Progress bar
- Watermark overlay
- Keyboard shortcuts

```typescript
import ReactMediaPlayer from "@/components/video-player/ReactMediaPlayer";

<ReactMediaPlayer
  url={lesson.videoUrl}
  userId={user.id}
  showWatermark={true}
  onProgress={(p) => console.log(`${p}% watched`)}
  onComplete={() => console.log("Lesson completed")}
/>
```

### 16.2 Video URL Extraction
Supports:
- `youtube.com/watch?v=ID`
- `youtu.be/ID`
- `youtube.com/embed/ID`

---

## 17. Quiz System

### 17.1 Question Types (7)
1. **MCQ** — 4 options, 1 correct (most common)
2. **True/False** — Statement verification
3. **Fill in the Blank** — Write the word
4. **Matching** — Link elements in two columns
5. **Ordering** — Arrange in sequence
6. **Image Question** — Image + MCQ
7. **Written Answer** — Short text for manual review

### 17.2 Quiz Rules
- Auto-save every 30 seconds
- Server-side timer (not frontend)
- Session recovery on disconnect (within 10 minutes)
- Results shown immediately with explanations

---

## 18. Attendance System

### 18.1 QR Code Attendance
- Each session has unique `session_id`
- QR link: `/attend?session_id=ABC123`
- Works only within session time window

### 18.2 Anti-Cheating Layers
| Layer | Mechanism |
|-------|-----------|
| Layer 1 | Session-based QR (unique per session) |
| Layer 2 | GPS verification (50m confirmed, 50-300m flagged, >300m rejected) |
| Layer 3 | Time window (15min before to 1hr after session) |

---

## 19. Certificate System

### 19.1 Certificate Number Format
```
GHIRAS-[YEAR]-[8 random digits]
Example: GHIRAS-2026-48291037
```

### 19.2 Verification
- Public page: `/verify-certificate/[code]`
- Shows: student name, program, date
- No login required for viewing
- Login required for download

---

## 20. Payment System

### 20.1 Payment Methods
| Method | Activation | Notes |
|--------|-----------|-------|
| CliQ | Automatic | Jordanian payment service |
| Manual | Admin confirmation | Cash/bank transfer |
| Electronic | Automatic | Phase 2 (credit card, wallet) |

### 20.2 Access Control
- Free courses: Immediate access
- Paid courses: First X lessons free (preview), rest locked until payment

---

## 21. Security Rules

- JWT authentication with secure Refresh Tokens
- bcrypt password encryption
- Strict RBAC — each endpoint protected
- Server-side timers (prevent frontend tampering)
- Rate limiting (brute force prevention)
- HTTPS mandatory
- Complete data validation (frontend + server)
- Soft Delete on all entities

---

## 22. Review Checklist

Before concluding your turn, verify:

- [ ] Are there any cross-feature imports?
- [ ] Is any business logic or schema duplicated?
- [ ] Are there any hardcoded API URLs or endpoints?
- [ ] Are there any instances of `any`?
- [ ] Is React Query used correctly for server state?
- [ ] Did I use `useMutation` directly in a component?
- [ ] Are all user-facing strings in Arabic?
- [ ] Did I use `notify` for toast notifications?
- [ ] Did I use route constants from `ROUTES`?

---

## 23. Forbidden Patterns

- ❌ Import one feature from another
- ❌ Duplicate UI components if shadcn/ui equivalent exists
- ❌ Bypass the `services/` layer for API calls
- ❌ Hardcode Arabic text in TSX files (use constants)
- ❌ Use `useEffect` for data fetching
- ❌ Use `any` type
- ❌ Create new Axios instances
- ❌ Use `useMutation` directly in components
- ❌ Store server data in Zustand (use React Query)

---

## 24. Decision Tree

When uncertain:

1. Search the repository for existing implementation
2. If found, reuse the exact pattern
3. If not found, introduce new pattern only if necessary
4. Flag for user review if introducing new patterns

---

## 25. Preferred Examples

| Need | Reference |
|------|-----------|
| CRUD Feature | `src/features/programs/` |
| Auth/Session | `src/features/auth/` |
| Video Player | `src/components/video-player/ReactMediaPlayer.tsx` |
| API Configuration | `src/lib/api/axios/` |
| Endpoint Definition | `src/lib/api/endpoints/endpoints.ts` |
| Global Hook | `src/hooks/useApiMutation.ts` |
| Route Constants | `src/lib/routes.ts` |

---

## 26. Git Rules

- **Commit messages**: Use conventional commits (`feat:`, `fix:`, `refactor:`, etc.)
- **Branch naming**: `feature/[name]`, `fix/[name]`, `refactor/[name]`
- **Pre-commit**: Run lint-staged with `--max-arg-length 4000`

---

## 27. Performance Requirements

| Goal | Criterion |
|------|-----------|
| Page loading | < 3 seconds |
| Video start | < 5 seconds |
| Video progress save | Every 30s (if ≤5% change) |
| Quiz auto-save | Every 30 seconds |

---

## 28. Phase Plan

### Phase 0: Project Foundation ✅
- Next.js project initialized
- Core lib files (Axios, endpoints, types, hooks)
- Feature-based folder structure
- Auth and Programs features as reference

### Phase 1: Video Player & Lesson Viewing
1. Create ReactMediaPlayer component
2. Create VideoPlayer component (course lesson player)
3. Create CourseSidebar component
4. Create lesson progress tracking hooks
5. Build lesson viewing page

### Phase 2: Auth & Core Layout
1. Build login page
2. Build register page
3. Build forgot password page
4. Create dashboard layout with sidebar
5. Implement role-based navigation

### Phase 3: Student Dashboard
1. Build student overview page
2. Create profile page
3. Build "My Courses" list
4. Create course enrollment flow
5. Build certificates view

### Phase 4: Programs & Courses (Supervisor)
1. Build programs CRUD pages
2. Create courses CRUD pages
3. Build lessons CRUD pages
4. Implement course sequencing UI

### Phase 5: Assessment System
1. Build QuizEngine component (7 question types)
2. Create quiz timer component
3. Implement quiz auto-save
4. Build quiz results display

### Phase 6: Attendance System
1. Build QR attendance page
2. Create GPS verification
3. Build supervisor session creation
4. Create attendance logs view

### Phase 7: Certificates & Payments
1. Build certificate template system
2. Create certificate verification page
3. Build CliQ payment flow
4. Create invoice/receipt system

### Phase 8: Admin Dashboard
1. Build admin overview page
2. Create user management
3. Build payment management
4. Create audit log viewer
5. Build platform settings

### Phase 9: Polish & Performance
1. Performance optimization
2. Loading states and skeletons
3. Error boundaries
4. Mobile responsiveness audit
5. Accessibility improvements

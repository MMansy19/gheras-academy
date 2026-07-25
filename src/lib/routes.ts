export const ROUTES = {
  ROOT: "/",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FORGOT_PASSWORD: "/auth/forgot-password",

  // Public
  PROGRAMS: "/programs",
  PROGRAM_DETAIL: (id: string) => `/programs/${id}`,
  VERIFY_CERTIFICATE: (code: string) => `/verify-certificate/${code}`,
  ATTEND: "/attend",

  // Student Dashboard
  STUDENT_HOME: "/student",
  STUDENT_PROFILE: "/student/profile",
  STUDENT_MY_COURSES: "/student/my-courses",
  STUDENT_COURSE_DETAIL: (id: string) => `/student/my-courses/${id}`,
  STUDENT_LESSON: (courseId: string, lessonId: string) =>
    `/student/my-courses/${courseId}/${lessonId}`,
  STUDENT_QUIZ: (courseId: string, quizId: string) =>
    `/student/my-courses/${courseId}/quiz/${quizId}`,
  STUDENT_CERTIFICATES: "/student/certificates",
  STUDENT_PAYMENTS: "/student/payments",
  STUDENT_STATS: "/student/stats",

  // Supervisor Dashboard
  SUPERVISOR_HOME: "/supervisor",
  SUPERVISOR_PROGRAMS: "/supervisor/programs",
  SUPERVISOR_NEW_PROGRAM: "/supervisor/programs/new",
  SUPERVISOR_EDIT_PROGRAM: (id: string) => `/supervisor/programs/${id}/edit`,
  SUPERVISOR_COURSES: "/supervisor/courses",
  SUPERVISOR_NEW_COURSE: "/supervisor/courses/new",
  SUPERVISOR_EDIT_COURSE: (id: string) => `/supervisor/courses/${id}/edit`,
  SUPERVISOR_LESSONS: (courseId: string) => `/supervisor/courses/${courseId}/lessons`,
  SUPERVISOR_NEW_LESSON: (courseId: string) => `/supervisor/courses/${courseId}/lessons/new`,
  SUPERVISOR_EDIT_LESSON: (courseId: string, lessonId: string) =>
    `/supervisor/courses/${courseId}/lessons/${lessonId}`,
  SUPERVISOR_QUIZZES: "/supervisor/quizzes",
  SUPERVISOR_NEW_QUIZ: "/supervisor/quizzes/new",
  SUPERVISOR_EDIT_QUIZ: (id: string) => `/supervisor/quizzes/${id}`,
  SUPERVISOR_STUDENTS: "/supervisor/students",
  SUPERVISOR_STUDENT_DETAIL: (id: string) => `/supervisor/students/${id}`,
  SUPERVISOR_ATTENDANCE: "/supervisor/attendance",
  SUPERVISOR_NEW_ATTENDANCE_SESSION: "/supervisor/attendance/sessions/new",
  SUPERVISOR_MANUAL_ATTENDANCE: "/supervisor/attendance/manual",
  SUPERVISOR_CERTIFICATES: "/supervisor/certificates",
  SUPERVISOR_NEW_CERTIFICATE_TEMPLATE: "/supervisor/certificates/templates/new",
  SUPERVISOR_REVIEWS: "/supervisor/reviews/written-answers",
  SUPERVISOR_ANNOUNCEMENTS: "/supervisor/announcements",

  // Admin Dashboard
  ADMIN_HOME: "/admin",
  ADMIN_USERS: "/admin/users",
  ADMIN_NEW_USER: "/admin/users/new",
  ADMIN_USER_DETAIL: (id: string) => `/admin/users/${id}`,
  ADMIN_PAYMENTS: "/admin/payments",
  ADMIN_PENDING_PAYMENTS: "/admin/payments/pending",
  ADMIN_PAYMENT_REPORTS: "/admin/payments/reports",
  ADMIN_SETTINGS: "/admin/settings",
  ADMIN_PASSING_SCORE: "/admin/settings/passing-score",
  ADMIN_ATTENDANCE_RULES: "/admin/settings/attendance-rules",
  ADMIN_AUDIT_LOG: "/admin/audit-log",
  ADMIN_STATISTICS: "/admin/statistics",
} as const;

/**
 * @file endpoints.ts
 * @layer lib/api/endpoints
 * @description All API endpoint definitions for Ghiras Academy.
 */

import { endpoints } from ".";

// Auth
const auth = endpoints("auth");

export const authEndpoints = {
  base: auth.path(""),
  login: auth.path("login"),
  register: auth.path("register"),
  refresh: auth.path("refresh-token"),
  forgotPassword: auth.path("forgot-password"),
  resetPassword: auth.path("reset-password"),
};

// Users / Profile
const users = endpoints("users");

export const profileEndpoints = {
  get: users.path("profile"),
  put: users.path("profile"),
};

// Programs
const programs = endpoints("programs");

export const programsEndpoints = programs.crud("");

// Courses
const courses = endpoints("courses");

export const coursesEndpoints = {
  ...courses.crud(""),
  byProgram: (programId: string | number) => courses.path(`program/${programId}`),
};

// Lessons
const lessons = endpoints("lessons");

export const lessonsEndpoints = {
  ...lessons.crud(""),
  byCourse: (courseId: string | number) => lessons.path(`course/${courseId}`),
};

// Lesson Progress
const lessonProgress = endpoints("lesson-progress");

export const lessonProgressEndpoints = {
  get: (lessonId: string | number) => lessonProgress.path(`${lessonId}`),
  update: (lessonId: string | number) => lessonProgress.path(`${lessonId}`),
};

// Quizzes
const quizzes = endpoints("quizzes");

export const quizzesEndpoints = {
  ...quizzes.crud(""),
  byCourse: (courseId: string | number) => quizzes.path(`course/${courseId}`),
};

// Questions
const questions = endpoints("questions");

export const questionsEndpoints = {
  ...questions.crud(""),
  byQuiz: (quizId: string | number) => questions.path(`quiz/${quizId}`),
};

// Quiz Attempts
const quizAttempts = endpoints("quiz-attempts");

export const quizAttemptsEndpoints = {
  start: quizAttempts.path("start"),
  submit: quizAttempts.path("submit"),
  byQuiz: (quizId: string | number) => quizAttempts.path(`quiz/${quizId}`),
};

// Exams
const exams = endpoints("exams");

export const examsEndpoints = {
  ...exams.crud(""),
  byProgram: (programId: string | number) => exams.path(`program/${programId}`),
};

// Exam Attempts
const examAttempts = endpoints("exam-attempts");

export const examAttemptsEndpoints = {
  start: examAttempts.path("start"),
  submit: examAttempts.path("submit"),
  save: examAttempts.path("save"),
  byExam: (examId: string | number) => examAttempts.path(`exam/${examId}`),
};

// Attendance Sessions
const attendanceSessions = endpoints("attendance-sessions");

export const attendanceSessionsEndpoints = {
  ...attendanceSessions.crud(""),
  byCourse: (courseId: string | number) => attendanceSessions.path(`course/${courseId}`),
};

// Attendance Logs
const attendanceLogs = endpoints("attendance-logs");

export const attendanceLogsEndpoints = {
  ...attendanceLogs.crud(""),
  scan: attendanceLogs.path("scan"),
  manual: attendanceLogs.path("manual"),
  bySession: (sessionId: string | number) => attendanceLogs.path(`session/${sessionId}`),
  byStudent: (studentId: string | number) => attendanceLogs.path(`student/${studentId}`),
};

// Enrollments
const enrollments = endpoints("enrollments");

export const enrollmentsEndpoints = {
  ...enrollments.crud(""),
  byStudent: (studentId: string | number) => enrollments.path(`student/${studentId}`),
  byCourse: (courseId: string | number) => enrollments.path(`course/${courseId}`),
};

// Batches
const batches = endpoints("batches");

export const batchesEndpoints = {
  ...batches.crud(""),
  byCourse: (courseId: string | number) => batches.path(`course/${courseId}`),
};

// Students
const students = endpoints("students");

export const studentsEndpoints = students.crud("");

// Certificates
const certificates = endpoints("certificates");

export const certificatesEndpoints = {
  ...certificates.crud(""),
  byStudent: (studentId: string | number) => certificates.path(`student/${studentId}`),
  verify: certificates.path("verify"),
};

// Certificate Templates
const certificateTemplates = endpoints("certificate-templates");

export const certificateTemplatesEndpoints = certificateTemplates.crud("");

// Payments
const payments = endpoints("payments");

export const paymentsEndpoints = {
  ...payments.crud(""),
  byStudent: (studentId: string | number) => payments.path(`student/${studentId}`),
  confirm: payments.path("confirm"),
};

// Invoices
const invoices = endpoints("invoices");

export const invoicesEndpoints = {
  ...invoices.crud(""),
  byPayment: (paymentId: string | number) => invoices.path(`payment/${paymentId}`),
};

// Audit Logs
const auditLogs = endpoints("audit-logs");

export const auditLogsEndpoints = auditLogs.crud("");

// Settings
const settings = endpoints("settings");

export const settingsEndpoints = {
  get: settings.path(""),
  put: settings.path(""),
};

// Statistics
const statistics = endpoints("statistics");

export const statisticsEndpoints = {
  overview: statistics.path("overview"),
  students: statistics.path("students"),
  courses: statistics.path("courses"),
};

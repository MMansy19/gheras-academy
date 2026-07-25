import { IBaseRecord } from "./api.responses";

// User / Profile
export interface IUser extends IBaseRecord {
  email: string;
  phone: string;
  countryCode: string;
  firstName: string;
  lastName: string;
  role: "student" | "supervisor" | "admin";
  avatar?: string | null;
}

export interface IProfile extends IUser {
  dateOfBirth: string;
  gender: "male" | "female";
  nationality: string;
  countryOfResidence: string;
  telegramId: string;
  educationLevel: string;
  previousShariaPrograms: boolean;
  previousShariaProgramsDetail?: string;
  howHeardAbout: string;
  lastLoginAt?: string;
}

// Program
export interface IProgram extends IBaseRecord {
  name: string;
  description: string;
}

// Course
export interface ICourse extends IBaseRecord {
  programId: string;
  name: string;
  description: string;
  type: "electronic" | "hybrid";
  isSequential: boolean;
  price: number;
  createdBy: string;
}

// Lesson
export interface ILesson extends IBaseRecord {
  courseId: string;
  title: string;
  description: string;
  videoUrl: string;
  videoSource: "youtube" | "cloudflare" | "external";
  textContent?: string;
  pdfUrl?: string;
  duration: number;
  orderIndex: number;
  isSequential: boolean;
  requiredCompletion: number;
}

// Enrollment
export interface IEnrollment extends IBaseRecord {
  userId: string;
  courseId: string;
  batchId?: string;
  status: "active" | "completed" | "dropped";
}

// Batch
export interface IBatch extends IBaseRecord {
  courseId: string;
  name: string;
  startDate: string;
  endDate?: string;
}

// Lesson Progress
export interface ILessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  watchedPercentage: number;
  lastPosition: number;
  firstWatchedAt: string;
  lastWatchedAt: string;
  completedAt?: string;
}

// Quiz
export interface IQuiz extends IBaseRecord {
  courseId: string;
  title: string;
  description: string;
  passingScore: number;
  maxAttempts: number;
  timeLimit?: number;
}

// Question
export interface IQuestion extends IBaseRecord {
  quizId: string;
  type: "mcq" | "tf" | "fill" | "match" | "order" | "image" | "written";
  content: string;
  options?: Record<string, unknown>;
  correctAnswer?: string;
  imageUrl?: string;
  orderIndex: number;
}

// Quiz Attempt
export interface IQuizAttempt extends IBaseRecord {
  userId: string;
  quizId: string;
  score: number;
  startedAt: string;
  completedAt?: string;
  answers: Record<string, unknown>;
}

// Exam
export interface IExam extends IBaseRecord {
  programId: string;
  title: string;
  passingScore: number;
  startsAt: string;
  endsAt: string;
  timeLimit?: number;
}

// Exam Attempt
export interface IExamAttempt extends IBaseRecord {
  userId: string;
  examId: string;
  score: number;
  startedAt: string;
  completedAt?: string;
  disconnectedAt?: string;
  answers: Record<string, unknown>;
}

// Attendance Session
export interface IAttendanceSession extends IBaseRecord {
  courseId: string;
  sessionId: string;
  qrCode: string;
  startsAt: string;
  endsAt: string;
  locationLat?: number;
  locationLng?: number;
  createdBy: string;
}

// Attendance Log
export interface IAttendanceLog extends IBaseRecord {
  userId: string;
  sessionId: string;
  status: "confirmed" | "flagged" | "rejected";
  gpsLat?: number;
  gpsLng?: number;
  distanceFromSession?: number;
  scannedAt: string;
  source: "qr" | "manual" | "video";
}

// Certificate Template
export interface ICertificateTemplate extends IBaseRecord {
  programId: string;
  name: string;
  fileUrl: string;
  placeholders: Record<string, unknown>;
  fontSize: number;
  fontColor: string;
}

// Certificate
export interface ICertificate extends IBaseRecord {
  userId: string;
  programId: string;
  templateId: string;
  certificateNumber: string;
  issuedAt: string;
  isManual: boolean;
  issuedBy?: string;
}

// Payment
export interface IPayment extends IBaseRecord {
  userId: string;
  courseId: string;
  amount: number;
  method: "cliq" | "manual" | "electronic";
  status: "pending" | "confirmed" | "rejected";
  transactionId?: string;
  confirmedBy?: string;
  confirmedAt?: string;
}

// Invoice
export interface IInvoice extends IBaseRecord {
  paymentId: string;
  invoiceNumber: string;
  pdfUrl?: string;
}

// Audit Log
export interface IAuditLog extends IBaseRecord {
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  oldData?: Record<string, unknown>;
  newData?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

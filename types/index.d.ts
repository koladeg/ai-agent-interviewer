interface Feedback {
  id: string;
  interviewId: string;
  totalScore: number;
  categoryScores: Array<{
    name: string;
    score: number;
    comment: string;
  }>;
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: string;
}

interface ReportFeedback {
  id: string;
  interviewId: string;
  title: string;
  metadata: Array<{
    report_purpose: string;
    timeframe: string;
  }>;
  sections: Array<{
    heading: string;
    content: string;
  }>;
  createdAt: string;
}
interface Interview {
  id: string;
  role: string;
  level: string;
  questions: string[];
  techstack: string[];
  createdAt: string;
  userId: string;
  type: string;
  finalized: boolean;
}

interface Report {
  id: string;
  report_type: string;
  report_purpose: string;
  questions: string[];
  timeframe: string;
  urgency: string;
  createdAt: string;
  userId: string;
  key_metrics: string;
  extra_notes: string;
  finalized: boolean;
}

interface CreateFeedbackParams {
  interviewId: string;
  userId: string;
  transcript: { role: string; content: string }[];
  feedbackId?: string;
}

interface CreateReportFeedbackParams {
  interviewId: string;
  userId: string;
  transcript: { role: string; content: string }[];
  feedbackId?: string;
  report_type: string;
  report_purpose: string;
  reportFeedbackId: string;
  timeframe: string;
}

interface User {
  name: string;
  email: string;
  id: string;
}

interface InterviewCardProps {
  interviewId?: string;
  userId?: string;
  role: string;
  type: string;
  techstack: string[];
  createdAt?: string;
}

interface ReportCardProps {
  interviewId?: string;
  userId?: string;
  report_type: string;
  report_purpose: string;
  // techstack: string[];
  createdAt?: string;
}

interface AgentProps {
  userName: string;
  userId?: string;
  interviewId?: string;
  feedbackId?: string;
  reportFeedbackId?: string;
  report_type?: string;
  report_purpose?: string;
  timeframe?: string;
  type: "generate" | "interview";
  questions?: string[];
  profileImage?: string;
}

interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

interface GetFeedbackByInterviewIdParams {
  interviewId: string;
  userId: string;
}

interface GetLatestInterviewsParams {
  userId: string;
  limit?: number;
}

interface GetLatestReportsParams {
  userId: string;
  limit?: number;
}

interface SignInParams {
  email: string;
  idToken: string;
}

interface SignUpParams {
  uid: string;
  name: string;
  email: string;
  password: string;
}

type FormType = "sign-in" | "sign-up";

interface InterviewFormProps {
  interviewId: string;
  role: string;
  level: string;
  type: string;
  techstack: string[];
  amount: number;
}

interface TechIconProps {
  techStack: string[];
}

export type GradingSession = {
  id: string;
  user_id: string;
  title: string;
  status: "draft" | "processing" | "completed" | "failed";
  marking_key_text?: string | null;
  error_message?: string | null;
  created_at: string;
  updated_at: string;
};

export type SessionPaper = {
  id: string;
  session_id: string;
  label: string;
  file_name?: string | null;
  extracted_text?: string | null;
  sort_order: number;
};

export type GradingResult = {
  id: string;
  session_id: string;
  paper_id: string;
  total_score?: number | null;
  max_score?: number | null;
  percentage?: number | null;
  question_breakdown: Array<{
    question: string;
    score: number;
    max: number;
    feedback: string;
  }>;
  feedback_summary?: string | null;
};

export type DashboardStats = {
  total_sessions: number;
  completed_sessions: number;
  papers_graded: number;
  average_percentage: number | null;
};

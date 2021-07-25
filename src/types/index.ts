export interface AuthState {
  isLoading: boolean;
  userId: string | null;
}

export interface VerificationState {
  isLoading: boolean;
  message: string | null;
}

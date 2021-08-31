export interface User {
  id: string;
  photoURL: string;
  name: string;
}

export interface Suggestion {
  id?: string;
  suggestion: string;
  user: User;
  votes: string[];
  timestamp: any;
}

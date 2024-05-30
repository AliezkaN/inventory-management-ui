export interface UserResponse {
  id?: number;
  firstName?: string;
  lastName?: string;
  role?: string;
  email?: string;
  enabled?: boolean;
  accountLocked?: boolean;
  createDate?: string;
  lastModifiedDate?: string;
}

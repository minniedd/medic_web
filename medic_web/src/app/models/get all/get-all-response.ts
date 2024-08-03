export interface GetAllResponse {
  users: GetAllResponseUser[]
}
export interface GetAllResponseUser {
  id: number;
  name: string;
  username: string;
  lastLoginDate: string;
}

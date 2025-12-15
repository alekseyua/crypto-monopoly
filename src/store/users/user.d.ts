interface IUser {
  invited_users: [];

  id: number;
  username: string;
  email: string;
  balance: number;
  date_join: string; // ISO date
  days_in_sevice: number;
  is_confirmed: boolean;
  phone_number: string | null;
  photo: string | null;
  referral_code: string;
  referred_by: number | null;
  state_registration: 0 | 1 | 2 | 3 | 4 | 5;
  state_registration_text: string;
  invited_users: User[]; // если это те же пользователи
}

interface IUserPayload {
  email: string;
  callback?: (any)=>void;
}
export { IUser, IUserPayload };

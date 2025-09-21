interface IUser {
  balance: number;
  email: string;
  id: number;
  is_confirmed: boolean;
  phone_number: string | null;
  referral_code: string;
  referred_by: string | null;
  state_registration: number;
  state_registration_text: string;
  username: string;
  photo: string | null;
  invited_users: [];
}

interface IUserPayload {
  email: string;
  callback?: (any)=>void;
}
export { IUser, IUserPayload };

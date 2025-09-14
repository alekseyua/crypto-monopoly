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
}
export { IUser };

interface IProfile {
    "id": number;
    "state_registration": number;
    "state_registration_text": string;
    "email": string;
    "username": string;
    "phone_number": null;
    "is_confirmed": boolean;
    "referred_by": null;
    "referral_code": string;
    "balance": number;
}

type Currency = "USDT-TRC20" | "USDT-ERC20";
type PaymentStatus = "pending" | "confirmed" | "failed" | "zeroed";

interface PaymentConfirm {
  payment_hash: string;
  payment_id: string;
}

interface Payment {
  id: number | null; // null при создании нового платежа
  amount: string; // Приходит как строка с десятичными
  currency: Currency;
  address: string;
  status: PaymentStatus; // Можно заменить на enum
  tx_hash: string | null;
  created_at: string; // ISO дата в строковом виде
  user: number;
}

interface PaymentError {
  amount: boolean;
  currency: boolean;
  address: boolean;
  status?: boolean;
  tx_hash?: boolean;
  user: boolean;
}

interface IUpdatePhoneNumber {
  phone_number: string;
  callback: (v:any)=>void;
}

interface IPayloadUpdatePhotoAvatar {
  photo: File
}

type ButtonStatus = "active" | "inactive" | undefined;

// Типы кнопок по типу
type DashboardButtonType =
  | "common"
  | "security"
  | "chat"
  | "account"
  | "balance";

// Тип кнопки
interface IDashboardButton {
  name: string;
  type: DashboardButtonType;
  status?: ButtonStatus;
  amount_messages?: number; // только у type === 'chat'
}

// Главный тип dashboardProfile
interface IDashboardProfile {
  name: string;
  button: DashboardButton[];
}

interface IFilterItem {
  title: string;
  status: boolean;
}

export {
  IProfile,
  Payment,
  PaymentError,
  PaymentConfirm,
  IDashboardButton,
  IDashboardProfile,
  IUpdatePhoneNumber,
  IPayloadUpdatePhotoAvatar,
  IFilterItem,
};
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


export {
    IProfile,
}
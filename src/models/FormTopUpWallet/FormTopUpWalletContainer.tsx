// FormTopUpWalletContainer.tsx
import React, { useEffect } from "react";
import FormTopUpWallet from "./FormTopUpWallet";
import { useStoreon } from "storeon/react";
import { CONFIRM_PAYMENT, TOP_UP_WALLET } from "../../store/profile/profile";
import { Payment, PaymentConfirm } from "../../store/profile/profile.d";
import { SubmitHandler, useForm } from "react-hook-form";
import { IUser } from "../../store/users/user.d";
import ConfirmPaymentForm from "./FormConfirmPayment";

type StateStoreon = {
  user: IUser;
  paymentStore: Payment;
};

type Events = {
  [TOP_UP_WALLET]: Payment;
  [CONFIRM_PAYMENT]: PaymentConfirm;
};
export type ConfirmPaymentFormData = {
  tx_hash: string;
  payment_id?: string;
};


const FormTopUpWalletContainer: React.FC = () => {
  const {
    dispatch,
    user,
    paymentStore,
  } = useStoreon<
    StateStoreon,
    Events
  >("user", "paymentStore");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Payment>();

  const {
    register: registerConfirm,
    handleSubmit: handleSubmitConfirm,
    formState: { errors: errorsConfirm },
  } = useForm<ConfirmPaymentFormData>();

  useEffect(() => {
    reset({
      user: user.id,
      address: ' ',
    });
  }, [reset, user]);

  const onSubmit: SubmitHandler<Payment> = (params) => {
    dispatch(TOP_UP_WALLET, params);
  };

  const onConfirm: SubmitHandler<ConfirmPaymentFormData> = (data) => {
    dispatch(CONFIRM_PAYMENT, {
      payment_hash: data.tx_hash,
      payment_id: paymentStore.id + "",
    });
  };
if(paymentStore && paymentStore.id) {
    return (
      <ConfirmPaymentForm
        data={paymentStore}
        onConfirm={handleSubmitConfirm(onConfirm)}
        register={registerConfirm}
        errors={errorsConfirm}
      />
    );
  }
  
  return (
    <FormTopUpWallet
      register={register}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default FormTopUpWalletContainer;

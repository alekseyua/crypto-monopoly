import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Button, Input, Offset } from "../../shared/UI";

import styles from "./styles/confirm-payment.module.scss";
import { Payment } from "../../store/profile/profile.d";
import { ConfirmPaymentFormData } from "./FormTopUpWalletContainer";

interface Props {
  register: UseFormRegister<ConfirmPaymentFormData>;
  errors: FieldErrors<ConfirmPaymentFormData>;
  data: Payment;
  onConfirm: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ConfirmPaymentForm: React.FC<Props> = ({
  data: { amount, currency, address, status, created_at },
  onConfirm,
  register,
  errors,
}) => {
  

  return (
    <form onSubmit={onConfirm} className={styles.form}>
      <div className={styles.infoBlock}>
        <p>
          <strong>Сумма:</strong> {amount} {currency}
        </p>
        <p>
          <strong>Адрес:</strong> {address}
        </p>
        <p>
          <strong>Статус:</strong> {status}
        </p>
        <p>
          <strong>Дата создания:</strong>{" "}
          {new Date(created_at).toLocaleString()}
        </p>
        <p>
          <strong>Tx Hash:</strong> Не указан
        </p>
      </div>
      <Offset mt={20} />
      <Input
        label="Введите Tx Hash для подтверждения"
        placeholder="Вставьте hash из вашего кошелька"
        {...register("tx_hash", {
          required: "Tx Hash обязателен",
          minLength: { value: 5, message: "Минимум 5 символов" },
        })}
        errorText={errors?.tx_hash?.message}
        id={"tx_hash"}
        type="text"
        style={{ padding: "14px 25px" }}
      />
      <Offset mt={20} />

      <Button
        variant="gradient"
        gradientColors={["#E4863F", "#FAD660"]}
        typeBtn="submit"
        p={24}
      >
        Подтвердить платеж
      </Button>
    </form>
  );
};

export default ConfirmPaymentForm;

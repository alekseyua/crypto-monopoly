// FormTopUpWallet.tsx
import React from "react";
import styles from "./styles/form-input-create-quick-game.module.scss";
import { Button, Input, Offset } from "../../shared/UI";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Payment } from "../../store/profile/profile.d";

interface IFormTopUpWallet {
  register: UseFormRegister<Payment>;
  errors: FieldErrors<Payment>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const FormTopUpWallet: React.FC<IFormTopUpWallet> = ({
  register,
  errors,
  onSubmit,
}) => {
  return (
    <div className={styles["form-input-create-quick-game__container"]}>
      <div className={styles["form-input-create-quick-game__container-wrap"]}>
        <form onSubmit={onSubmit}>
          {/* Если нужно выбрать валюту */}
          <select
            {...register("currency", { required: "Выберите валюту" })}
            className={styles["form-input-create-quick-game__container-wrap"]}
          >
            <option value="">Выберите валюту</option>
            <option value="USDT-TRC20">USDT-TRC20</option>
            <option value="USDT-ERC20">USDT-ERC20</option>
          </select>
          {errors.currency && (
            <p className={styles["errorText"]}>{errors.currency.message}</p>
          )}
          <Offset mt={20} />
          <Input
            label="Сумма пополнения"
            className={styles["form-input-create-quick-game__container-wrap"]}
            type="number"
            id="amount"
            placeholder="Введите сумму для пополнения"
            style={{ padding: "14px 25px" }}
            errorText={errors.amount?.message}
            {...register("amount", {
              required: "Поле обязательно",
              min: {
                value: 1,
                message: "Сумма должна быть больше 0",
              },
              max: {
                value: 100000,
                message: "Сумма должна быть меньше 100000",
              },
            })}
          />

          {/* <Input
            label="Адрес кошелька"
            className={styles["form-input-create-quick-game__container-wrap"]}
            type="text"
            id="address"
            placeholder="Введите адрес"
            style={{ padding: "14px 25px" }}
            errorText={errors.address?.message}
            {...register("address", {
              required: "Адрес обязателен",
              minLength: {
                value: 1,
                message: "Минимум 1 символ",
              },
              maxLength: {
                value: 100,
                message: "Максимум 100 символов",
              },
            })}
          /> */}

          {/* <Input
            label="ID пользователя"
            className={styles["form-input-create-quick-game__container-wrap"]}
            type="number"
            id="user"
            placeholder="Введите ваш ID"
            style={{ padding: "14px 25px" }}
            errorText={errors.user?.message}
            {...register("user", {
              required: "ID пользователя обязателен",
              min: {
                value: 1,
                message: "ID должен быть больше 0",
              },
            })}
          /> */}

          <div
            className={
              styles["form-input-create-quick-game__container-wrap-submit"]
            }
          >
            <Button
              variant="gradient"
              gradientColors={["#E4863F", "#FAD660"]}
              typeBtn="submit"
              p={24}
            >
              Создать заявку
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormTopUpWallet;

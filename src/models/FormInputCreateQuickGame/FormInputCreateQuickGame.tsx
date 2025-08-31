import React from 'react'
import styles from './styles/form-input-create-quick-game.module.scss';
import { Button, Input, Label } from '../../shared/UI';

// name: 'test-create-v2',
// bet_amount: 51,
// turn_time: 61,
// start_money: 101,
// max_players: 2,
interface IFormInputCreateQG{
  handleChangeInput: (e: string, key: string)=> void;
  handleSubmit: ()=> void;
  paramsError: any;
}
const FormInputCreateQG:React.FC<IFormInputCreateQG> = ({
  handleSubmit,
  handleChangeInput,
  paramsError,
}: IFormInputCreateQG) => {
  return (
    <div className={styles["form-input-create-quick-game__container"]}>
      <div className={styles["form-input-create-quick-game__container-wrap"]}>
        <Input
          label="Название игры"
          className={styles["form-input-create-quick-game__container-wrap"]}
          onChange={(e: string) => handleChangeInput(e, "name")}
          type="text"
          id="name"
          placeholder="Введите название игры например Империя"
          style={{
            padding: "14px 25px",
          }}
        />
        <Input
          label="Количество игроков"
          className={styles["form-input-create-quick-game__container-wrap"]}
          onChange={(e: string) => handleChangeInput(e, "max_players")}
          type="number"
          id="max_players"
          min={2}
          max={10}
          style={{
            padding: "14px 25px",
          }}
          placeholder="Введите количество игроков от 2 до 10"
        />
        <Input
          label="Ценна входа"
          className={styles["form-input-create-quick-game__container-wrap"]}
          onChange={(e: string) => handleChangeInput(e, "bet_amount")}
          type="number"
          id="bet_amount"
          placeholder="Введите сумму для входа в игру >?"
          min={1}
          style={{
            padding: "14px 25px",
          }}
        />

        <Input
          label="Стартовый баланс"
          className={styles["form-input-create-quick-game__container-wrap"]}
          onChange={(e: string) => handleChangeInput(e, "start_money")}
          type="number"
          id="start_money"
          placeholder="Укажите баланс игры >?"
          min={1}
          style={{
            padding: "14px 25px",
          }}
        />
        <Input
          label="Время на ход"
          className={styles["form-input-create-quick-game__container-wrap"]}
          onChange={(e: string) => handleChangeInput(e, "turn_time")}
          type="number"
          id="turn_time"
          placeholder="Введите время на ход в секундах"
          min={90}
          style={{
            padding: "14px 25px",
          }}
        />
        <div
          className={
            styles["form-input-create-quick-game__container-wrap-submit"]
          }
        >
          {/* variant?: 'primary' | 'secondary' | 'tertiary' | 'gradient' | any | undefined; */}
          <Button
            disabled={
              !(
                paramsError.name &&
                paramsError.bet_amount &&
                paramsError.turn_time &&
                paramsError.start_money &&
                paramsError.max_players
              )
            }
            variant="gradient"
            gradientColors={["#E4863F", "#FAD660"]}
            onClick={handleSubmit}
          >
            Создать игру
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FormInputCreateQG;
import cls from './styles/balance-profile.module.css';
import { Button, Label } from '../../shared/UI';

interface IProps {
  balance?: number;
  handleBalance?: (action: "top up" | "withdraw") => void;
}       

const BalanceProfile:React.FC<IProps> = ({
    balance,
    handleBalance,
}:IProps) => {
    return (
        <div
            className={cls.containerBalanceProfile}
        >
            <Label 
                text={'Ваш баланс'}
                variant={'title'}
                type={'transparent'}
            />
            <div className={cls.rowBalanceProfile}>
                <Label
                    type={'transparent'}
                    variant={'outline'}
                    text={balance + ''}
                    center
                />
                <Button 
                    className={cls.btnWithdrawBalanceProfile}
                    onClick={() => handleBalance && handleBalance('withdraw')}
                >Вывести</Button>
                <Button 
                    className={cls.btnAddBalanceProfile}
                    onClick={() => handleBalance && handleBalance('top up')}
                >Пополнить</Button>
            </div>
        </div>
    )
}

export default BalanceProfile
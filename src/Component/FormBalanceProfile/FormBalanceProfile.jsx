import cls from './styles/balance-profile.module.css';
import { Button, Label } from '../../shared/UI';

const FormBalanceProfile = () => {
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
                    text={'250$'}
                    center
                />
                <Button 
                    className={cls.btnWithdrawBalanceProfile}
                >Вывести</Button>
                <Button 
                    className={cls.btnAddBalanceProfile}
                >Пополнить</Button>
            </div>
        </div>
    )
}

export default FormBalanceProfile
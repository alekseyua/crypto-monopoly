import cls from './styles/account-details.module.css';
import { Button, Label, Offset } from '../../shared/UI';
import { crossBlack, IconTemp1 } from '../../assets';
import Icon from '../../shared/UI/Icon/Icon';

const FormAdditinalAccountDetails = () => {
    return (
        <div
            className={cls.containerAdditinalAccountDetails}
        >
            <Label 
                text={'Подключенные реквизиты'}
                variant={'title'}
                type={'transparent'}
            />
            <Offset mb={15} />
            <div className={cls.rowAdditinalAccountDetails}>
                {/* {
                    Array.from()
                } */}

                <div className={cls.cardContainerAccountDetails}>
                    <div className={cls.cardInnerAccountDetails} >
                        <Icon  src={IconTemp1}  />
                        <Label type={'transparent'} text={'+7 918 *** ** 53'} />
                    </div>
                    <Icon  src={crossBlack}  />
                </div>
                <div className={cls.cardContainerAccountDetails}>
                    <div className={cls.cardInnerAccountDetails} >
                        <Icon  src={IconTemp1}  />
                        <Label type={'transparent'} text={'+7 918 *** ** 53'} />
                    </div>
                    <Icon  src={crossBlack}  />
                </div>

            </div>
            <Offset mb={15} />
            <Label 
                text={'Добавить реквизиты '}
                variant={'title'}
                type={'transparent'}
            />
            <Label 
                text={'Вы можете добавить реквизиты для вывода и пополнения средств чтобы в будущем осуществлять транзакции в 2 клика.'}
                type={'transparent'}
            />
            <Offset mb={26} />
            <Button 
                onClick={()=>alert('how add account details?')}
                className={cls.btnAdditinalAccountDetails}
            >Добавить реквизиты</Button>
        </div>
    )
}

export default FormAdditinalAccountDetails
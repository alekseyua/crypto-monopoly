import cls from './styles/history-transaction.module.css';
import { Label, Offset } from '../../shared/UI';
import { IconTemp2 } from '../../assets';
import Icon from '../../shared/UI/Icon/Icon';

const FormHistoryTransaction = () => {
    return (
        <div
            className={cls.containerHistoryTransaction}
        >
            <Label 
                text={'История транзакций'}
                variant={'title'}
                type={'transparent'}
            />
            <Offset mb={15} />
            <Label 
                text={'25 декабря'}
                type={'transparent'}
            />
            <div className={cls.rowHistoryTransaction}>
                {/* {
                    Array.from()
                } */}
                <Offset mt={18} />
                <div className={cls.cardContainerHistoryTransaction}>
                    <div className={cls.cardWrapTitleHistoryTransaction}>
                        <Icon  src={IconTemp2}  width={40} height={40} />
                        <div className={cls.cardInnerHistoryTransaction} >
                            <Label type={'transparent'} text={'<b>Победа в быстрой игре</b>'} />
                            <Label type={'transparent'} text={'Быстрая игра'} />
                        </div>
                    </div>
                    <div className={cls.cardInnerHistoryTransaction} >
                        <Label type={'transparent'} text={'<b style="color:#726CED">+25 $</b>'} />
                        <Label type={'transparent'} text={'(2 $ комиссия)'} />
                    </div>
                </div>
                {/* ----------------------------- */}
                <Offset mt={18} />
                <div className={cls.cardContainerHistoryTransaction}>
                    <div className={cls.cardWrapTitleHistoryTransaction}>
                        <Icon  src={IconTemp2}  width={40} height={40} />
                        <div className={cls.cardInnerHistoryTransaction} >
                            <Label type={'transparent'} text={'<b>Победа в быстрой игре</b>'} />
                            <Label type={'transparent'} text={'Быстрая игра'} />
                        </div>
                    </div>
                    <div className={cls.cardInnerHistoryTransaction} >
                        <Label type={'transparent'} text={'<b style="color:#726CED">+25 $</b>'} />
                        <Label type={'transparent'} text={'(2 $ комиссия)'} />
                    </div>
                </div>
                {/* ----------------------------- */}
                <Offset mt={18} />
                <div className={cls.cardContainerHistoryTransaction}>
                    <div className={cls.cardWrapTitleHistoryTransaction}>
                        <Icon  src={IconTemp2}  width={40} height={40} />
                        <div className={cls.cardInnerHistoryTransaction} >
                            <Label type={'transparent'} text={'<b>Победа в быстрой игре</b>'} />
                            <Label type={'transparent'} text={'Быстрая игра'} />
                        </div>
                    </div>
                    <div className={cls.cardInnerHistoryTransaction} >
                        <Label type={'transparent'} text={'<b style="color:#726CED">+25 $</b>'} />
                        <Label type={'transparent'} text={'(2 $ комиссия)'} />
                    </div>
                </div>
                {/* ----------------------------- */}
                <Offset mt={18} />
                <div className={cls.cardContainerHistoryTransaction}>
                    <div className={cls.cardWrapTitleHistoryTransaction}>
                        <Icon  src={IconTemp2}  width={40} height={40} />
                        <div className={cls.cardInnerHistoryTransaction} >
                            <Label type={'transparent'} text={'<b>Победа в быстрой игре</b>'} />
                            <Label type={'transparent'} text={'Быстрая игра'} />
                        </div>
                    </div>
                    <div className={cls.cardInnerHistoryTransaction} >
                        <Label type={'transparent'} text={'<b style="color:#726CED">+25 $</b>'} />
                        <Label type={'transparent'} text={'(2 $ комиссия)'} />
                    </div>
                </div>
                {/* ----------------------------- */}

               

            </div>          
        </div>
    )
}

export default FormHistoryTransaction
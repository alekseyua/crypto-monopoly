import { IconConvert, IconGoogleAuth, IconPhone } from '../../assets';
import { Button, Label, Offset } from '../../shared/UI';
import Icon from '../../shared/UI/Icon/Icon';
import cls from './styles/security-account.module.css';


const FormSecuretyAccaunt = () => {
    return (
        <div
            className={cls.containerFormSecuretyAccaunt}
        >
            <div className={cls.descSecuretyAccount}>
                <Label variant={'title'} text={'Защита аккаунта'} type={'transparent'} />
                <Label 
                    type={'transparent'} 
                    text={'Защитите свой аккаунт и настройте двухфакторную авторизацию. Вы можете подключить один или несколько из следующих вариантов:'} 
                />
            </div>
            
            <Button 
                className={cls.btnSecuretyAccountGoogle} 
                onClick={()=>alert('how auth??????')}
            >
                <Label className={cls.titleBtnSecuretyAccount} text={'Google аунтификатор '} type={'transparent'} iconLeft={<Icon  src={IconGoogleAuth}  width={60} height={60} />}/>
                <Offset mb={10} />
                <Label center type={'full'} text={'Выбрать'}/>
            </Button>
            <Button 
                className={cls.btnSecuretyAccountSms} 
                onClick={()=>alert('how auth??????')}
            >
                <Label className={cls.titleBtnSecuretyAccount} text={'Google аунтификатор '} type={'transparent'} iconLeft={<Icon  src={IconPhone}  width={60} height={55} />}/>
                <Offset mb={10} />
                <Label center type={'full'} text={'Выбрать'}/>
            </Button>
            <Button 
                className={`${cls.btnSecuretyAccountEmail} ${cls.active}`} 
                onClick={()=>alert('how auth??????')}
            >
                <Label className={cls.titleBtnSecuretyAccount} text={'Google аунтификатор '} type={'transparent'} iconLeft={<Icon  src={IconConvert}  width={60} height={60} />}/>
                <Offset mb={10} />
                <Label center type={'full'} text={'Подключено'}/>
            </Button>
        </div>
    )
}

export default FormSecuretyAccaunt
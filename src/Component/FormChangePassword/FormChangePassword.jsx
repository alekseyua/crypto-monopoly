import { IconEye } from '../../assets';
import { Button, Input, Label } from '../../shared/UI';
import Icon from '../../shared/UI/Icon/Icon';
import cls from './styles/change-password.module.css';


const FormChangePassword = ({ 
    showPassword,
    handleShowPassword,
}) => {
    return (
        <div
            className={cls.containerChangePass}
        >
            <Label variant={'title'} text={'Смена пароля'} type={'transparent'} />
            <Input 
                className={cls.formInputChangePassword}
                iconRight={<Icon  src={IconEye}  onClick={handleShowPassword} />}
                type={showPassword ? 'text' : 'password'}

                placeholder={'Введите старый пароль'}
            />
            <Button 
                className={cls.btnChangePassword} 
                onClick={()=>alert('how change password??????')}
            >
                Сменить пароль
            </Button>
        </div>
    )
}

export default FormChangePassword
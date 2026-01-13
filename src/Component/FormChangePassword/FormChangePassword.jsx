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
                p={15}
                placeholder={'Введите старый пароль'}
            />
            <Button 
                className={cls.btnChangePassword} 
                onClick={()=>alert('how change password??????')}
                p={15}
            >
                Сменить пароль
            </Button>
        </div>
    )
}

export default FormChangePassword
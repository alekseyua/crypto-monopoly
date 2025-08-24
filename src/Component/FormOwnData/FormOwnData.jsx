import cls from './styles/form-own-data.module.css';
import { avatar, IconCamera } from '../../assets';
import Icon from '../../shared/UI/Icon/Icon';

const FormOwnData = ({ 
    infoUser,
    handleChangeAvatar,
    handleAddPhoneOwnInfo,
}) => {
    return (
        <div
            className={cls.containerOwnCard}
        >
            {
                infoUser !== undefined && Object.keys(infoUser).length ?
                    <>
                        <div
                            className={cls.conAvatar}
                            onClick={handleChangeAvatar}
                        >
                            {
                                !infoUser?.avatar
                                ? <Icon  src={IconCamera}  /> 
                                : <img
                                        src={avatar}
                                        alt="avatar"
                                    />
                            }
                        </div>
                        <div className={cls.containerFormInfoUser}>
                            <div className={cls.formshowInfoUser}>
                                {infoUser.name}
                                <span>Никнейм</span>
                            </div>
                            <div className={cls.formshowInfoUser}>
                                {infoUser.email}
                                <span>Почта</span>
                            </div>
                            <div onClick={handleAddPhoneOwnInfo} className={cls.formshowInfoUserPhone}>{infoUser.phone ? infoUser.phone : 'указать номер телефона' }</div>
                        </div>
                        <div
                            className={cls.infoHowJoinService}
                        >
                            <span 
                                dangerouslySetInnerHTML={{ __html: infoUser.amount_day }}
                            />
                        </div>
                    </>
                    : <>Loading ...</>
            }
        </div>
    )
}

export default FormOwnData
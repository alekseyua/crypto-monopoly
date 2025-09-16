import cls from './styles/form-own-data.module.css';
import { avatar, IconCamera } from '../../assets';
import Icon from '../../shared/UI/Icon/Icon';

const FormOwnData = ({ 
    infoUser,
    handleChangeAvatar,
    handleAddPhoneOwnInfo,
}) => {
    console.log({ infoUser });
    return (
        <div
            className={cls.containerOwnCard}
        >
            {
                infoUser !== undefined && Object.keys(infoUser).length ?
                    <>
                        <div
                            className={cls.conAvatar}
                            >
                            <input 
                                onChange={handleChangeAvatar}
                                type="file" 
                                accept="image/*" 
                                style={{
                                    width: '100%',
                                    opacity: 0,
                                    height: '100%',
                                    position: 'absolute',
                                    zIndex: 10
                                }} 
                            />

                            {
                                !infoUser?.avatar
                                ? <Icon  src={IconCamera}  style={{zIndex:9, position: 'relative'}}/> 
                                : <img
                                        src={avatar}
                                        alt="avatar"
                                    />
                            }
                        </div>
                        <div className={cls.containerFormInfoUser}>
                            <div className={cls.formshowInfoUser}>
                                {infoUser.username}
                                <span>Никнейм</span>
                            </div>
                            <div className={cls.formshowInfoUser}>
                                {infoUser.email}
                                <span>Почта</span>
                            </div>
                            <div onClick={handleAddPhoneOwnInfo} className={cls.formshowInfoUserPhone}>{infoUser.phone_number ? infoUser.phone_number : 'указать номер телефона' }</div>
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
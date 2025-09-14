import { Button, Label, WrapperCard } from '../../shared/UI'
import cls from './styles/auth.module.css';
import Icon from '../../shared/UI/Icon/Icon';
import { google, meta, vk, yandex } from '../../assets';

function AuthPartners({ isAuth, regStep }) {
    return (
        <WrapperCard>
            <Label text={isAuth ? 'Войти через партнеров' : 'Регистрация через партнеров'} className={!isAuth && regStep !== 1 ? cls.socialLinksTitle : ''} type={'gradient'} />
            <div className={!isAuth && regStep !== 1 ? cls.socialLinksShot : cls.socialLinks }>
                <Button p={12}  type='outline' className={cls.socialLinkButton} >

                    <Icon
                        src={google}
                        width={23} height={23} 
                    />
                    {!isAuth && regStep !== 1 
                    ? null
                    : isAuth? 'Войти через Google аккаунт' : 'Регистрация через Google аккаунт'}
                </Button>
                <Button p={12}  type='outline' className={cls.socialLinkButton}>
                    <Icon
                        src={meta}
                        width={23} height={23} 
                    />
                    {!isAuth && regStep !== 1
                        ? null
                        : isAuth? 'Войти через Meta' : 'Регистрация через Meta'}
                </Button>
                <Button p={12}  type='outline' className={cls.socialLinkButton}>
                        <Icon
                        src={vk}
                            width={23} height={23} 
                        />
                    {!isAuth && regStep !== 1
                        ? null
                        : isAuth? 'Войти через VK ID' : 'Регистрация через VK ID'}
                </Button>
                <Button p={12}  type='outline' className={cls.socialLinkButton}>
                        <Icon
                        src={yandex}
                            width={23} height={23} 
                        />
                    {!isAuth && regStep !== 1
                        ? null
                        : isAuth? 'Войти  через Яндекс ID' : 'Регистрация через Яндекс ID'}
                </Button>
            </div>
        </WrapperCard>
    )
}

export default AuthPartners;
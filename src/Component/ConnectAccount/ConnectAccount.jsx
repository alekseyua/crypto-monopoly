import { Label } from '../../shared/UI';
import cls from './styles/connect-account.module.css';

const ConnectAccount = ({ 
    accountInfo,
}) => {
    return (
        <div
            className={cls.containerConnectAccount}
        >
            <Label className={cls.titleConnectAccount} text={'Подключенные аккаунты'}/>
            {
                accountInfo !== undefined && Object.keys(accountInfo).length ?
                    <div className={cls.containerAccounts}>
                        {
                            accountInfo.account_partnaship?.filter(el=>el.status === 'active')?.map((account, index) => (
                                <div key={index} className={cls.bindAccount}>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.2397 9.31571C17.2397 8.72316 17.1865 8.15341 17.0878 7.60645H9.21756V10.8389H13.7148C13.5211 11.8834 12.9324 12.7684 12.0473 13.361V15.4577H14.748C16.3281 14.0029 17.2397 11.8606 17.2397 9.31571Z" fill="#4285F4" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.21746 17.4825C11.4737 17.4825 13.3653 16.7343 14.7479 15.458L12.0472 13.3613C11.299 13.8627 10.3418 14.159 9.21746 14.159C7.04099 14.159 5.19879 12.689 4.54167 10.7139H1.74988V12.8789C3.12488 15.61 5.95087 17.4825 9.21746 17.4825Z" fill="#34A853" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.54186 10.7135C4.37474 10.2122 4.27978 9.67659 4.27978 9.12583C4.27978 8.57506 4.37474 8.0395 4.54186 7.53811V5.37305H1.75007C1.18411 6.50116 0.861252 7.77741 0.861252 9.12583C0.861252 10.4742 1.18411 11.7505 1.75007 12.8786L4.54186 10.7135Z" fill="#FBBC05" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.21745 4.0931C10.4443 4.0931 11.5458 4.51472 12.4119 5.34276L14.8086 2.94599C13.3615 1.59757 11.4699 0.769531 9.21745 0.769531C5.95086 0.769531 3.12488 2.64212 1.74988 5.37315L4.54167 7.53821C5.19879 5.56306 7.04099 4.0931 9.21745 4.0931Z" fill="#EA4335" />
                                    </svg>
                                    {account.name}
                                </div>
                            ))
                        }
                        <div className={cls.containerWithBindTitleConnectAccount}>
                        <Label className={cls.titleConnectAccount} text={'Привяжите аккаунт у партнера'}/>
                        <Label className={cls.descConnectAccount} text={'Вы можете привязать аккаунты у наших партнеров чтобы упростить авторизацию в Land Of Monopoly.'}/>
                        </div>

                        {
                            accountInfo.account_partnaship.filter(el=>el.status !== 'active')?.map((account, index) => (
                                <div key={index} className={cls.disBindAccount}>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.2397 9.31571C17.2397 8.72316 17.1865 8.15341 17.0878 7.60645H9.21756V10.8389H13.7148C13.5211 11.8834 12.9324 12.7684 12.0473 13.361V15.4577H14.748C16.3281 14.0029 17.2397 11.8606 17.2397 9.31571Z" fill="#4285F4" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.21746 17.4825C11.4737 17.4825 13.3653 16.7343 14.7479 15.458L12.0472 13.3613C11.299 13.8627 10.3418 14.159 9.21746 14.159C7.04099 14.159 5.19879 12.689 4.54167 10.7139H1.74988V12.8789C3.12488 15.61 5.95087 17.4825 9.21746 17.4825Z" fill="#34A853" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.54186 10.7135C4.37474 10.2122 4.27978 9.67659 4.27978 9.12583C4.27978 8.57506 4.37474 8.0395 4.54186 7.53811V5.37305H1.75007C1.18411 6.50116 0.861252 7.77741 0.861252 9.12583C0.861252 10.4742 1.18411 11.7505 1.75007 12.8786L4.54186 10.7135Z" fill="#FBBC05" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.21745 4.0931C10.4443 4.0931 11.5458 4.51472 12.4119 5.34276L14.8086 2.94599C13.3615 1.59757 11.4699 0.769531 9.21745 0.769531C5.95086 0.769531 3.12488 2.64212 1.74988 5.37315L4.54167 7.53821C5.19879 5.56306 7.04099 4.0931 9.21745 4.0931Z" fill="#EA4335" />
                                    </svg>
                                    {account.name}
                                </div>
                            ))
                        }   
                    </div>
                    : <>Loading ...</>
            }
        </div>
    )
}

export default ConnectAccount
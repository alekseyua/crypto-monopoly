import { Button, Label } from '../../shared/UI';
import cls from './styles/user-panel.module.css';
import { BackArrow, IconChat } from '../../assets';
import Icon from '../../shared/UI/Icon/Icon';

const ProfilePanel = ({ dashboardProfile, handleNavigateTo}) => {
  return (
    <div className={cls.containerProfilePanel}>
      <div className={cls.containerProfilePanelLeft}>
          <Button
            onClick={()=>handleNavigateTo(-1)}
            className={cls.iconBack}
          iconRight={<Icon src={BackArrow}  width={20} height={20} />}
            />
          <Label 
            className={cls.profileName}
            text={dashboardProfile.name }
          />          
      </div>
      <div
        className={cls.containerControllerProfile}
      >
        <div
          className={cls.controllerLeftProfile}
        >
          {
            dashboardProfile.button[4].status !== 'active' && dashboardProfile.button.slice(0,2)?.map((el, index)=>{
              return (
                <Button
                  onClick={()=>handleNavigateTo(el.type)}
                  key={index}
                  className={cls.containerButton}
                  type={el.status === 'active' ? 'gradientInvert' :'filled'}
                  >
                  <div className={cls.innerContainerButtom}>
                    <Label type={'transparent'} className={cls.nameButtonChatBtn} text={el.name} />
                  </div>
                </Button>
              )
            })
          }
        </div>
        <div
        className={cls.controllerRightProfile}
        >
          <div className={cls.containerChatBtn}>
        {
          dashboardProfile.button.slice(2, 3)?.map((el, index) => {
            return (
              <Button
              onClick={() => handleNavigateTo(el.type)}
              key={index}
              className={cls.containerButton}
              type={el.status === 'active' ? 'gradientInvert' :'filled'}
              iconLeft={<Icon  src={IconChat}  width={20} height={20} />}
              >
                <div className={cls.innerContainerButtom}>
                  <Label type={'transparent'} className={cls.nameButtonChatBtn} text={el.name} />
                </div>
              </Button>
            )
          })
        }
            <Label type={'transparent'} className={cls.nameButtonChatBtn} text={'+0'} />
        </div>
        <div className={cls.containerSwitchBtn}>
          {
            dashboardProfile.button.slice(3, 5)?.map((el, index) => {
              return (
                <Button
                onClick={() => handleNavigateTo(el.type)}
                key={index}
                className={cls.containerButtonSwitch}
                  type={el.status === 'active' ? 'gradientInvert' :'filled'}
                >
                  <div className={cls.innerContainerButtom}>
                    <Label type={'transparent'} className={cls.nameButtonChatBtn} text={el.name} />
                  </div>
                </Button>
              )
            })
          }
          </div>
        </div>
        
      </div>

    </div>
  )
}

export default ProfilePanel
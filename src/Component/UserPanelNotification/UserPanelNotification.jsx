import { Button } from '../../shared/UI'
import { notification } from '../../assets'
import NotificationCard from '../../shared/UI/Notification/Notification'

import cls from './styles/user-panel-notification.module.scss'
import Icon from '../../shared/UI/Icon/Icon'

const UserPanelNotification = ({notice, handleActionNotification}) => {
  return (
    <div style={{position: 'relative'}}>

    <Button
    // заливка по последнему уведомлению
        type={
          notice.length
            ? notice[0]?.color.length>1 && notice[0].status === 'unread'
                                                        ? 'gradient' 
                                                        : 'filled' 
            : 'filled'} 
            gradientColors={notice[0]?.color
        }
        className={cls['header-menu-btn__notification-container']}
    >
        {/* <Notification style={{ '--stroke-color': `${notice.length? '#fff' : '#000'}` }} width={55} height={55}/>
         */}
      
      <Icon
        src={notification}
        style={{ '--stroke-color': `${notice.length ? '#fff' : '#000'}` }} width={20} height={20}
      />
    </Button>
        {
            !!notice.length && notice[0].status === 'unread' &&
            <NotificationCard notice={notice[0]} handleActionNotification={handleActionNotification}/> 
        }
    </div>
  )
}

export default UserPanelNotification
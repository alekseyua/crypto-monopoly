
import { Button } from '../Buttons/Button'
import { motion } from 'framer-motion';

import cls from './styles/notice-card.module.css'

const NotificationCard = ({ notice, handleActionNotification = () => { } }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div
                className={cls.notificationCardContainer}
            >
                <div className={cls.notificationLeftContainer}>
                    <Button className={cls.notificationIcon} variant='gradient' gradientColors={notice.color} />
                </div>
                <div className={cls.notificationRightContainer}>
                    <h3 className={cls.notificationTitle}>{notice.text.title}</h3>
                    <p className={cls.notificationDesc}>{notice.text.description}</p>
                    <div className={cls.notificationControllerContainer}>
                        {/* <Button
                            className={cls.notificationButton}
                            variant='gradient'
                            gradientColors={notice.color}
                            onClick={() => handleActionNotification(notice.redirectTo, notice.id)}
                        >
                            Показать
                        </Button> */}
                        <Button
                            className={cls.notificationButton}
                            style={{ '--fill-color': '#fff' }}
                            onClick={() => handleActionNotification('close', notice.id)}
                        >
                            Закрыть
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default NotificationCard
import { Button, Label, Offset } from '../../shared/UI';
import cls from './styles/activity-history.module.css';

const FormActivityHistory = ({
    
}) => {
    return (
        <div
            className={cls.containerActivityHistory}
        >
            <Label variant={'title'} text={'История активности'} type={'transparent'}/>

            <div className={cls.rowActivityHistory}>
                <span dangerouslySetInnerHTML={{
                    __html: '<p style="color: red">09.09.23 12:25</p>'}}
                />
                <span dangerouslySetInnerHTML={{
                    __html: '<b>Подозрительная активность.</b> Попытка входа c устройства Windows 10, США, г.Нью - Йорк. '}}
                />
                <Offset mb={15} />
                <Button className={cls.btnItemActivityHistory}>Подтвердить вход</Button>
            </div>
            <Button 
                className={cls.btnActivityHistory}
                type='outline' 
            >
                Развернуть
            </Button>
        </div >
    )
}

export default FormActivityHistory
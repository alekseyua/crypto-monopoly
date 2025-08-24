import { Link } from 'react-router-dom';
import { Button, Label } from '../../shared/UI';
import cls from './burger.module.scss';

interface IBurger {
  listMenu: any[],
  openBurger: boolean,
  handleBurger: () => void,
  isQG: boolean,  
  handleAddQG: () => void,
  handleActiveItemMenu: (id: string) => void,
}
const Burger:React.FC<IBurger> = ({
  listMenu,
  openBurger,
  handleBurger,
  isQG,
  handleAddQG,
  handleActiveItemMenu,
}:IBurger) => {
  return (
    <div className={cls.containerBurger}>
      <div className={cls.containerButtomBurger}>

      <div onClick={handleBurger} 
        className={openBurger? cls['burger__btn--active'] : cls['burger__btn']}
        // variant={openBurger? 'burger-active' : 'burger'}
        >
        <span></span>
      </div>
      {openBurger &&       
        <div className={cls.burgerInfo}>{'Меню'}</div>
      }
      {openBurger &&       
        <div className={`${cls.containerMenu} `}>
          {
            listMenu?.map( (m) => {
              return(
                <div key={m.id} className={`${cls.itemMenu} ${m.active && cls.active} ` }onClick={() => handleActiveItemMenu(m.id)}>
                  <Link to={m.link} > 
                    {m.title}
                  </Link>
                  </div>
              )
            })
          }
        </div>
}
      </div>
      
      {
        !openBurger &&
        <Label
          className={cls.labelPage}
        text={listMenu.filter(el => el.active)[0]?.title}
        />
      }
      {
        isQG &&
        <Button
        type='filled'
        variant='rounded'
        style={{width: 'nono'}}
        onClick={handleAddQG}
          >{'Создать свою комнату'}</Button>
      }
    </div>
  )
}

export default Burger;
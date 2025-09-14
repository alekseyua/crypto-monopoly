import { useStoreon } from 'storeon/react'
import withRouter from '../../HOC/withRouter'
import UserPanel from './UserPanel'
import { useEffect, useState } from 'react';
import { GET_USERS } from '../../store/users/users';
import { IDataQG, IPlayer } from '../../store/quick-game/quick-game.d';
import { StoreonDispatch } from 'storeon';
import { NavigateFunction } from 'react-router-dom';
import { IUser } from '../../store/users/user.d';

const quickGameMenu = [
  {
    id: "jackpot",
    name: "Куш игры",
    price: 0,
    link: "/",
  },
  {
    id: "balance",
    name: "Баланс",
    price: 0,
    link: "/profile#balance",
  },
];

const mainGameMenu = [
  {
    id: "capital",
    name: "Капитал",
    price: 0,
    link: "/",
  },
  {
    id: "thing",
    name: "Имущество",
    price: 0,
    link: "/",
  },
  {
    id: "balance",
    name: "Баланс",
    price: 0,
    link: "/profile#balance",
  },
];

interface StateStore {
  user: IUser;
  isQG: boolean;
  quickGame: IDataQG;
  dataPlayerQG: IPlayer;
}
interface Events {
  [GET_USERS]: IUser;
}

const UserPanelContainer = ({ navigate }: {navigate: NavigateFunction}) => {
    const { user, isQG, quickGame, dataPlayerQG, dispatch } = useStoreon<StateStore, Events>('user', 'isQG', 'quickGame', 'dataPlayerQG');
    const [isDropDownMenuOpen, setIsDropDownMenuOpen ] = useState(false);
    const [userInfo, setUserInfo ] = useState(mainGameMenu)

    const handleNavigateTo = (link: string) => {
        navigate(link)
    }

    
    useEffect(() => {
        if (quickGame?.id) {
        const dataUserPanel = dataPlayerQG.bill_data;
        !!dataUserPanel && setUserInfo(
          quickGameMenu.map((item) =>
            item.id === "balance"
              ? {
                  ...item,
                  price: dataUserPanel.balance,
                }
              : item.id === "jackpot"
              ? {
                  ...item,
                  price: dataUserPanel.jackpot,
                }
              : { ...item }
          )
        );
      } else {
        // напалняем меню инфой
        if (user?.username) {
          setUserInfo(
            mainGameMenu.map((item) =>
              item.id === "balance"
                ? {
                    ...item,
                    price: user.balance,
                  }
                : { ...item }
            )
          );
        }
      }
    }, [user, quickGame, dataPlayerQG]);

    useEffect(() => {
        // получаем юзеров
        !user?.username && user?.id && dispatch(GET_USERS, undefined as undefined);
    }, [user, dispatch]);

    const handleOpenDropDownMenu = () => {
        // Implement dropdown menu logic here
        setIsDropDownMenuOpen(state=>!state);
    }
console.log("UserPanelContainer render", { user, quickGame });
    return (
        <UserPanel
            user={user}
            profile={user}
            userInfo={userInfo}
            isQG={isQG}
            handleNavigateTo={handleNavigateTo}
            isDropDownMenuOpen={isDropDownMenuOpen}
            handleOpenDropDownMenu={handleOpenDropDownMenu}
        />
    )
}

export default withRouter(UserPanelContainer)
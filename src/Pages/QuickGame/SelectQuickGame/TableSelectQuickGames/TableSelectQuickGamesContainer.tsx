import { useStoreon } from 'storeon/react'
import { TableSelectQuickGames } from './TableSelectQuickGames';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SET_MODAL } from '../../../../store/modal/modal';
import FormInputCreateQGContainer from '../../../../models/FormInputCreateQuickGame/FormInputCreateQuickGameContainer';
import { DISCONNECT_LIST_QG, GET_LIST_QG, JOIN_QG } from '../../../../store/quick-game/quick-game';
import { IListQGs } from '../../../../store/quick-game/quick-game.d';
import { StoreonDispatch } from 'storeon';
import { IUser } from '../../../../store/users/user.d';

const TableSelectQuickGamesContainer = () => {
    const navigate = useNavigate();
    const {
      listQGs,
      user,
      dispatch,
    }: {
      listQGs: IListQGs[];
      user: IUser;
      dispatch: StoreonDispatch<any>;
    } = useStoreon("listQGs", "user");

    const handlerClickCreateGame = () => {
        // создание новой комнаты
        dispatch(SET_MODAL, {
            isOpen: true,
            type: 'create_game',
            title: 'Создать игру',
            content: <FormInputCreateQGContainer /> ,
            maxWidth: 700,
        })
    }
    
    const handleClickJoinGame = (id: number) => {
        // присоединение к игре        
        dispatch(JOIN_QG, { action: 'join_game', game_id: id })
    } 

    useEffect(()=>{
        // нужно ли переоткрывать ли соединение при смене страницы ???
        dispatch(GET_LIST_QG, { action: 'get_games', redirectTo })
        return () => dispatch(DISCONNECT_LIST_QG, { action: 'get_games', redirectTo })
    },[dispatch]);

	const redirectTo = (path: string) => navigate(path);

    return (
    <TableSelectQuickGames
        user={user}
        listGame={listQGs}
        handleClickJoinGame={handleClickJoinGame}
        handlerClickCreateGame={handlerClickCreateGame}
    />
  )
}

export default TableSelectQuickGamesContainer;
import { useStoreon } from 'storeon/react'
import { TableSelectQuickGames } from './TableSelectQuickGames';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SET_MODAL } from '../../../../store/modal/modal';
import FormInputCreateQGContainer from '../../../../models/FormInputCreateQuickGame/FormInputCreateQuickGameContainer';
import { DISCONNECT_LIST_QG, CONNECT_WS_QG, JOIN_QG } from '../../../../store/quick-game/quick-game';
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

	const redirectTo = useCallback((path: string) => navigate(path), [navigate]);

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

    useEffect(() => {
      // нужно ли переоткрывать ли соединение при смене страницы ???
      console.log('%cOPEN LIST GAMES', 'color: green')
      dispatch(CONNECT_WS_QG, { action: "get_games", redirectTo });
      return () =>
        dispatch(DISCONNECT_LIST_QG, { action: "get_games", redirectTo });
    }, [dispatch, redirectTo]);


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
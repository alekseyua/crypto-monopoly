import { useStoreon } from 'storeon/react'
import { TableSelectQuickGames } from './TableSelectQuickGames';
import { SET_MODAL } from '../../../../store/modal/modal';
import FormInputCreateQGContainer from '../../../../models/FormInputCreateQuickGame/FormInputCreateQuickGameContainer';
import { JOIN_QG } from '../../../../store/quick-game/quick-game';
import { IListQGs } from '../../../../store/quick-game/quick-game.type';
import { StoreonDispatch } from 'storeon';
import { IUser } from '../../../../store/users/user.d';

const TableSelectQuickGamesContainer = () => {
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
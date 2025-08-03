import { useStoreon } from 'storeon/react'
import { SelectQGs } from './SelectQuickGames'
import { useEffect } from 'react';
import { DISCONNECT_LIST_QG, GET_LIST_QG, JOIN_QG } from '../../store/quick-game/quick-game';
import { SET_MODAL } from '../../store/modal/modal';
import { useNavigate } from 'react-router-dom';
import FormInputCreateQGContainer from '../FormInputCreateQuickGame/FormInputCreateQuickGameContainer';

const SelectQGContainer = () => {
    const navigate = useNavigate();
    const { listQGs, profile,  dispatch } = useStoreon('listQGs', 'profile');

    const handlerClickCreateGame = () => {
        // создание новой комнаты
        dispatch(SET_MODAL, {
            isOpen: true,
            type: 'create_game',
            title: 'Создать игру',
            content: <FormInputCreateQGContainer /> ,
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
    <SelectQGs 
        profile={profile}
        listGame={listQGs}
        handleClickJoinGame={handleClickJoinGame}
        handlerClickCreateGame={handlerClickCreateGame}
    />
  )
}

export default SelectQGContainer
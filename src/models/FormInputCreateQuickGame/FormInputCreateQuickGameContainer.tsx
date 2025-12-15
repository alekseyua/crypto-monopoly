import React, { use, useEffect } from 'react'
import FormInputCreateQG from './FormInputCreateQuickGame'
import { useStoreon } from 'storeon/react';
import { SET_MODAL } from '../../store/modal/modal';
import { CREATE_NEW_QG, EStoreQG } from '../../store/quick-game/quick-game';
import { errorGameState } from '../../store/quick-game/error-game';

export interface ICreateGameData {
  name: string;
  bet_amount: number;
  turn_time: number;
  start_money: number;
  max_players: number;
  action: 'create_game';
}

interface State {
  [EStoreQG.MESSAGE_ERROR_CREATE_GAME]: errorGameState;
}

interface Event {
  [CREATE_NEW_QG]: ICreateGameData;
  [SET_MODAL]: { isOpen: boolean };
}
const FormInputCreateQGContainer:React.FC = () => {

  const { [EStoreQG.MESSAGE_ERROR_CREATE_GAME]: errorMessage, dispatch } = useStoreon<State, Event>(EStoreQG.MESSAGE_ERROR_CREATE_GAME);
  const [params, setParams] = React.useState<ICreateGameData>({
    name: '',
    bet_amount: 0,
    turn_time: 0,
    start_money: 0,
    max_players: 0,
    action: 'create_game'
  });
  const [paramsError, setParamsError] = React.useState({
    name: false,
    bet_amount: false,
    turn_time: false,
    start_money: false,
    max_players: false,
  });

  const handleChangeInput = (value: string | number, key:string) => {
    setParams( state =>({
      ...state,
      [key]: value
    }));
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.type === 'keydown') {
      e.preventDefault();
      if ((e as React.KeyboardEvent<HTMLButtonElement>).keyCode !== 32 && (e as React.KeyboardEvent<HTMLButtonElement>).keyCode !== 13) return
    }
    dispatch(CREATE_NEW_QG, {...params});
    // setTimeout(()=>{
    //   console.log('errorMessage', errorMessage);
    //   if(Object.values(errorMessage).length === 0){
    //     dispatch(SET_MODAL, { isOpen: false });
    //   };
    // },2000);
    // dispatch(SET_MODAL, { isOpen: false });
  }

  useEffect(()=>{
    setParamsError({
      name: !!params.name,
      bet_amount: !!params.bet_amount,
      turn_time: !!params.turn_time && (params.turn_time >= 60),
      start_money: !!params.start_money,
      max_players: !!params.max_players && (params.max_players >= 2 && params.max_players <= 10),
    })
  },[params])
  
  // useEffect(()=>{
  //   if (errorMessage.length > 0) {
  //     errorMessage.forEach((err: errorCreateGame) => {
  //       const {field, error} = err;
  //       setParamsError( state =>({
  //         ...state,
  //         [field]: false
  //       }));
  //       console.log(`%cОшибка при создании игры: ${err}`, 'color:red');
  //     })
  //   }
  // },[errorMessage]);

  return (
    <FormInputCreateQG
      errorMessage={errorMessage}
      handleChangeInput={handleChangeInput}
      handleSubmit={handleSubmit}
      paramsError={paramsError}
      values={params}
    />
  )
}

export default FormInputCreateQGContainer
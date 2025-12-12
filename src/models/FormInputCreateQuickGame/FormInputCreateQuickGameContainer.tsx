import React, { useEffect } from 'react'
import FormInputCreateQG from './FormInputCreateQuickGame'
import { useStoreon } from 'storeon/react';
import { SET_MODAL } from '../../store/modal/modal';
import { CREATE_NEW_QG } from '../../store/quick-game/quick-game';

export interface ICreateGameData {
  name: string;
  bet_amount: number;
  turn_time: number;
  start_money: number;
  max_players: number;
  action: 'create_game';
}
const FormInputCreateQGContainer:React.FC = () => {

  const { dispatch } = useStoreon();
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
    dispatch(CREATE_NEW_QG, {...params})
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
  
  return (
    <FormInputCreateQG 
      handleChangeInput={handleChangeInput}
      handleSubmit={handleSubmit}
      paramsError={paramsError}
      values={params}
    />
  )
}

export default FormInputCreateQGContainer
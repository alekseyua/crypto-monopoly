import React, { useEffect } from 'react'
import FormInputCreateQG from './FormInputCreateQuickGame'
import { useStoreon } from 'storeon/react';
import { SET_MODAL } from '../../store/modal/modal';
import { CREATE_NEW_QG } from '../../store/quick-game/quick-game';

const FormInputCreateQGContainer:React.FC = () => {

  const { dispatch } = useStoreon();
  const [params, setParams] = React.useState({
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

  const handleChangeInput = (value: string, key:string) => {
    setParams( state =>({
      ...state,
      [key]: value
    }));
  }

  const handleSubmit = () => {
    dispatch(CREATE_NEW_QG, params)
    dispatch(SET_MODAL, { isOpen: false });
  }

  useEffect(()=>{
    console.log(!!params.max_players && (params.max_players >= 2 && params.max_players <= 10))
    setParamsError({
      name: !!params.name,
      bet_amount: !!params.bet_amount,
      turn_time: !!params.turn_time && (params.turn_time >= 90),
      start_money: !!params.start_money,
      max_players: !!params.max_players && (params.max_players >= 2 && params.max_players <= 10),
    })
  },[params])
  
  return (
    <FormInputCreateQG 
    handleChangeInput={handleChangeInput}
    handleSubmit={handleSubmit}
    paramsError={paramsError}
    />
  )
}

export default FormInputCreateQGContainer
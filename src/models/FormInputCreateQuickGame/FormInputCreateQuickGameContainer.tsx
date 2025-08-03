import React from 'react'
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
  
  return (
    <FormInputCreateQG 
    handleChangeInput={handleChangeInput}
    handleSubmit={handleSubmit}
    />
  )
}

export default FormInputCreateQGContainer
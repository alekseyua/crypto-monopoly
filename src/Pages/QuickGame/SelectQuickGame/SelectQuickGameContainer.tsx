
import React, { useEffect } from 'react'
import { SelectQG } from './SelectQuickGame'
import { useStoreon } from 'storeon/react'
import { GET_REF_LINK } from '../../../store/auth/referal';
import { NAV_QG_FIELD_PAGE } from '../../../routers/config-nav';
import { useNavigate } from 'react-router-dom';

const SelectQGContainer = () => {
  const { dispatch, quickGame } = useStoreon('quickGame');
  const navigate = useNavigate();

  const handleGetRefCode = () => {
    dispatch(GET_REF_LINK)
  }

  useEffect(() => {
    // делаем проверку на существование игры переносим на поле
    quickGame.id && quickGame.cards.length && navigate(NAV_QG_FIELD_PAGE);
  }, [quickGame, navigate])

  return (
    <SelectQG
      handleGetRefCode={handleGetRefCode}
    />
  )
}

export default SelectQGContainer
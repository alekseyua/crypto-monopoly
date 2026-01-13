
import React, { useCallback, useEffect } from 'react'
import { SelectQG } from './SelectQuickGame'
import { useStoreon } from 'storeon/react'
import { GET_REF_LINK } from '../../../store/auth/referal';
import { useLocation, useNavigate } from 'react-router-dom';
import { SET_HEADER_NAME_IS_SHOW } from '../../../store/header/header';
import { HeaderNameEnum } from '../../../store/header/header.d';
import { CONNECT_WS_QG, DISCONNECT_LIST_QG } from '../../../store/quick-game/quick-game';
import { SET_MODAL } from '../../../store/modal/modal';
import { SET_LOCATION } from '../../../store/const';



const SelectQGContainer = () => {
  const { dispatch, quickGame } = useStoreon('quickGame');
  const navigate = useNavigate();
  const location = useLocation();

  const handleGetRefCode = () => {
    dispatch(GET_REF_LINK)
  }

  const redirectTo = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );

  useEffect(() => {
    dispatch(SET_LOCATION, location);
    dispatch(CONNECT_WS_QG, { action: "get_games", redirectTo });
    return () => {
      dispatch(DISCONNECT_LIST_QG, { action: "get_games", redirectTo });
      dispatch(SET_MODAL, { isOpen: false });
    }
  }, [dispatch, redirectTo]);

  useEffect(() => {
    dispatch(SET_HEADER_NAME_IS_SHOW, HeaderNameEnum.QUICK_GAME);
  }, [dispatch])

  return (
    <SelectQG
      handleGetRefCode={handleGetRefCode}
    />
  )
}

export default SelectQGContainer
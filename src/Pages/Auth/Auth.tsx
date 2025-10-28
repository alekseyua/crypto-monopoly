import { Outlet } from "react-router-dom";

import cls from "./auth.module.scss";
import { authImg } from "../../assets";
import { useEffect } from "react";
import { useStoreon } from "storeon/react";
import { SET_HEADER_NAME_IS_SHOW } from "../../store/header/header";
import { HeaderNameEnum } from "../../store/header/header.d";
import Section from "../../shared/UI/Section/Section";

interface StateStore {
  headerName: string;
}
interface EventStore {
  [SET_HEADER_NAME_IS_SHOW]: string;
}

const Auth = () => {
  const { dispatch } = useStoreon<StateStore, EventStore>();
  useEffect(() => {
    document.title = "Land Of Monopoly - Авторизация";
  }, []);
  useEffect(() => {
    dispatch(SET_HEADER_NAME_IS_SHOW, HeaderNameEnum.AUTH);
  }, [dispatch]);
  return (
    <main>
      <Section>
        <div className={cls.authContent}>
          <div className={cls.authInfo}>
            <p className={cls.authInfotext}>
              Выигрывайте по-крупному и наслаждайтесь щедрыми призами вместе с
              <b> Land Of Monopoly</b> на всех популярных платформах.
            </p>
            <img src={authImg} alt="Devices" />
          </div>
          <Outlet />
        </div>
      </Section>
    </main>
  );
};
export default Auth;

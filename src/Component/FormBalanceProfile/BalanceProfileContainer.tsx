import { useEffect } from "react";
import BalanceProfile from "./BalanceProfile";
import { useStoreon } from "storeon/react";
import { IUser } from "../../store/users/user.d";
import { GET_USERS } from "../../store/users/users";
import { StoreonDispatch } from "storeon";
import { SET_MODAL } from "../../store/modal/modal";
import FormTopUpWalletContainer from "../../models/FormTopUpWallet/FormTopUpWalletContainer";


const BalanceProfileContainer = () => {
    const {
      user,
      dispatch,
    }: {
      user: IUser;
      dispatch: StoreonDispatch<any>;
    } = useStoreon("user");

    useEffect(() => {
      dispatch(GET_USERS);
    }, [dispatch]);

    const handleBalance = (action: 'top up' | 'withdraw') => {
        if(action === 'top up') {
            dispatch(SET_MODAL, {
              isOpen: true,
              type: "top up wallet",
              title: "Пополнение баланса",
              content: <FormTopUpWalletContainer />,
              maxWidth: 500,
            });
        }else if(action === 'withdraw') {
            // dispatch(WITHDRAW_WALLET, value)
        }
        console.log("value in BalanceProfileContainer", action);
    };

    console.log('user in BalanceProfileContainer', user)
  return (
    <BalanceProfile
      balance={user?.balance || 0}
      handleBalance={handleBalance}
    />
  );
};

export default  BalanceProfileContainer;
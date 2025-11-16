import React, { FC } from "react";
import ConnectAccount from "../../Component/ConnectAccount/ConnectAccount";
import InvatingPlayers from "../../Component/InvatingPlayers/InvatingPlayers";
import FormOwnData from "../../Component/FormOwnData/FormOwnData";
import styles from "./styles/main-field-account-balance.module.scss";
import FormChangePassword from "../../Component/FormChangePassword/FormChangePassword";
import FormSecuretyAccaunt from "../../Component/FormSecuretyAccaunt/FormSecuretyAccaunt";
import FormActivityHistory from "../../Component/FormActivityHistory/FormActivityHistory";
import FormAdditinalAccountDetails from "../../Component/FormAdditinalAccountDetails/FormAdditinalAccountDetails";
import FormHistoryTransaction from "../../Component/FormHistoryTransaction/FormHistoryTransaction";
import BalanceProfileContainer from "../../Component/FormBalanceProfile/BalanceProfileContainer";
import { IUser } from "../../store/users/user";
import BlockWrapper from "../../shared/UI/Block/BlockWrapper";


interface DashboardButton {
  status: "active" | "inactive";
}

interface DashboardProfile {
  button: DashboardButton[];
}

interface ProfileProps {
  user: IUser;
  showPassword: boolean;
  dashboardProfile: DashboardProfile | null;
  isInputNumber: boolean;
  statusCopyRefLink: boolean;
  openSubInvitePlayers: boolean;

  handleCopyRefLink: (refLink: string) => void;
  handleChangeAvatar: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleShowPassword: () => void;
  handleAddPhoneOwnInfo: (phone: string) => void;

  handleOpenSubInvitePlayers: () => void;
  controllerFilterInvitePlayers: any;
  handleChangeFilterInvitePlayers: (value: any) => void;
  controllerShowFilterInvitePlayers: any;
  handleOpenFilterShowInvitePlayers: () => void;
  setPhoneNumber: (v: string) => void;
  error:{}
}

const Profile: FC<ProfileProps> = ({
  user,
  error,
  showPassword,
  isInputNumber,
  setPhoneNumber,
  dashboardProfile,
  statusCopyRefLink,
  handleCopyRefLink,
  handleChangeAvatar,
  handleShowPassword,
  openSubInvitePlayers,
  handleAddPhoneOwnInfo,
  handleOpenSubInvitePlayers,
  controllerFilterInvitePlayers,
  handleChangeFilterInvitePlayers,
  controllerShowFilterInvitePlayers,
  handleOpenFilterShowInvitePlayers,
}) => {
  const isProfileActive = dashboardProfile?.button?.[3]?.status === "active";
  const isAccountInfoActive =
    dashboardProfile?.button?.[0]?.status === "active";
  const isSecurityActive = dashboardProfile?.button?.[1]?.status === "active";

  return (
    <BlockWrapper>

    <div className={styles["profile__container"]}>
      <div
        className={styles["profile__field-container"]}
        style={{
          gridTemplateColumns:
            isProfileActive && isSecurityActive ? "1fr 2fr 1fr" : "1fr 1fr 1fr",
        }}
      >
        {!dashboardProfile?.button?.length ? (
          <div>Loading...</div>
        ) : isProfileActive ? (
          isAccountInfoActive ? (
            <>
              <FormOwnData
                infoUser={user}
                error={error}
                setPhoneNumber={setPhoneNumber}
                isInputNumber={isInputNumber}
                handleChangeAvatar={handleChangeAvatar}
                handleAddPhoneOwnInfo={handleAddPhoneOwnInfo}
              />
              <ConnectAccount accountInfo={{}} />
              <InvatingPlayers
                invitedPlayers={{}}
                statusCopyRefLink={statusCopyRefLink}
                handleCopyRefLink={handleCopyRefLink}
                openSubInvitePlayers={openSubInvitePlayers}
                handleOpenSubInvitePlayers={handleOpenSubInvitePlayers}
                controllerFilterInvitePlayers={controllerFilterInvitePlayers}
                handleChangeFilterInvitePlayers={
                  handleChangeFilterInvitePlayers
                }
                controllerShowFilterInvitePlayers={
                  controllerShowFilterInvitePlayers
                }
                handleOpenFilterShowInvitePlayers={
                  handleOpenFilterShowInvitePlayers
                }
              />
            </>
          ) : (
            <>
              <FormChangePassword
                showPassword={showPassword}
                handleShowPassword={handleShowPassword}
              />
              <FormSecuretyAccaunt />
              <FormActivityHistory />
            </>
          )
        ) : (
          <>
            <BalanceProfileContainer />
            <FormAdditinalAccountDetails />
            <FormHistoryTransaction />
          </>
        )}
      </div>
    </div>
    </BlockWrapper>
  );
};

export default Profile;

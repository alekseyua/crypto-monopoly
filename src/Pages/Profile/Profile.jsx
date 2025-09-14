import ConnectAccount from "../../Component/ConnectAccount/ConnectAccount";
import InvatingPlayers from "../../Component/InvatingPlayers/InvatingPlayers";
import FormOwnData from "../../Component/FormOwnData/FormOwnData";
import HeaderProfileContainer from "../../models/HeaderProfile/HeaderProfileContainer"
import styles from './styles/main-field-account-balance.module.scss';
import FormChangePassword from "../../Component/FormChangePassword/FormChangePassword";
import FormSecuretyAccaunt from "../../Component/FormSecuretyAccaunt/FormSecuretyAccaunt";
import FormActivityHistory from "../../Component/FormActivityHistory/FormActivityHistory";
import FormAdditinalAccountDetails from "../../Component/FormAdditinalAccountDetails/FormAdditinalAccountDetails";
import FormHistoryTransaction from "../../Component/FormHistoryTransaction/FormHistoryTransaction";
import BalanceProfileContainer from "../../Component/FormBalanceProfile/BalanceProfileContainer";

const Profile = ({
  profile,
  showPassword,
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
  return (
    <div
      className={styles['profile__container']}
    >
      <div
        className={styles['profile__field-container']}
        style={{
          gridTemplateColumns: 
            dashboardProfile?.button?.length && dashboardProfile?.button[3].status === 'active' 
              && dashboardProfile.button[1].status === 'active' // аккаутн и безопастность
                ? `1fr 2fr 1fr` 
                : `1fr 1fr 1fr`
        }}
      >

        {
          dashboardProfile?.button?.length
            ? dashboardProfile.button[3].status === 'active'
              ? (dashboardProfile.button[0].status === 'active'
                ? <>
                  <FormOwnData
                    infoUser={profile?.user}
                    handleChangeAvatar={handleChangeAvatar}
                    handleAddPhoneOwnInfo={handleAddPhoneOwnInfo}
                  />
                  <ConnectAccount
                    accountInfo={profile?.account_info}

                  />
                  <InvatingPlayers
                    invitedPlayers={profile?.invited_players}
                    statusCopyRefLink={statusCopyRefLink}
                    handleCopyRefLink={handleCopyRefLink}
                    openSubInvitePlayers={openSubInvitePlayers}
                    handleOpenSubInvitePlayers={handleOpenSubInvitePlayers}
                    controllerFilterInvitePlayers={controllerFilterInvitePlayers}
                    handleChangeFilterInvitePlayers={handleChangeFilterInvitePlayers}
                    controllerShowFilterInvitePlayers={controllerShowFilterInvitePlayers}
                    handleOpenFilterShowInvitePlayers={handleOpenFilterShowInvitePlayers}
                  />
                </>
                : <>
                  <FormChangePassword
                    showPassword={showPassword}
                    handleShowPassword={handleShowPassword}
                  />
                  <FormSecuretyAccaunt

                  />
                  <FormActivityHistory

                  />
                </>
              )
              :
              <>
                <BalanceProfileContainer />
                <FormAdditinalAccountDetails />
                <FormHistoryTransaction />
              </>
            : <div>Loading...</div>  // Add loading component here when dashboardProfile is empty
        }



      </div>
    </div>
  )
}

export default Profile
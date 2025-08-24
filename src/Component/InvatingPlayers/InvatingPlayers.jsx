import { DropdownArrow, IconDateFilter } from '../../assets';
import { Button, Label } from '../../shared/UI';
import Icon from '../../shared/UI/Icon/Icon';
import cls from './styles/invite-player.module.css';

const InvatingPlayers = ({
    invitedPlayers,
    handleCopyRefLink,
    statusCopyRefLink,
    openSubInvitePlayers,
    handleOpenSubInvitePlayers,
    controllerFilterInvitePlayers,
    handleChangeFilterInvitePlayers,
    controllerShowFilterInvitePlayers,
    handleOpenFilterShowInvitePlayers,
}) => {
    return (
        <div
            className={cls.containerInvitedPlayers}
        >
            {
                invitedPlayers !== undefined && Object.keys(invitedPlayers).length
                    ? <>
                        <div className={`${                            
                            controllerShowFilterInvitePlayers[1].status
                                ? cls.containerOpenFiltersItemsInvitingPlayers
                                : invitedPlayers.players.length > 5 
                                    ? cls.containerItemsInvitingPlayers 
                                    : cls.containerMinItemsInvitingPlayers}`}>

                            {!!invitedPlayers.players.length && <Label className={cls.titleInvitedPlayers} text={'Приглашенные игроки'} />}
                            {invitedPlayers.players.length > 5 &&
                                <div className={cls.containerInfoCerrerntEarning}>
                                    <Label className={cls.infoCurrentEarning} text={'Получено: 250 $'} />
                                    <Button onClick={handleOpenFilterShowInvitePlayers} className={cls.controllInfoCurrentEarning}>{controllerShowFilterInvitePlayers.filter(el=>el.status)[0].title}</Button>
                                </div>
                            }
                            { !!controllerShowFilterInvitePlayers[1].status  
                                && <div className={cls.containerFilterList}>
                                        <Label 
                                            className={`${cls.filterList} ${controllerFilterInvitePlayers[0].status && cls.active}`} 
                                            text={controllerFilterInvitePlayers[0].title} 
                                            iconRight={<Icon  src={IconDateFilter}  />}
                                            onClick={handleChangeFilterInvitePlayers}
                                        />
                                        <Label 
                                            className={`${cls.filterList} ${controllerFilterInvitePlayers[1].status && cls.active}`} 
                                            text = { controllerFilterInvitePlayers[1].title } 
                                            onClick={handleChangeFilterInvitePlayers} 
                                        />
                                    </div>}

                            <div className={`${
                                invitedPlayers.players.length > 5 
                                    ? cls.innerContainerListInvitingPlayers 
                                    : cls.innerContainerMinListInvitingPlayers
                                }`}>
                                {
                                    invitedPlayers.players?.map((player, index) => (
                                        <div
                                            key={index} 
                                            className={openSubInvitePlayers && !!player?.sub_invite_players?.length && cls.containerPlayerCard}
                                        >
                                            <div className={cls.playerCard}>
                                                <div className={cls.playersInfo}>
                                                    <div className={cls.playersInfoWrap}>
                                                        <img src={player.avatar} alt={'avatar'} className={cls.playerAvatar} />
                                                        <div className={cls.playerName}>{player.name}</div>
                                                    </div>
                                                    <div className={cls.playerReg}>{player.data_registration}</div>
                                                </div>
                                                {
                                                    player.earning &&
                                                    <div className={`${cls.playerEarning} ${openSubInvitePlayers && cls.active}`} onClick={handleOpenSubInvitePlayers}>
                                                        <span>
                                                            {player.earning}
                                                            {!!player?.sub_invite_players?.length 
                                                            && <Icon
                                                                src={DropdownArrow}
                                                                width={14} height={14} 
                                                            />
                                                            // <DropdownArrow width={14} height={14} />
                                                            }
                                                        </span>
                                                    </div>
                                                }
                                            </div>
                                            {
                                                openSubInvitePlayers && !!player?.sub_invite_players?.length 
                                                && <>
                                                    <Label type={'transparent'} center text={`Игроки приглашенные ${player.name}`} />
                                                    <div className={cls.containerSubPlayerCard}>
                                                        {
                                                            player.sub_invite_players.slice(0,3)?.map((item,index)=>{
                                                                return (
                                                                    <div key={index} className={cls.playerSubCard}>
                                                                        <div className={cls.playersInfo}>
                                                                            <div className={cls.playersInfoWrap}>
                                                                                <img src={player.avatar} alt={'avatar'} className={cls.playerAvatar} />
                                                                                <div className={cls.playerName}>{item.name}</div>
                                                                            </div>
                                                                            <div className={cls.playerReg}>{item.data_registration}</div>
                                                                        </div>
                                                                        <div className={cls.playerEarning}>{item.earning}</div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        {!controllerShowFilterInvitePlayers[1].status  
                        &&<>
                            <Label className={cls.titleInvitedPlayers} text={'Реферальная программа'} />

                            <div>
                                <span dangerouslySetInnerHTML={{ __html: invitedPlayers.info.desc }} />
                            </div>
                        </>
                        }
                        <Button
                            className={statusCopyRefLink ? cls.activeBtnRefLink : cls.waitBtnRefLink}
                            onClick={() => handleCopyRefLink('ref_link')}>Скопировать реферальную ссылку</Button>
                    </>
                    : null
            }
        </div >
    )
}

export default InvatingPlayers
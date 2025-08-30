import { logo, RightArrowIcon } from '../../../../assets';
import { Button, Offset } from '../../../../shared/UI';
import Icon from '../../../../shared/UI/Icon/Icon';
import Title from '../../../../shared/UI/Title/Title';
import { IPlayer } from '../../../../store/quick-game/quick-game.d';
import { GameInfoBoardCorners } from '../../UI/GameInfoBoardCorners/GameInfoBoardCorners';
import GameInfoBoardFooterContainer from '../GameInfoBoardFooter/GameInfoBoardFooterContainer';
import styles from './styles/gib.module.scss';
import { InfoBoardLabel } from './UI/Label/info-board-label';

interface IGameInfoBoardProps {
	playerCurrentMove?: IPlayer;
    labelColors?: string[];
    labelTextColors?: string[];
    wait?: boolean;
    loading?: boolean;
    buy_or_auction_card?: boolean;
		moveTo?: any;
}
export const GameInfoBoard:React.FC<IGameInfoBoardProps> = ({
	labelColors = ['transparent', '#65B99E'],
	labelTextColors = ['#000000', '#ffffff'],
	wait,
	loading = false,
	buy_or_auction_card,
	moveTo,
	playerCurrentMove,
}:IGameInfoBoardProps) => {
	if (loading) {
		return (
			<div className={styles['gib']}>
				<div style={{width: '100%', textAlign: 'center'}}>loading ... </div>
			</div>
		);
	}
	return (
		<div className={styles['gib__container']}>
			{	wait 
				? 	
					<>
					<Icon
					src={logo}
					width='100%'
					height='100%'
					className={styles['gib__background-logo']}
				/>
						<Offset mt={30} />
						<Title
							className={styles['gib__title']}
							title={'Ожидайте свой ход'}
							tag='h3'
						/>
						
					</>
				:	<>
						<div className={styles['gib-bg']}>
						<div>
							<p className={styles['gib__field-number']}>Поле № 25356</p>
							<Title
								className={styles['gib__title']}
								title={'Заплатите налог в мировую казну'}
								tag='h3'
							/>
							<div className={styles['gib__btns-container']}>
								<Button onClick={()=>{}}>Заплатить 5 $</Button>
								<Button onClick={() => { }} type='outline'>Автоналог (30 мин)</Button>
							</div>
						</div>
						<div style={{ background: '#E9ECFF' }} className={styles['gib__cards-info-container']}>
							<div className={styles['gib__cards-info-container-wrap']}>
								<div className={styles['gib__info-card-labels']}>
									<InfoBoardLabel labelColor={labelColors[0]}>
										<p
											style={{ color: labelTextColors[0] }}
											className={styles['gib__info-card-label-city-name']}>
											Санкт-Петербург
										</p>
									</InfoBoardLabel>
									<InfoBoardLabel
										labelColor={labelColors[1]}
										borderColor='transparent'>
										<p
											style={{ color: labelTextColors[1] }}
											className={styles['gib__info-card-label-contry-name']}>
											Санкт-Петербург
										</p>
									</InfoBoardLabel>
								</div>
								<div className={styles['gib__info-card-info-container']}>
									<div className={styles['gib__info-card-info-title']}>
										<p>Характеристики карты</p>
										<p>Стоимость недвижимости</p>
									</div>
									<div className={styles['gib__info-card-info-desc-container']}>
										<InfoBoardLabel>
											<div className={styles['gib__info-card-info-desc-label']}>
												<p>Налог</p>
												<p>5 $</p>
											</div>
										</InfoBoardLabel>
										<InfoBoardLabel>
											<div className={styles['gib__info-card-info-desc-label']}>
												<p>Стоимость дома</p>
												<p>5 $</p>
											</div>
										</InfoBoardLabel>
										{/* <InfoBoardLabel>
											<div className={styles['gib__info-card-info-desc-label']}>
												<p>С коллекцией</p>
												<p>5 $</p>
											</div>
										</InfoBoardLabel> */}
										<InfoBoardLabel>
											<div className={styles['gib__info-card-info-desc-label']}>
												<p>Стоимость отеля</p>
												<p>5 $</p>
											</div>
										</InfoBoardLabel>
										<InfoBoardLabel>
											<div className={styles['gib__info-card-info-desc-label']}>
												<p>С 1 домом</p>
												<p>5 $</p>
											</div>
										</InfoBoardLabel>
									</div>
								</div>
							</div>
							<GameInfoBoardFooterContainer />

						</div>
						</div>
					</>
			}
		</div>
	);
};

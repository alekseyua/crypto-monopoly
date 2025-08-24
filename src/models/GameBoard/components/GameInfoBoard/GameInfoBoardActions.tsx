import {logo } from '../../../../assets';
import { Button, Offset } from '../../../../shared/UI';
import Icon from '../../../../shared/UI/Icon/Icon';
import styles from './styles/gib.module.scss';
import React from 'react';
import ButtonBack from '../../../../shared/UI/Buttons/ButtonBack/ButtonBack';
import Title from '../../../../shared/UI/Title/Title';
import GameInfoBoardFooter from '../GameInfoBoardFooter/GameInfoBoardFooter';
import GameInfoBoardFooterContainer from '../GameInfoBoardFooter/GameInfoBoardFooterContainer';

interface IGameInfoBoardActionsProps {
	actions: { [key: string]: boolean }
	game_id: number;
	card_id: number;
	handleCard: (params: any) => void;
}

export const GameInfoBoardActions: React.FC<IGameInfoBoardActionsProps> = ({
	game_id,
	card_id,
	handleCard,
	actions,
}: IGameInfoBoardActionsProps) => {


	return (
		<div className={styles['gib__container']}>
			<Icon
				src={logo}
				width='100%'
				height='100%'
				className={styles['gib__background-logo']}
			/>
			<div className={styles['gib-bg']}>
				{/* header */}
				<div className={styles['gib__header-container']}>
					<ButtonBack 
						title='Назад'
						onClick={() =>  handleCard({
							action: 'clean_chose_actions',
						})}	
					/>

					<Title
						className={styles['gib__title']}
						title={'Выберите действие'}
						tag='h3'
					/>
					<Offset mb={10} />

				</div>
				{/* body */}
				<div style={{ background: 'transporent', padding: 0 }} className={styles['gib__body-container']}>
					<Offset mb={10} />

							<div className={styles['gib__btns-container--btn-two']}>
								<Button
									className={styles['gib__btns--btn-action']}
									disabled={!actions.sell}
									// type={'empty'}
									onClick={() => handleCard({
										action: 'sell',
										card_id
									})}
								>
									Продать
								</Button>

								<Button
									className={styles['gib__btns--btn-action']}
									disabled={!actions.exchange}
									onClick={() => handleCard({
										action: 'exchange',
										card_id
									})}>
									Обменять
								</Button>
							</div>
							<Offset mb={10} />

							<div className={styles['gib__btns-container--btn-two']}>
								<Button
									className={styles['gib__btns--btn-action']}
									disabled={!actions.build}
									onClick={() => handleCard({
										action: 'build',
										card_id
									})}>
									Построить
								</Button>
								<Button
									className={styles['gib__btns--btn-action']}
									disabled={!actions.pawn}
									onClick={() => handleCard({
										action: 'pawn',
										card_id
									})} >
									Заложить
								</Button>
							</div>
							<Offset mb={10} />

							<div className={styles['gib__btns-container--btn-two']}>
								<Button
									className={styles['gib__btns--btn-action']}
									disabled={!actions.redeem}
									onClick={() => handleCard({
										action: 'redeem',
										card_id
									})}>
									Выкупить
								</Button>
								<Button
									className={styles['gib__btns--btn-action']}
									disabled={!actions.auction}
									onClick={() => handleCard({
										action: 'start_auction',
										card_id
									})} >
									Аукцион
								</Button>
							</div>
				</div>
				{/* footer */}
				<GameInfoBoardFooterContainer />
				
			</div>

		</div>
	);
};

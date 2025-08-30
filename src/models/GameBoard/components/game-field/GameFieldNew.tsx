import styles from './styles/card-on-filed.module.scss';

import fieldBg from '../../assets/images/field1-bg.png';
import { icons, LeftSoleIcon, RightSoleIcon } from '../../../../assets';
import { motion } from 'framer-motion';
import Icon from '../../../../shared/UI/Icon/Icon';
import { CSSProperties, useEffect } from 'react';
import classNames from 'classnames';
import { IPlayer } from '../../../../store/quick-game/quick-game.d';
import PlayerSticker from '../PlayerSticker/PlayerSticker';
import React from 'react';

interface IGameFieldNew {
	direction: 'left' | 'right' | 'top' | 'bottom',
	className?: string,
	headerBgc?: string,
	image_card?: string,
	blurBg?: string,
	bgBar?: string,
	type: string,
	onField?: boolean,
	name: string;
	players?: IPlayer[];
	playerCurrentMove: IPlayer;
	cardCost: string;
	owner: any//ownerCard | {};
	id: number;
	isGrayBlur: boolean;
	activeCardForSelect: boolean;
	handleCard: (id: number) => void;

}

export const GameFieldNew: React.FC<IGameFieldNew> = React.memo(({
	id,
	direction,
	cardCost,
	className,
	headerBgc = '#65b99e',
	blurBg = '#f8f9ff40',
	type,
	bgBar = '',
	image_card,
	onField = false,
	name = 'name',
	players,
	owner = {},
	isGrayBlur = false,
	handleCard,
	playerCurrentMove,
	activeCardForSelect,
}: IGameFieldNew) => {
	let styleBayCard = {};
	// console.log(players?.length, {players})
	const isOwnerCard = !!owner && Object.keys(owner).length && Object.keys(owner.player).length;
	if (isOwnerCard) {
		styleBayCard = { ...styleBayCard, background: `linear-gradient(to ${direction}, ${owner.player.color} 0%, rgba(255, 255, 255, 0) 100%)` } //
	}
	const initStyleOnFieldColor: CSSProperties & Record<string, string> = {
		'--onField-gradient-color1': playerCurrentMove.color,
		'--onField-gradient-color2': playerCurrentMove.color
	}

	const initStyleColor: CSSProperties & Record<string, string> = {
		'--blur-bg': blurBg,
		'--text-header-card-bg': headerBgc,
		'--bgc-bar': bgBar,
		// ...styleBayCard,
	}

	useEffect(() => {
			console.log('%cRENDER GameFieldNew QIUICK GAME container', 'color: red')
		}, []);

	return (
		<div
			onClick={() => !isGrayBlur && type !== 'chance' && type !== 'community' && handleCard(id)}
			className={classNames({
				[styles['card-field__container']]: true,
				[styles['card-field__container--' + direction]]: direction,
				[styles[`${className}`]]: className,
				[styles[type]]: type,
				// chance | city | community | cruise | express | airline
			})}
			style={{
				backgroundColor: type === 'chance' ? '#E7EFFD' : '',
				filter: isGrayBlur ? 'blur(3px) grayscale(100%)' : '',
			}}
		>
			<div
				className={styles['card-field__container-wrap']}
				style={{
					borderRadius: activeCardForSelect ? 7 : 0,
				}}
			>
				<div
					className={classNames({
						[styles['card-field__container-body']]: true,
						[styles[`card-field__container-body--${direction}`]]: !!direction,
					})}

				>
					{/* photo */}
					<div
						className={classNames({
							[styles['card-field__image']]: true,
							[styles[`card-field__image--${direction}`]]: !!direction,
							[styles[`card-field__image--${type}`]]: type,
						})}
						style={{
							backgroundImage: `url(${image_card ?? fieldBg}) `, //center/cover no-repeat
						}}
					></div>
					{/* body card */}
					<div
						className={classNames({
							[styles['card-field__text-container']]: true,
							[styles[`card-field__text-container--${direction}`]]: !!direction,
						})}
					>
						<div style={{ ...initStyleColor, ...styleBayCard }} className={
							classNames({
								[styles['card-field__owner-card']]: true,
								[styles[`card-field__owner-card--${direction}`]]: !!direction,
							})
						}></div>



						<>
							<div className={classNames({
								[styles['card-field__text-title']]: true,
								[styles[`card-field__text-title--${direction}`]]: !!direction,
								[styles[`card-field__text-title--build`]]: !!owner?.houses || !!owner?.hotels,
							})}
							>
								{!(type === 'chance' || type === 'community') && name}
								{
									!!owner?.hotels ?
										<div className={styles[`card-field__text-title--build-hotel-${direction}`]}>
											<Icon src={icons.hotelCard} width='25' height='12' />

										</div>
										: !!owner?.houses ?
											<div className={styles[`card-field__text-title--build-h-${direction}`]}>
												{new Array(owner?.houses).fill('').map((h: any, i: number) => {
													return <Icon key={i} src={icons.home} width="7" height="7" />;
												})}
											</div>
											: null

								}
							</div>
							{
								players &&
								players?.length > 0 &&
								<PlayerSticker
									className={styles['card-name__sticker']}
									direction={direction}
									players={players}
								/>
							}
						</>
					</div>
				</div>
				{/* header (price) */}
				<div style={initStyleColor}
					className={classNames({
						[styles['card-field__text-header-card']]: true,
						[styles[`card-field__text-header-card--${direction}`]]: !!direction,

					})}>
					{type === 'chance' ? (
						<div>Шанс</div>
					) : type === 'community' ? (
						<div>Казна</div>
					) : (
						<div>{cardCost} <Icon
							className={styles['card-field__qg-currency']}
							width='10px'
							height='10px'
							src={icons.qgCurrencySvgWhite}
						/>
						</div>
					)}
				</div>
				{/* gradiant */}
				{type !== 'chance' && type !== 'community' && (
					// gradient над карточкой
					<div
						className={classNames({
							[styles['card-field__white-gradiant']]: true,
							[styles[`card-field__white-gradiant--${direction}`]]: !!direction,
							// [styles[`card-field__image--${type}`]]: type,
						})}
					></div>
				)}


			</div>


			{onField && (
				<div className={classNames({
					[styles['onfield__container']]: true,
					[styles[`onfield__container--${direction}`]]: !!direction,

				})}
					style={initStyleOnFieldColor}
				>
					<div className={
						classNames({
							[styles['onfield__soles-icons']]: true,
							[styles[`onfield__soles-icons--${direction}`]]: !!direction,

						})
					}
					>
						<motion.div
							style={{ display: 'inline' }}
							initial={{ opacity: 0 }}
							animate={{ opacity: [0, 1] }}
							transition={{
								repeat: Infinity,
								repeatType: 'reverse',
								duration: 1,
							}}>
							<Icon
								src={LeftSoleIcon}
								width={'7px'}
								height={'17px'}
							/>
						</motion.div>
						<motion.div
							style={{ display: 'inline' }}
							initial={{ opacity: 0 }}
							animate={{ opacity: [0, 1] }}
							transition={{
								repeat: Infinity,
								repeatType: 'reverse',
								duration: 1,
								delay: 1,
							}}>
							<Icon
								src={RightSoleIcon}
								width={'7px'}
								height={'17px'}
							/>
						</motion.div>
					</div>
				</div>
			)}
		</div>
	);
});

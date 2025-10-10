import cls from './styles/game-filed.module.scss';
import card from './styles/card-filed.module.scss';

import fieldBg from '../../assets/images/field1-bg.png';
import { ChanceIcon, ChestIcon, LeftSoleIcon, RightSoleIcon } from '../../../../assets';
import { motion } from 'framer-motion';
import Icon from '../../../../shared/UI/Icon/Icon';
import { CSSProperties, useEffect } from 'react';
import classNames from 'classnames';
import { IPlayer, IOwnerCard } from '../../../../store/quick-game/quick-game.d';
import PlayerSticker from '../PlayerSticker/PlayerSticker';

interface IGameField {
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
	cardCost: string;
	owner: any//IOwnerCard | {};
	handleCard: (id: number)=> void;
	id: number;
	isGrayBlur: boolean;
}

export const GameField: React.FC<IGameField> = ({
	direction,
	id,
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
	handleCard,
	isGrayBlur = false,
}: IGameField) => {
	let styleBayCard = {};
	useEffect(() => {
	}, [])
	if (!!owner && Object.keys(owner).length && Object.keys(owner.player).length) {
		styleBayCard = { ...styleBayCard, background: owner.player.color } //
	}
	const initStyleColor: CSSProperties & Record<string, string> = {
		'--blur-bg': blurBg,
		'--text-header-card-bg': headerBgc,
		'--bgc-bar': bgBar,
	}
	return (
		<div
			onClick={()=>handleCard(id)}
			style={{
				backgroundImage: type === 'chance'
					? ''
					:  `url(${
						image_card ??
						fieldBg}`,// center/cover no-repeat`//
				backgroundColor: '#E7EFFD',
				filter: isGrayBlur? 'blur(3px) grayscale(100%)' : ''
			}}
			className={classNames({
				[cls['field']]: true,
				[cls[direction]]: direction,
				[cls[type]]: type,
				[card[`${className}`]]: className,
			})}
		>
			{/* {type === 'chest' &&
				<Icon src={ChestIcon} className={cls['backgroundIcon']} />
			} */}
			<div 
				className={classNames({
					[cls['field__text-container']]: true,
					[cls[`field__text-container--${direction}`]]: !!direction,
				})
				}
			>
				{/* {onField && (
					<div className={cls.onFieldIndicatorCont}>
						<div className={cls.onFieldIndicator}></div>
					</div>
				)} */}
				{type === 'chance' || type === 'chest' 
				? (<Icon
						src={
							type === 'chance'
								? ChanceIcon
								: type === 'chest'
									? ChestIcon
									: ''
						}
						width={'30px'}
						height={'30px'}
						style={{
							transform: direction === 'right' 
							? 'rotate(360deg) translate(70px,0px)' 
							: direction === 'bottom' 
								? 'rotate(270deg) translate(-50px,0px)'
								: direction === 'top' 
									? 'rotate(270deg) translate(-50px,0px)'
									: '',
							left: '15px' 
							
						}}
					/>) 
				: (<div
						className={classNames({
							[cls['card-name__container']]: true,
							[cls[`card-name__container--${direction}`]]: !!direction,

						})
						}
					>
						<p className={classNames({
							[cls['card-name__title']]: true,
							[cls[`card-name__title--${direction}`]]: !!direction,
						})}
						>{name}</p>
						{
							players &&
							players?.length > 0 &&
							<PlayerSticker
								className={cls['card-name__sticker']}
								direction={direction}
								players={players}
							/>
						}
					</div>
				)}
			</div>
			<div style={{...initStyleColor, ...styleBayCard}} className={cls['blurBg']}/>
			{type !== 'chance' && type !== 'chest' && (
				// gradient над карточкой
				<div className={cls.gradient} />
			)}

			<div 
			style={initStyleColor} 
			className={cls['text-header-card']}>
				{type === 'chance' ? (
					<p>Шанс</p>
				) : type === 'chest' ? (
					<p>Казна</p>
				) : (
					<p>{cardCost}</p>
				)}
			</div>

			{onField && (
				<div className={classNames({
					[cls['onfield__container']]: true,
					[cls[`onfield__container--${direction}`]]: !!direction,

				})}>
					<div className={
						classNames({
							[cls['onfield__soles-icons']]: true,
							[cls[`onfield__soles-icons--${direction}`]]: !!direction,

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
};

import { Button } from '../Buttons/Button';
import Icon from '../Icon/Icon';

import cls from './collapsible-card.module.scss';

interface ICollapsibleCard{
	isOpen: boolean;
	title: string;
	Icon1: string;
	Icon2: string;
	icon1Size?: number[];
	icon2Size?: number[];
	children: React.ReactNode;
	handleClick: (status: 'up' | 'down')=>void;
	btnClassname: string;
	handleClickOpen: ()=>void;
}
const CollapsibleCard:React.FC<ICollapsibleCard> = ({
	isOpen,
	title,
	Icon1,
	Icon2,
	children,
	icon1Size = [12, 13],
	icon2Size = [12, 13],
	handleClick,
	btnClassname,
	handleClickOpen,
}) => {

	return (
		<div className={cls.collapsible}>
			<div className={cls.cardHeader}>
				<div className={cls.label}>{title}</div>
				<div className={cls.btns}>
					<Button disabled={!isOpen} className={`${cls.btn} ${btnClassname}`} type='outline' onClick={()=>handleClick('down')}>
						{Icon1 && <Icon src={Icon1} width={icon1Size[0]+''} height={icon1Size[1]+''} />}
					</Button>
					<Button disabled={!isOpen} className={`${cls.btn} ${btnClassname}`} type='outline' onClick={()=>handleClick('up')}>
						{Icon2 && <Icon src={Icon2} width={icon2Size[0]+''} height={icon2Size[1]+''} />}
					</Button>
				</div>
			</div>
			<div className={`${cls.collapseBody} ${isOpen ? cls.open : ''}`}>
				<div>{children}</div>
			</div>
			<Button
				onClick={() => handleClickOpen()}
				className={cls.collapseBtn}
				type='outline'>
				{isOpen? 'Свернуть' : 'Развернуть'}
			</Button>
		</div>
	);
};

export default CollapsibleCard;

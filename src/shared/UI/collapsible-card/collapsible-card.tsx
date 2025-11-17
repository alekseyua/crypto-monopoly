
import { icons } from '../../../assets';
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
	setShowFeetHistory: (b: boolean)=>void;
	isMobile?: boolean;
}
const CollapsibleCard:React.FC<ICollapsibleCard> = ({
	isOpen,
	title,
	Icon1,
	Icon2,
	children,
	isMobile,
	icon1Size = [12, 13],
	icon2Size = [12, 13],
	handleClick,
	btnClassname,
	handleClickOpen,
	setShowFeetHistory,
}) => {

	return (
		<div className={isMobile? cls['collapsible--mobile'] : cls.collapsible}>
			<div className={isMobile? cls['cardHeader--mobile'] : cls.cardHeader}>
				<div className={isMobile? cls['label--mobile'] : cls.label}>
					{isMobile && <Icon src={icons.rightArrow} width={'12'} height={'12'} className={cls['feeds__btns-icon-back']} onClick={() => setShowFeetHistory(true)} />}

					{title}</div>
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
			{!isMobile  && <Button
				onClick={() => handleClickOpen()}
				className={cls.collapseBtn}
				type='outline'>
				{isOpen? 'Свернуть' : 'Развернуть'}
			</Button>}
		</div>
	);
};

export default CollapsibleCard;

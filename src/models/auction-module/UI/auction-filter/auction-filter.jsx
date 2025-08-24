import { DropdownArrow } from '../../../../assets';
import { Button } from '../../../../shared/UI';
import cls from './auction-filter.module.css';

export const AuctionFilter = ({ Icon, iconWidth, iconHeight, btnText }) => {
	return (
		<Button variant='rounded' className={cls.auctionFilterBtn}>
			<p>{btnText}</p>
			{Icon ? (
				<Icon width={iconWidth} height={iconHeight} />
			) : (
				// <DropdownArrow width={10} height={5.75} />
					<Icon
						src={DropdownArrow}
						width={10} height={5.75}
					/>
			)}
		</Button>
	);
};

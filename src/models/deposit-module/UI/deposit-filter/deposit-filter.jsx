import { DropdownArrow } from '../../../../assets';
import { Button } from '../../../../shared/UI';
import cls from './deposit-filter.module.css';

export const DepositFilter = ({ Icon, iconWidth, iconHeight, btnText }) => {
	return (
		<Button variant='rounded' className={cls.depositFilterBtn}>
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

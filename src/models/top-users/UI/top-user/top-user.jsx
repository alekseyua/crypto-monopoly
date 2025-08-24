import cls from './top-user.module.css';

import { GiftIcon, userImg } from '../../../../assets';
import { forwardRef } from 'react';
import Icon from '../../../../shared/UI/Icon/Icon';

export const TopUser = forwardRef(function TopUser({ place = 1 }, ref) {
	return (
		<div ref={ref} className={cls.topUser}>
			<div className={cls.userImgCont}>
				{place === 1 ? (
					<div className={cls.placeIcon} data-place={place}>
						<img src={userImg} alt='' />
					</div>
				) : place === 2 ? (
					<div
						className={`${cls.placeIcon} ${cls.secondPLace}`}
						data-place={place}>
						<img src={userImg} alt='' />
					</div>
				) : (
					<div
						className={`${cls.placeIcon} ${cls.thirdPlace}`}
						data-place={place}>
						<img src={userImg} alt='' />
					</div>
				)}
			</div>
			<div className={cls.userInfo}>
				<p className={cls.userName}>Eron_Eger</p>
				<div className={cls.matchCount}>
					<p>
						Выиграно: <b>250 игр</b>
					</p>
					<p>
						Сыграно: <b>265 игр</b>
					</p>
				</div>
				<div className={cls.banner}>
					<Icon src={GiftIcon} width={13} height={14} />
					+30
				</div>
			</div>
		</div>
	);
});

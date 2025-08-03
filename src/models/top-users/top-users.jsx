import { useEffect, useRef, useState } from 'react';
import { Label, WrapperCard } from '../../shared/UI';
import cls from './top-users.module.css';
import { TopUser } from './UI';

export const TopUsers = () => {
	const topusersCardRef = useRef(null);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		const height =
			topusersCardRef.current.offsetHeight +
			topusersCardRef.current.offsetHeight / 1;

		setHeight(height);
	}, []);

	return (
		<WrapperCard>
			<div className={cls.cardLabels}>
				<Label text={'Топ игроков за неделю'} type={'gradient'} />
				<Label text={'Полный список'} />
			</div>
			<div style={{ height }} className={cls.topUsers}>
				<TopUser ref={topusersCardRef} />
				<TopUser place={2} />
				<div className={cls.topUsersGradient} />
			</div>
		</WrapperCard>
	);
};

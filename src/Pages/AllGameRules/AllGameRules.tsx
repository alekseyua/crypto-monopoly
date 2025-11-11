
import React, { useEffect } from 'react';
import cls from './all-game-rules.module.css';
import RuleCard from './components/rule-card/rule-card';
import Masonry, { ResponsiveMasonryProps, MasonryProps } from "react-responsive-masonry";
import { ResponsiveMasonry } from "react-responsive-masonry";
import { SET_HEADER_NAME_IS_SHOW } from '../../store/header/header';
import { useStoreon } from 'storeon/react';
import { HeaderNameEnum } from '../../store/header/header.d';
import BlockWrapper from '../../shared/UI/Block/BlockWrapper';

const arr = Array.from(Array(10).keys());

interface StateStore {
}

interface EventStore {
	[SET_HEADER_NAME_IS_SHOW]: string
}

const AllGameRules = () => {
	const { dispatch } = useStoreon<StateStore, EventStore>();
	useEffect(() => {
		dispatch(SET_HEADER_NAME_IS_SHOW, HeaderNameEnum.RULES_DETAIL);
	}, [dispatch])

	return (
		<main className={cls.AllGameRules}>
			<BlockWrapper>
				{React.createElement(
					ResponsiveMasonry as React.ComponentType<ResponsiveMasonryProps>,
					{
						columnsCountBreakPoints: { 450: 1, 900: 2, 1100: 3 },
						className: cls.allRules,
						children: (
							React.createElement(
								Masonry as React.ComponentType<MasonryProps>,
								{
									gutter: "34px",
									children:
										arr?.map((n) => (
											<RuleCard
												key={n}
												rule={
													"В основную игру может играть неограниченное количество игроков. Вступить в игру можно с минимальным балансом 100$. Игрок не может попасть на карту, на которой он должен заплатить налог более 25% от его имущества (не капитала, не баланса). Таким образом все игроки защищены от быстрого банкротства."
												}
												title={"Игрок"}
											/>
										)),
								}

							)
						),
					}
				)}
			</BlockWrapper>
		</main>
	);
};

export default AllGameRules;
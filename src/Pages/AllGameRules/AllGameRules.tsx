
import React from 'react';
import cls from './all-game-rules.module.css';
import RuleCard from './components/rule-card/rule-card';
import Masonry, { ResponsiveMasonryProps, MasonryProps } from "react-responsive-masonry";
import { ResponsiveMasonry } from "react-responsive-masonry";
import BlockWrapper from '../../shared/UI/Block/BlockWrapper';

const arr = Array.from(Array(10).keys());



interface IProps {
	rules?: { id: number; title: string; rule: string }[];
}

const AllGameRules:React.FC<IProps> = ({
	rules,
}) => {
	

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
										rules?.map((r, n) => (
											<RuleCard
												key={n}
												rule={r.rule}
												title={r.title}
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
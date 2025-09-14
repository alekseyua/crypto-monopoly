
import React from 'react';
import cls from './all-game-rules.module.css';
import RuleCard from './components/rule-card/rule-card';
import RulesHeader from './components/rules-header/rules-header';
import Masonry, { ResponsiveMasonryProps, MasonryProps } from "react-responsive-masonry";
import { ResponsiveMasonry } from "react-responsive-masonry";

const arr = Array.from(Array(10).keys());

const AllGameRules = () => {
	return (
    <main className={cls.AllGameRules}>
      <RulesHeader />
      <div className="wrapper">
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
      </div>
    </main>
  );
};

export default AllGameRules;
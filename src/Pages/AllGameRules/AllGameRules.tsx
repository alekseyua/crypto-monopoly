
import cls from './all-game-rules.module.css';
import RuleCard from './components/rule-card/rule-card';
import RulesHeader from './components/rules-header/rules-header';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

const arr = Array.from(Array(10).keys());

const AllGameRules = () => {
	return (
		<main className={cls.AllGameRules}>
			<RulesHeader />
			<div className='wrapper'>
				{/* <ResponsiveMasonry className={cls.allRules} columnsCountBreakPoints={{ 450: 1, 900: 2, 1100: 3 }}>
					<Masonry gutter='34px'>
						{arr?.map((n) => (
							<RuleCard
								key={n}
								rule={
									'В основную игру может играть неограниченное количество игроков. Вступить в игру можно с минимальным балансом 100$. Игрок не может попасть на карту, на которой он должен заплатить налог более 25% от его имущества (не капитала, не баланса). Таким образом все игроки защищены от быстрого банкротства.'
								}
								title={'Игрок'}
							/>
						))}
					</Masonry>
				</ResponsiveMasonry> */}
			</div>
		</main>
	);
};

export default AllGameRules;
import { RulesInfoCards } from './components';
import { QuestionsRulesContainer } from './components/Questions/QuestionsRulesContainer';
import cls from './rules.module.css';

export const Rules = () => {
	return (
		<section className={`${cls.rulesSection} wrapper`}>
			<RulesInfoCards />
			<QuestionsRulesContainer />
		</section>
	);
};

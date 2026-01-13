import { useStoreon } from 'storeon/react';
import BlockWrapper from '../../shared/UI/Block/BlockWrapper';
import { SET_HEADER_NAME_IS_SHOW } from '../../store/header/header';
import { RulesInfoCards } from './components';
import { QuestionsRulesContainer } from './components/Questions/QuestionsRulesContainer';
import cls from './rules.module.css';
import { useEffect } from 'react';
import { HeaderNameEnum } from '../../store/header/header.d';

interface StateStore {
  headerName: string;
}
interface EventStore {
  [SET_HEADER_NAME_IS_SHOW]: string;
}

export const Rules = () => {
	const { dispatch } = useStoreon<StateStore, EventStore>();
	useEffect(() => {
		document.title = "Land Of Monopoly - Правила игры";
	}, []);
	useEffect(() => {
		dispatch(SET_HEADER_NAME_IS_SHOW, HeaderNameEnum.RULES);
	}, [dispatch]);

	return (
		<section className={`${cls.rulesSection}`}>
			<BlockWrapper style={{ padding: '0 40px' }}>
				<RulesInfoCards />
				<QuestionsRulesContainer />
			</BlockWrapper>
		</section>
	);
};

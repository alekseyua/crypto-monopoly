import { useStoreon } from 'storeon/react';
import { BackArrow, SearchIcon } from '../../../../assets';
import { Button } from '../../../../shared/UI';
import BlockWrapper from '../../../../shared/UI/Block/BlockWrapper';
import Icon from '../../../../shared/UI/Icon/Icon';
import { HANDLER_SEARCH_CHANGE } from '../../../../store/rules/rule.type.d';
import cls from './rules-header.module.scss';
import React from 'react';

interface SState {}
interface SEvent {
	[HANDLER_SEARCH_CHANGE]: string;
}
 const RulesHeader = () => {
	const {dispatch} = useStoreon<SState, SEvent >();
	const [inpuText, setInputText] = React.useState('');
	const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.value);
		dispatch(HANDLER_SEARCH_CHANGE, e.target.value);
		setInputText(e.target.value);

	}
	return (
		<BlockWrapper isWithoutBottomIndent >
		<header className={`${cls.header}`}>
				<div className={cls.headerTitle}>
					<Button
						to='/rules'
						component='link'
						className={cls.backBtn}
						type='filled'
						variant='rounded'>
						<Icon  src={BackArrow}  width={'16'} height={'16'} />
					</Button>
					<h2>Основной режим</h2>
				</div>
				<div className={cls.headerButtons}>
					<div className={cls.search}>
						<input type='text' value={inpuText} style={{ paddingRight: 25 }} placeholder='Как часто можно ходить...' onChange={onSearchChange}/>
						<button>
							{/* <SearchIcon width={14} height={14} /> */}
							<Icon src={SearchIcon} width={'14'} height={'14'} style={{marginRight: 10, top: 5}}/>
						</button>
					</div>
					<div className={cls.contButtons} >
						<Button type='rounded' variant={'gradient'} p={15}>
							Описание правил
						</Button>
						<Button variant='rounded' type='filled' p={15}>
							Описание интерфейса
						</Button>
					</div>
				</div>
		</header>
			</BlockWrapper>
	);
};
export default RulesHeader;
import { useStoreon } from 'storeon/react';
import { BackArrow, SearchIcon } from '../../../assets';
import { Button } from '../../../shared/UI';
import BlockWrapper from '../../../shared/UI/Block/BlockWrapper';
import Icon from '../../../shared/UI/Icon/Icon';
import { HANDLER_SEARCH_CHANGE } from '../../../store/rules/rule.type.d';
import cls from './rules-header.module.scss';
import React from 'react';
import { NAV_DESC_INTERFACE, NAV_GAME_RULES } from '../../../routers/config-nav';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

interface SState { }
interface SEvent {
	[HANDLER_SEARCH_CHANGE]: string;
}
const HeaderRulesDetail = () => {
	const navigate = useNavigate();
	const [isActiveBtn, setIsActiveBtn] = React.useState<'rules' | 'interface'>('rules');
	const { dispatch } = useStoreon<SState, SEvent>();
	const [inpuText, setInputText] = React.useState('');
	const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.value);
		dispatch(HANDLER_SEARCH_CHANGE, e.target.value);
		setInputText(e.target.value);

	};

	const handleChangeScreen = (path: string) => {
		navigate(path);
		setIsActiveBtn(path === NAV_GAME_RULES ? 'rules' : 'interface');
	};

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
						<Icon src={BackArrow} width={'16'} height={'16'} />
					</Button>
					<h2>Основной режим</h2>
				</div>
				<div className={cls.headerButtons}>
					{isActiveBtn === 'rules' && <div className={cls.search}>
						<input type='text' value={inpuText} style={{ paddingRight: 25 }} placeholder='Как часто можно ходить...' onChange={onSearchChange} />
						<button>
							{/* <SearchIcon width={14} height={14} /> */}
							<Icon src={SearchIcon} width={'14'} height={'14'} style={{ marginRight: 10, top: 5 }} />
						</button>
					</div>}
					<div className={cls.contButtons} >
						<motion.div
							animate={{ scale: isActiveBtn === "rules" ? 1.05 : 1 }}
							transition={{ duration: 0.2 }}
						>

							<Button type={'rounded'} variant={isActiveBtn === 'rules' ? 'gradient' : 'filled'} onClick={() => handleChangeScreen(NAV_GAME_RULES)} p={15}>
								Описание правил
							</Button>
						</motion.div>
						<motion.div
							animate={{ scale: isActiveBtn === "interface" ? 1.05 : 1 }}
							transition={{ duration: 0.2 }}
						>
							<Button type={'rounded'} variant={isActiveBtn === 'interface' ? 'gradient' : 'filled'} onClick={() => handleChangeScreen(NAV_DESC_INTERFACE)} p={15}>
								Описание интерфейса
							</Button>
						</motion.div>

					</div>
				</div>
			</header>
		</BlockWrapper>
	);
};
export default HeaderRulesDetail;
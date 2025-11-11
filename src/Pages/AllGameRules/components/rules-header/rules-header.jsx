import { BackArrow, SearchIcon } from '../../../../assets';
import { Button } from '../../../../shared/UI';
import BlockWrapper from '../../../../shared/UI/Block/BlockWrapper';
import Icon from '../../../../shared/UI/Icon/Icon';
import cls from './rules-header.module.css';

 const RulesHeader = () => {
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
						<Icon  src={BackArrow}  width={16} height={16} />
					</Button>
					<h2>«‎Основной режим»‎</h2>
				</div>
				<div className={cls.headerButtons}>
					<div className={cls.search}>
						<input type='text' style={{paddingRight: 25}} placeholder='Как часто можно ходить...' />
						<button>
							{/* <SearchIcon width={14} height={14} /> */}
							<Icon src={SearchIcon} width={14} height={14} style={{marginRight: 10, top: 5}}/>
						</button>
					</div>
					<Button variant='rounded' type='gradient' p={15}>
						Описание правил
					</Button>
					<Button variant='rounded' type='filled' p={15}>
						Описание интерфейса
					</Button>
				</div>
		</header>
			</BlockWrapper>
	);
};
export default RulesHeader;
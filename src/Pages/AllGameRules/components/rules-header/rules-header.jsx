import { BackArrow, SearchIcon } from '../../../../assets';
import { Button } from '../../../../shared/UI';
import Icon from '../../../../shared/UI/Icon/Icon';
import cls from './rules-header.module.css';

 const RulesHeader = () => {
	return (
		<header className={`${cls.header} wrapper`}>
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
					<input type='text' placeholder='Как часто можно ходить...' />
					<button>
						{/* <SearchIcon width={14} height={14} /> */}
						<Icon src={SearchIcon} width={14} height={14} />
					</button>
				</div>
				<Button variant='rounded' type='gradient'>
					Описание правил
				</Button>
				<Button variant='rounded' type='filled'>
					Описание интерфейса
				</Button>
			</div>
		</header>
	);
};
export default RulesHeader;
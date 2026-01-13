import { BackArrowWhite, ReturnActiveFieldIcon, SearchIcon } from '../../../assets';
import { Button } from '../Buttons/Button';
import Icon from '../Icon/Icon';
import { Input } from '../Input/Input';

import cls from './collapsible-card.module.scss';

const CollapsibleCardFields = ({
	children,
	title,
	btnClassname,
	isOpen = false,
	inputValue,
	handleClick,
	isOpenSeacch,
	handleChangeInput,
	handleOpenDropDownListFields, // Add this prop if needed for dropdown menu functionality  (optional)
}) => {
	return (
		<div className={cls.collapsible}>
			<div className={cls.cardHeader}>
				<div className={`${cls.label} ${isOpenSeacch && cls.active}`} onClick={() => handleClick('closeSearch')}>{
					isOpenSeacch
						? <Icon src={BackArrowWhite} width={20} height={20} />
						: title
				}</div>
				<div className={cls.btns}>
					{
						isOpenSeacch
							? <div className={`${cls.containerSearch}`}>
								<Input value={inputValue} className={`${cls.inputactive}`} onChange={(e) => handleChangeInput(e.target.value)} style={{
									padding: '24px 25px'
								}} />
								<Icon src={SearchIcon} width={13.24} height={13.56} className={`${cls.iconSearch}`} />
							</div>
							: <Button className={`${cls.btn} ${btnClassname} ${isOpenSeacch && cls.active}`} type='outline' onClick={() => handleClick('openSearch')}>
								<Icon src={SearchIcon} width={13.24} height={13.56} />
							</Button>
					}
					<Button className={`${cls.btn} ${btnClassname}`} type='outline' onClick={() => handleClick('button_two')}>
						<Icon src={ReturnActiveFieldIcon} width={14} height={14} />
					</Button>
				</div>
			</div>
			<div className={`${cls.collapseBody} ${isOpen ? cls.open : ''}`}>
				<div>{children}</div>
			</div>
			<Button
				onClick={handleOpenDropDownListFields}
				className={cls.collapseBtn}
				type='outline'>
				{isOpen ? 'Свернуть' : 'Развернуть'}
			</Button>
		</div>
	);
};

export default CollapsibleCardFields;

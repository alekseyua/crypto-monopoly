import CollapsibleCardFields from '../../../../shared/UI/collapsible-card/collapsible-card-fields';
import { MiniInfoBoard } from '../../UI/mini-info-board/mini-info-board';
import cls from './fields-list.module.css';

export const FieldsList = ({
	isOpen,
	inputValue,
	listFields,
	handleClick,
	isOpenSeacch,
	handleSelectField,
	handleChangeInput,
	handleOpenDropDownListFields,
}) => {
	return (
		<div className={cls.side}>
			<CollapsibleCardFields
				title={'Список полей'}
				isOpen={isOpen}
				inputValue={inputValue}
				handleClick={handleClick}
				isOpenSeacch={isOpenSeacch}
				handleChangeInput={handleChangeInput}
				handleOpenDropDownListFields={handleOpenDropDownListFields}
			>
				<div className={cls.allFields}>
					{
						!!listFields.length 
							&& listFields?.map( field => <MiniInfoBoard key={field.id} field={field} handleSelectField={handleSelectField}/>)
					}
				</div>
			</CollapsibleCardFields>
		</div>
	);
};

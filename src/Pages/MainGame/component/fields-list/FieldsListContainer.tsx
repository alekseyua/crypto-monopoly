import { useState } from 'react';
import { FieldsList } from './fields-list';

const initListFields = [
		{
			id:0,
			title: '25359',
            activeField: true,
            selectField: false,
		},
		{
			id:1,
			title: '25360',
            activeField: false,
            selectField: false,
		},
		{
			id:2,
			title: '25361',
            activeField: false,
            selectField: false,
		},
		{
			id:3,
			title: '25362',
            activeField: false,
            selectField: false,
		},
		{
			id:4,
			title: '25363',
            activeField: false,
            selectField: false,
		},
		{
			id:5,
			title: '25364',
            activeField: false,
            selectField: false,
		},
		{
			id:6,
			title: '25365',
            activeField: false,
            selectField: false,
		},
		{
			id:7,
			title: '25366',
            activeField: false,
            selectField: false,
		},
		{
			id:8,
			title: '25367',
            activeField: false,
            selectField: false,
		},
		{
			id:9,
			title: '25368',
            activeField: false,
            selectField: false,
		},
	]

const FieldsListContainer = () => {
	// Implement your logic here
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenSeacch, setIsOpenSearch] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [listFields, setListFields ] = useState(initListFields)
	const handleOpenDropDownListFields = () => {
		setIsOpen((prev) =>!prev);
	}

	const handleSelectField = (id: any) => {
		setListFields(listFields?.map(field => field.id === id? {...field, selectField:!field.selectField } : {...field, selectField: false}));
	}

	const handleClick =(optional: any) => {
		if(optional === 'openSearch'){
			setIsOpenSearch(true);
			setIsOpen(true)
		}
		if(optional === 'closeSearch'){
			setInputValue('');
			setIsOpenSearch(false);
			setListFields(initListFields);
		}
		if(optional === 'button_two'){
            alert('open active field')
        }
	}

	const handleChangeInput = (e: any) => {
        const { value } = e.target;
        setInputValue(value)
		setListFields(listFields.filter(field => field.title.toLowerCase().includes(value.toLowerCase())))

    }

	return (
		<FieldsList 
			isOpen={isOpen}
			inputValue={inputValue}
			listFields={listFields}
			isOpenSeacch={isOpenSeacch}
			handleClick={handleClick}
			handleSelectField={handleSelectField}
			handleChangeInput={handleChangeInput}
			handleOpenDropDownListFields={handleOpenDropDownListFields}
		/>
	)
};

export default FieldsListContainer
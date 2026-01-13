import { DropdownArrow } from '../../../../assets';
import { motion } from 'framer-motion';

import cls from './question-dropdown.module.css';
import { useState } from 'react';
import Icon from '../../../../shared/UI/Icon/Icon';

const variants = {
	open: {
		height: 'auto',
		marginTop: '30px',
	},
	closed: {
		height: 0,
		marginTop: 0,
	},
};

export const QuestionDropdown = ({ children, buttonText }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={cls.dropdown}>
			<button onClick={() => setIsOpen((prev) => !prev)}>
				{buttonText}
				{/* <DropdownArrow
					style={
						isOpen
							? { transform: 'rotate(180deg)', transition: '.3s' }
							: { transform: 'rotate(0deg)', transition: '.3s' }
					}
					width={18}
					height={10}
				/> */}
				<Icon
					src={DropdownArrow}
					style={
						isOpen
							? { transform: 'rotate(180deg)', transition: '.3s' }
							: { transform: 'rotate(0deg)', transition: '.3s' }
					}
					width={18}
					height={10}
				/>
			</button>
			<motion.div
				variants={variants}
				animate={isOpen ? 'open' : 'closed'}
				className={cls.dropdownContent}>
				{children}
			</motion.div>
		</div>
	);
};

import { Button } from '../../../../shared/UI';
import { motion } from 'framer-motion';

import cls from './rule-card.module.css';
import { useState } from 'react';

const variants = {
	open: {
		height: 'auto',
	},
	closed: {
		height: '47px',
	},
};

 const RuleCard = ({ title, rule }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={cls.card}>
			<h3 className={cls.cardTitle}>{title}</h3>
			<motion.p
				variants={variants}
				animate={isOpen ? 'open' : 'closed'}
				className={`${cls.cardText} ${isOpen ? cls.open : ''}`}>
				{rule}
			</motion.p>
			<Button type='outline' onClick={() => setIsOpen((prev) => !prev)}>
				{isOpen ? 'Свернуть' : 'Развернуть'}
			</Button>
		</div>
	);
};
export default RuleCard;
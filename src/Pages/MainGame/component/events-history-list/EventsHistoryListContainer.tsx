import { useState } from 'react';
import { EventsHistoryList } from './events-history-list';
interface IProps {
	messages: {
		title: string;
		desc: string;
	}[]
	heightGameBoard: number;
}

const EventsHistoryListContainer: React.FC<IProps> = ({
	messages,
	heightGameBoard,
}) => {
	const [isOpen, setIsOpen] = useState(true);

	const handleClickOpen = () => {
		setIsOpen((prev) => !prev);
	}

	function scrollDown() {
		const container = document.getElementById('container-list-history');
		container && container.scrollBy({ top: 100, behavior: 'smooth' });
	}

	function scrollUp() {
		const container = document.getElementById('container-list-history');
		container && container.scrollBy({ top: -100, behavior: 'smooth' });
	}

	const handleClick = (action: 'up' | 'down') => {
		if (action === 'up') {
			scrollUp()
		} else if (action === 'down') {
			scrollDown()
		}
	}

	return (
		<EventsHistoryList
			heightGameBoard={heightGameBoard}
			isOpen={isOpen}
			handleClick={handleClick}
			handleClickOpen={handleClickOpen}
			messages={messages}
		/>
	)
};

export default EventsHistoryListContainer
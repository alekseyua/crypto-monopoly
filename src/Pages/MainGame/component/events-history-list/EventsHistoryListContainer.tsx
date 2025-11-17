import { useState } from 'react';
import { EventsHistoryList } from './events-history-list';
import { IDataQG, IMassagesFeed } from '../../../../store/quick-game/quick-game.d';
import { useStoreon } from 'storeon/react';
import { useWindowWidth } from '../../../../hooks/useWindowWidth';
import { Button } from '../../../../shared/UI';
interface IProps {
	heightGameBoard: number;
}

const EventsHistoryListContainer: React.FC<IProps> = ({
	heightGameBoard,
}) => {
	const [isOpen, setIsOpen] = useState(true);
	const {
		quickGame,
		feedNewsMessages,
	}: {
		quickGame: IDataQG;
		feedNewsMessages: IMassagesFeed[];
	} = useStoreon("quickGame", "feedNewsMessages");
	const width = useWindowWidth();
	const isMobile = width <= 992;
	const [showFeetHistory, setShowFeetHistory] = useState<boolean>(isMobile);


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


	if (isMobile && showFeetHistory) {
		return <Button
			onClick={() => setShowFeetHistory(false)}
			fillColor='#726CED'
			type='filled'
			p={12}
			textColor='#fff'
		>История событий</Button>
	}
	return (
		<EventsHistoryList
			heightGameBoard={heightGameBoard}
			setShowFeetHistory={setShowFeetHistory}
			isMobile={isMobile}
			isOpen={isOpen}
			handleClick={handleClick}
			handleClickOpen={handleClickOpen}
			messages={feedNewsMessages}
			players={quickGame.players}
		/>
	);
};

export default EventsHistoryListContainer
import { useState } from 'react';
import { EventsHistoryList } from './events-history-list';
import { IDataQG, IMassagesFeed } from '../../../../store/quick-game/quick-game.d';
import { useStoreon } from 'storeon/react';
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
      messages={feedNewsMessages}
      players={quickGame.players}
    />
  );
};

export default EventsHistoryListContainer
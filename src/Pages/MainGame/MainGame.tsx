import EventsHistoryListContainer from './component/events-history-list/EventsHistoryListContainer';
import FieldsListContainer from './component/fields-list/FieldsListContainer';
import cls from './main-game.module.css';

 const MainGame = () => {

	return (
		<section className={cls.MainGameSection}>
			<div className='wrapper'>
				<div className={cls.mainGameCont}>
					<FieldsListContainer />
					<div>
						development continues
					</div>
					<EventsHistoryListContainer 
						heightGameBoard = { 500 }
					/>
				</div>
			</div>
		</section>
	);
};
export default MainGame;
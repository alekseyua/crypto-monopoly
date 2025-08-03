import { RightArrowIcon } from '../../../../assets';
import CollapsibleCard from '../../../../shared/UI/collapsible-card/collapsible-card';
import { Event } from '../../UI/event/event';
import cls from './events-history-list.module.css';
interface IEventHistoryList {
	messages: {
		title: string;
		desc: string;
	}[];
	isOpen: boolean;
	handleClick: (action: 'up' | 'down')=>void;
	handleClickOpen: ()=> void;
	heightGameBoard: number;
}
export const EventsHistoryList: React.FC<IEventHistoryList> = ({
	isOpen,
	messages,
	handleClick,
	heightGameBoard,
	handleClickOpen,
}:IEventHistoryList) => {

	return (
		<div 
			className={cls.side}
			style={{
				height: !isOpen?  200 : heightGameBoard
			}}
		>
			<CollapsibleCard
				btnClassname={cls.iconBtn}
				title={'История событий'}
				Icon1={RightArrowIcon}
				Icon2={RightArrowIcon}
				isOpen={isOpen}
				handleClickOpen={handleClickOpen}
				handleClick={handleClick}
			>

				<div className={cls.allEvents} id={'container-list-history'}>
					{
						!!messages?.length 
							&& messages.map( (m:{title: string; desc: string}, index: number) => (
								<Event
									key={index}
									btnColor={'#F9D15E80'}
									date={'09.09.23 12:32'}
									dateColor={'#D09337'}
									fieldColor={'#FFEFD3'}
									withButton={true}>
									<h3>{m.title}</h3>
									<p>
										{m.desc}
									</p>
								</Event>
							))
					}
					
				</div>
			</CollapsibleCard>
		</div>
	);
};

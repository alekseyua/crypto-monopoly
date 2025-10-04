import { AchievementsPreviewModule } from './AchievementsPreviewModule';
import { useStoreon } from 'storeon/react';
import { IAchivmentPlayer } from '../../store/quick-game/quick-game.d';

export const AchievementsPreviewModuleContainer = () => {
	const {
		listAchivmentPlayer
	}:{
		listAchivmentPlayer: IAchivmentPlayer[]
	} = useStoreon('listAchivmentPlayer');

	return (
		<AchievementsPreviewModule 
			listAchivmentPlayer={listAchivmentPlayer}
		/>
	);
};

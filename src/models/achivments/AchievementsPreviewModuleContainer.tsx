import { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { AchievementsPreviewModule } from './AchievementsPreviewModule';
import { useStoreon } from 'storeon/react';
import { IAchivmentPlayer } from '../../store/quick-game/quick-game.d';

export const AchievementsPreviewModuleContainer = () => {
	const navigate = useNavigate();
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

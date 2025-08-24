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


	useEffect(() => {
		console.log('%cRENDER ACHIVMENT LIST SELECT QIUICK GAME container', 'color: red')
		console.table(listAchivmentPlayer)
	}, [listAchivmentPlayer]);

	return (
		<AchievementsPreviewModule 
			listAchivmentPlayer={listAchivmentPlayer}
		/>
	);
};

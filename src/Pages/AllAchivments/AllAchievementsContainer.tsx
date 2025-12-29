import { useStoreon } from "storeon/react";
import AllAchievements from "./AllAchievements";
import {IAchivmentPlayer} from "../../store/quick-game/quick-game.type";

 const AllAchievementsContainer = () => {
	const {
			listAchivmentPlayer
		}:{
			listAchivmentPlayer: IAchivmentPlayer[]
		} = useStoreon('listAchivmentPlayer');

	return (
			<AllAchievements 
				listAchivmentPlayer={listAchivmentPlayer}
			/>
	);
};
export default AllAchievementsContainer;
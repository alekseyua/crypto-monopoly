import { createBrowserRouter } from "react-router-dom";
import { NAV_ALL_ACHIEVEMENTS, NAV_AUTH_PAGE, NAV_GAME_RULES, NAV_MAIN_PAGE, NAV_QG_FIELD_PAGE, NAV_QG_SELECT_PAGE, NAV_REG_PAGE, NAV_RULES_PAGE } from "./config-nav";
import SelectQGContainer from "../Pages/QuickGame/SelectQuickGame/SelectQuickGameContainer";
import AllGameRules from "../Pages/AllGameRules/AllGameRules";
import { MobileMainGame } from "../Pages/mobile-main-game/mobile-main-game";
import { Auction } from "../Pages/auction/auction";
import { Deposit } from "../Pages/deposit/deposit";
import AllAchievementsContainer from "../Pages/AllAchivments/AllAchievementsContainer";
import ProfileContainer from "../Pages/Profile/ProfileContainer";
import { FieldQGContainer } from "../Pages/QuickGame/FieldQuickGame/FieldQuickGameContainer";
import Root from "../Pages/Root/Root";
import Auth from "../Pages/Auth/Auth";
import RegitUserContainer from "../models/register/RegitUserContainer";
import LoginUserContainer from "../models/login/LoginUserContainer";
import MainGame from "../Pages/MainGame/MainGame";
import { Rules } from "../models/Rules/Rules";

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			{
				path: '/authorization',
				element: <Auth />,
				children: [
					{ 
						path: NAV_REG_PAGE, 
						element: <RegitUserContainer /> 
					},
					{ 
						path: NAV_AUTH_PAGE, 
						element: <LoginUserContainer /> 
					}
				],
			},
			{
				path: NAV_RULES_PAGE,
				element: <Rules />,
			},
			{
				path: NAV_QG_SELECT_PAGE,
				element: <SelectQGContainer />,
			},
			{
				path: NAV_QG_FIELD_PAGE,
				element: <FieldQGContainer />,
			},
			{
				path: NAV_MAIN_PAGE,
				element: <MainGame />,
			},
			{
				path: '/mobile-main-mode',
				element: <MobileMainGame />,
			},
			{
				path: NAV_ALL_ACHIEVEMENTS,
				element: <AllAchievementsContainer />,
			},
		],
	},
	{
		path: NAV_GAME_RULES,
		element: <AllGameRules />,
	},
	{
		path: '/main-mode/auction',
		element: <Auction />,
	},
	{
		path: '/main-mode/deposit',
		element: <Deposit />,
	},
	{
		path: '/profile',
		element: <ProfileContainer />,
	},
]);

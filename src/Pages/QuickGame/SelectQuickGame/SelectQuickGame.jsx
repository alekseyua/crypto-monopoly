import { moneyBag } from '../../../assets';
import { TopUsers } from '../../../models/top-users/top-users';
import TableSelectQuickGamesContainer from './TableSelectQuickGames/TableSelectQuickGamesContainer';
import { Button, WrapperCard } from '../../../shared/UI';

import cls from '../styles/quick-game.module.scss';
import { AchievementsPreviewModuleContainer } from '../../../models/achivments/AchievementsPreviewModuleContainer';
import Section from '../../../shared/UI/Section/Section';

export const SelectQG = ({ handleGetRefCode }) => /* разбить на контейнерные компоненты*/ /* для удобства и читабельности кода*/ /* и для возможности динамического добавления новых компонентов*/ /* в будущем, если потребуется расширить функционал приложения*/ /* (например, добавить еще одну категорию достижений или пользователей)*/ /* лучше всего сделать это в отдельных компонентах,*/ /* и вызывать их внутри основного компонента QG*/ /* таким образом, в коде станет более читаемым и понятным*/ /* и удобно будет расширять его в будущем*/ /* (например, добавив новую категор*/ (
	<Section>
		<div className='wrapper'>
			<div className={cls.quickGameCont}>

				<div className={cls.quickGameUserInfo}>
					<WrapperCard className={cls.referalCard}>
						<div className={cls.cardBody}>
							<div className={cls.cardInfo}>
								<p>
									Пригласи друга в игру и получи <br />{' '}
									<b>на счет до 150 $</b>
								</p>
								<div className={cls.cardButtons}>
									<Button
										className={cls.cardBtnGradient}
										onClick={handleGetRefCode}
									>
										Пригласить друга
									</Button>
									<Button>Закрыть</Button>
								</div>
							</div>
							<img src={moneyBag} alt='Money bag' />
						</div>
						<img className={cls.bgMoneyBag} src={moneyBag} alt='Money bag' />
					</WrapperCard>
					<AchievementsPreviewModuleContainer />
					<TopUsers />
				</div>
				{/* list games */}
				<TableSelectQuickGamesContainer />
			</div>
		</div>
	</Section>
);

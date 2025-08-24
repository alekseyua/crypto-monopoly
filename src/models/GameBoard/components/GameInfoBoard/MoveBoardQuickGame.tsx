import { icons, logo } from '../../../../assets';
import AutoCounter from '../../../../Component/AutoCounter/AutoCounter';
import { Button, Input, Offset } from '../../../../shared/UI';
import Icon from '../../../../shared/UI/Icon/Icon';
import Text from '../../../../shared/UI/Text/Text';
import Title from '../../../../shared/UI/Title/Title';
import GameInfoBoardFooterContainer from '../GameInfoBoardFooter/GameInfoBoardFooterContainer';
import ContainerInfoTwoColumnGIB from '../GameInfoBoardNew/UIContainerGIB/InfoGIB/ContainerInfoTwoColumnGIB';
import styles from './styles/gib.module.scss';
import {ReactComponent as QgCurrencySvgWhite} from '../../../../assets/icons/qg-currency-white.svg';
import ButtonBack from '../../../../shared/UI/Buttons/ButtonBack/ButtonBack';

interface IMoveBoardQGProps {
	onMove: (params: any) => void;
	title?: string;
	titleBtn?: string;
	action: string;
	timeEndMove: number;
}

export const MoveBoardQG: React.FC<IMoveBoardQGProps> = ({
	onMove,
	action,
	title = 'Время вашего хода',
	titleBtn = 'Походить',
	timeEndMove,
}: IMoveBoardQGProps) => {
	return (
		<div className={styles['gib__container']}>
			{/* header */}
			{title ?
				<>
					<Offset mt={30} />
					<div className={styles['gib__header-container--timer']}>
						<Title
							className={styles['gib__title']}
							title={title}
						/>
						(<AutoCounter disabled={false} counter={timeEndMove} callback={() => { }} /> сек.)
					</div>
				</>
				: <Offset mt={30} />
			}
			{/* btn */}
			<div className={styles['gib__btns-container--btn-one']}>
				<Button onClick={() => onMove({
					action,
				})}>{titleBtn}</Button>
			</div>
<ContainerInfoTwoColumnGIB>
{/* <Input
									wrapClassName={styles['gib__input-bet-auction']}
									placeholder='Введите вашу ставку'
									// value={currentBet}
									onChange={(value) => {
										const numericValue = parseFloat(value);
										// if (!isNaN(numericValue) && numericValue >= startPrice) {
										// setCurrentBet(numericValue);
										// }
										//  else {
										//    setCurrentBet(startPrice);
										// }
									}}
									type='number'
									id='input-bet-auction'
								/> */}
							{/* <Text fontSize={12} color="#4E4C6D" style={{display: 'inline-block'}}>
  Ставка должна быть не ниже начальной цены (выше&nbsp;
  {12}
  <Icon src={icons.qgCurrencySvgWhite} width="14" height="13" ml={4} />
  )
</Text> */}
{/* <ButtonBack
						onClick={() => ({})}
						title={'Назад'}
					/> */}
				</ContainerInfoTwoColumnGIB>

			<Offset mt={10} />
			{/* body */}
			<div style={{ background: '#E9ECFF' }} className={styles['gib__body-container']}>
				<div className={styles['gib__body-container-wrap--full']}>
					<Icon
						src={logo}
						width='100%'
						height='100%'
					/>

				</div>
			</div>
			<Offset mt={10} />
			{/* footer */}
			<GameInfoBoardFooterContainer />

			<Offset mt={10} />

		</div>
	);
};

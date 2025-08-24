import { Button, Offset } from "../../../../../../shared/UI";
import Title from "../../../../../../shared/UI/Title/Title";
import ContainerOneBtn from "../../ControllerGIB/ContainerOneBtn";
import GameInfoBoardFooterContainer from "../../FooterGIB/GameInfoBoardFooterContainer";
import ContainerGIB from "../../UIContainerGIB/ContainerGIB";
import ContainerInfoBodyGIB from "../../UIContainerGIB/InfoGIB/ContainerInfoBodyGIB";
import ContainerInfoFooterGIB from "../../UIContainerGIB/InfoGIB/ContainerInfoFooterGIB";
import ContainerInfoHeaderGIB from "../../UIContainerGIB/InfoGIB/ContainerInfoHeaderGIB";


interface IProps {
	handleClick: (params: any) => void;
	title?: string;
	typeCard: string;
}

export const ShowMassagePopup: React.FC<IProps> = ({
	handleClick,
	title,
}: IProps) => {
	return (
		<ContainerGIB
			style={{ background: '#E9ECFF' }}
		>
			<ContainerInfoHeaderGIB>
			<Offset mt={30} />

				<Title 
					title={title}
					tag="h1"
					center
				/>
			</ContainerInfoHeaderGIB>
			<Offset mt={50} />
			<ContainerInfoBodyGIB>
<ContainerOneBtn>
				<Button
					variant='gradient' 
					gradientColors={['#726CED', '#70DCF1']}
					onClick={() => handleClick({
					action: 'clean_popup_data',
				})}>
					ok
				</Button>
</ContainerOneBtn>
			</ContainerInfoBodyGIB>

			<ContainerInfoFooterGIB>
		 	<GameInfoBoardFooterContainer 
		 		bgc={'#CFD3ED4D'}
		 	/>
			</ContainerInfoFooterGIB>


		</ContainerGIB>
		// <div className={styles['gib__container']}
		// style={{ background: '#E9ECFF' }}
		// >
		// 	{/* header */}

		// 	{/* btn */}
		// 	<div className={styles['gib__btns-container--btn-one--full']}>
				// <Button 
				// 	variant='gradient' 
				// 	gradientColors={['#726CED', '#70DCF1']}
				// 	onClick={() => onMove({
				// 	action,
				// 	card_id: cardIdWhereMoveTo
				// })}>{titleBtn}</Button>
		// 	</div>

		// 	<Offset mt={10} />
		// 	{/* body */}
		// 	<div  className={styles['gib__body-container']}>
		// 		<div className={styles['gib__body-container-wrap--full']}>
		// 			{/* <Offset mt={30} /> */}
		// 			<Title
		// 				className={styles['gib__title']}
		// 				title={title}
		// 			/>
		// 			<Icon
		// 				src={icons.chance}
		// 				width='100%'
		// 				height='100%'
		// 				style={{ position: 'absolute', top:'50%', left:' 50%', transform: 'translate(-50%, -50%) rotate(270deg) scale(2.5)',opacity: 0.5 }}
		// 			/>
		// 			<div className={styles['gib__content']}>
		// 				{content}
		// 			</div>
		// 		</div>
		// 	</div>
		// 	<Offset mt={10} />
		// 	{/* footer */}

		

		// 	<Offset mt={10} />

		// </div>
	);
};

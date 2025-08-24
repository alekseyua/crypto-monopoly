import { Button, Offset } from "../../../../../../shared/UI";
import Title from "../../../../../../shared/UI/Title/Title";
import ContainerOneBtn from "../../ControllerGIB/ContainerOneBtn";
import GameInfoBoardFooterContainer from "../../FooterGIB/GameInfoBoardFooterContainer";
import ContainerGIB from "../../UIContainerGIB/ContainerGIB";
import ContainerInfoBodyGIB from "../../UIContainerGIB/InfoGIB/ContainerInfoBodyGIB";
import ContainerInfoFooterGIB from "../../UIContainerGIB/InfoGIB/ContainerInfoFooterGIB";
import ContainerInfoHeaderGIB from "../../UIContainerGIB/InfoGIB/ContainerInfoHeaderGIB";


interface IInfoChanceOrCommunityProps {
	onMove: (params: any) => void;
	title?: string;
	titleBtn?: string;
	action: string;
	content: string;
	cardIdWhereMoveTo: number | null;
}

export const InfoChanceOrCommunity: React.FC<IInfoChanceOrCommunityProps> = ({
	onMove,
	action,
	title = 'Время вашего хода',
	titleBtn = 'Походить',
	content,
	cardIdWhereMoveTo,
}: IInfoChanceOrCommunityProps) => {
	console.log({action})
	return (
		<ContainerGIB
			style={{ background: '#E9ECFF' }}
		>
			<ContainerInfoHeaderGIB>
				<ContainerOneBtn>
					<Button
						variant='gradient'
						gradientColors={['#726CED', '#70DCF1']}
					>
						{title}
					</Button>
				</ContainerOneBtn>
			</ContainerInfoHeaderGIB>
			<Offset mt={70} />
			<ContainerInfoBodyGIB>
				<Title
					tag="h2"
					title={content}
					center
				/>
				<Offset mt={30} />

				<Button
					variant='fill'
					fillColor={'#726CED'}
					p={20}
					onClick={() => onMove({
						action,
						card_id: cardIdWhereMoveTo
					})}>
					{titleBtn}
				</Button>
			</ContainerInfoBodyGIB>

			<ContainerInfoFooterGIB>
				<GameInfoBoardFooterContainer
					bgc={'#CFD3ED4D'}
				/>
			</ContainerInfoFooterGIB>
		</ContainerGIB>
	);
};

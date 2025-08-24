import cls from './step3.module.css';
import { Button, Input, Label, WrapperCard } from '../../../../shared/UI';
import { useStoreon } from 'storeon/react';

export const Step3 = ({
	handleNextStep,
	handleSetRegData,
}) => {
	const { regStep,regData, errorReg } = useStoreon('regStep','regData', 'errorReg')
	


	return (
		<WrapperCard>
			<div className={cls.labels}>
				<Label text={'Придумайте никнейм'} type={'gradient'} />
				<Label text={`${regStep} из 6`} />
			</div>
			<div className={cls.cardBody}>
				<Input
					value={regData.username}
					onChange={(value) => handleSetRegData({username: value})}
					label={
						errorReg? errorReg : 'Никнейм должен содержать не более 12 символовбез пробелов и только на латинице. Допускаются знаки:_-<>{}#№!?*'
					}
					error={errorReg}
					style={{
									padding: '24px 25px'
								}}
					id={'mail'}
				/>
				<Button
					onClick={() => handleNextStep()}
					type='filled'
					fillColor='#726CED'
					textColor='#fff'
					disabled={regData.username.trim().length === 0}>
					Далее
				</Button>
			</div>
		</WrapperCard>
	);
};

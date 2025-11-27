import cls from './step3.module.scss';
import { Button, Input, Label, WrapperCard } from '../../../../shared/UI';
import { useStoreon } from 'storeon/react';
import Icon from '../../../../shared/UI/Icon/Icon';
import { icons } from '../../../../assets';

export const Step3 = ({
	handleNextStep,
	handlePrevStep,
	handleSetRegData,
}) => {
	const { regStep,regData, errorReg } = useStoreon('regStep','regData', 'errorReg')
	


	return (
		<WrapperCard>
			<div className={cls.labels}>
				<Icon src={icons.rightArrow} rotate={180} onClick={handlePrevStep} />
				<div className={cls.contLabel}>
					<Label p={11} text={'Регистрация через почту'} type={'gradient'} />
					<Label p={5} text={`${regStep} из 5`} />
				</div>
			</div>
			<div className={cls.cardBody}>
				<Input
					value={regData.username}
					onChange={(e) => handleSetRegData({username: e.target.value})}
					label={
						errorReg? errorReg : 'Никнейм должен содержать не более 12 символов без пробелов и только на латинице. Допускаются знаки:_-<>{}#№!?*'
					}
					className={cls.authInput}
					error={errorReg}
					id={'mail'}
				/>
				<Button
					onClick={() => handleNextStep()}
					p={24}
					type='fill'
					fillColor='#726CED'
					textColor='#fff'
					disabled={regData?.username?.trim()?.length === 0}>
					Далее
				</Button>
			</div>
		</WrapperCard>
	);
};

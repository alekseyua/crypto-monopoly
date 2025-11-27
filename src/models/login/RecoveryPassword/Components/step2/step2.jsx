import { icons } from '../../../../../assets';
import { Button, Input, Label, WrapperCard } from '../../../../../shared/UI';
import Icon from '../../../../../shared/UI/Icon/Icon';
import cls from './Step2.module.scss';
import { useStoreon } from 'storeon/react';

export const Step2 = ({
	handleNextStep,
	handlePrevStep,
	handleSetRegData,
	handleGetDuplicateCode
}) => {
	const { recoveryStep, recoveryData, errorRecovery } = useStoreon('recoveryStep', 'recoveryData', 'errorRecovery')

	return (
		<WrapperCard>
			{/* <div className={cls.labels}>
				<Label p={11} text={'Проверка почты'} type={'gradient'} />
				<Label p={11} text={`${recoveryStep} из 3`} />
			</div> */}
			<div className={cls.labels}>
				<Icon src={icons.rightArrow} rotate={180} onClick={handlePrevStep} />
				<div className={cls.contLabel}>
					<Label p={11} text={'Проверка почты'} type={'gradient'} />
					<Label p={5} text={`${recoveryStep} из 3`} />
				</div>
			</div>
			<div className={cls.cardBody}>
				<Input
					className={cls.authInput}
					error={errorRecovery}
					value={recoveryData.code}
					onChange={(e) => handleSetRegData({ code: e.target.value })}
					label={errorRecovery ? errorRecovery : `Код для проверки отправлен на указанный почтовый ящик  (${recoveryData.email.slice(0, 4)}***${recoveryData.email.slice(-6, recoveryData.email.length)})`}
					id={'mail'}
					iconRight={<div className={cls.dublicateCode} onClick={handleGetDuplicateCode}>Дублировать код</div>}
					onEnter={() => (recoveryData.code
						? true
						: recoveryData.code?.match(/\d/g)?.length
							? recoveryData.code?.match(/\d/g)?.length < 5
							: true) && handleNextStep()}

				/>
				<div className={cls.btns}>
					<Button p={23} onClick={() => handlePrevStep()}>Указать другую почту</Button>
					<Button
						p={23}
						onClick={() => handleNextStep()}
						disabled={
							!recoveryData.code
								? true
								: recoveryData.code?.match(/\d/g)?.length
									? recoveryData.code?.match(/\d/g)?.length < 5
									: true
						}
						fillColor='#726CED'
						textColor='#fff'>
						Далее
					</Button>
				</div>
			</div>
		</WrapperCard>
	);
};

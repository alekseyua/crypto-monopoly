import { Button, Input, Label, WrapperCard } from '../../../../../shared/UI';
import cls from './Step2.module.css';
import { useStoreon } from 'storeon/react';

export const Step2 = ({
	handleNextStep,
	handlePrevStep,
	handleSetRegData,
	handleGetDublicateCode
}) => {
	const { recoveryStep, recoveryData, errorRecovery } = useStoreon('recoveryStep', 'recoveryData', 'errorRecovery')

	return (
		<WrapperCard>
			<div className={cls.labels}>
				<Label text={'Проверка почты'} type={'gradient'} />
				<Label text={`${recoveryStep} из 3`} />
			</div>
			<div className={cls.cardBody}>
				<Input
					style={{
						padding: '24px 25px'
					}}
					error={errorRecovery}
					value={recoveryData.code}
					onChange={(e) => handleSetRegData({ code: e.target.value })}
					label={errorRecovery ? errorRecovery : `Код для проверки отправлен на указанный почтовый ящик  (${recoveryData.email.slice(0, 4)}***${recoveryData.email.slice(-6, recoveryData.email.length)})`}
					id={'mail'}
					iconRight={<div className={cls.dublicateCode} onClick={handleGetDublicateCode}>Дублировать код</div>}

				/>
				<div className={cls.btns}>
					<Button onClick={() => handlePrevStep()}>Указать другую почту</Button>
					<Button
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

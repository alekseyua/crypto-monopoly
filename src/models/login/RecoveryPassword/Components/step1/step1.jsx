import { Button, Input, Label, WrapperCard } from '../../../../../shared/UI';
import cls from './step1.module.css';
import { useStoreon } from 'storeon/react';

export const Step1 = ({
	handleNextStep,
	handleSetRegData,
}) => {
	const { recoveryStep, recoveryData, errorRecovery } = useStoreon('recoveryStep', 'recoveryData', 'errorRecovery')

	return (
		<WrapperCard>
			<div className={cls.labels}>
				<Label text={'Восстановить через почту'} type={'gradient'} />
				<Label text={`${recoveryStep} из 3`} />
			</div>
			<div className={cls.cardBody}>
				<Input
				style={{
									padding: '24px 25px'
								}}
					value={recoveryData.email}
					onChange={(value) => handleSetRegData({email: value})}
					label={errorRecovery? errorRecovery : 'Почта'}
					error={errorRecovery}
					id={'mail'}
				/>
				<Button
					onClick={() => handleNextStep()}
					type='filled'
                    fillColor='#726CED'
                    textColor='#fff'
					disabled={!(recoveryData.email.includes('@') && recoveryData.email.includes('.') && recoveryData.email.length !== 0)}>
					Отправить
				</Button>
			</div>
		</WrapperCard>
	);
};

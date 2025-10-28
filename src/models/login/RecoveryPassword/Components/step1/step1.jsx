import { Button, Input, Label, WrapperCard } from '../../../../../shared/UI';
import cls from './step1.module.scss';
import { useStoreon } from 'storeon/react';

export const Step1 = ({
	handleNextStep,
	handleSetRegData,
}) => {
	const { recoveryStep, recoveryData, errorRecovery } = useStoreon('recoveryStep', 'recoveryData', 'errorRecovery')

	return (
		<WrapperCard>
			<div className={cls.labels}>
				<Label p={11} text={'Восстановить через почту'} type={'gradient'} />
				<Label p={11} text={`${recoveryStep} из 3`} />
			</div>
			<div className={cls.cardBody}>
				<Input
					className={cls.authInput}

					value={recoveryData.email}
					onChange={(e) => handleSetRegData({email: e.target.value})}
					label={errorRecovery? errorRecovery : 'Почта'}
					error={errorRecovery}
					id={'mail'}
				/>
				<Button
					onClick={() => handleNextStep()}
					type='filled'
					p={23}

                    fillColor='#726CED'
                    textColor='#fff'
					disabled={!(recoveryData.email.includes('@') && recoveryData.email.includes('.') && recoveryData.email.length !== 0)}>
					Отправить
				</Button>
			</div>
		</WrapperCard>
	);
};

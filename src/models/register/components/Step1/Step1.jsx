import { Button, Input, Label, WrapperCard } from '../../../../shared/UI';
import cls from './step1.module.css';
import { useStoreon } from 'storeon/react';

export const Step1 = ({
	handleNextStep,
	handleSetRegData,

}) => {
	const { regStep,regData, errorReg } = useStoreon('regStep','regData', 'errorReg')

	return <WrapperCard>
			<div className={cls.labels}>
				<Label text={'Регистрация через почту'} type={'gradient'} />
				<Label text={`${regStep} из 6`} />
			</div>
			<div className={cls.cardBody}>
				<Input
					value={regData.email}
					onChange={(e) => handleSetRegData({email: e.target.value})}
					label={errorReg? errorReg : 'Почта'}
					error={errorReg}
					id={'mail'}
					style={{
									padding: '24px 25px'
								}}
				/>
				<Button
					onClick={() => handleNextStep()}
					type='fill'
					p={24}
                    fillColor='#726CED'
                    textColor='#fff'
					disabled={!(regData.email.includes('@') && regData.email.includes('.')  && regData.email.length !== 0)}>
					Зарегистрироваться
				</Button>
			</div>
		</WrapperCard>
};

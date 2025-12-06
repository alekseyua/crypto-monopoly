import { Button, Input, Label, WrapperCard } from '../../../../shared/UI';
import cls from './step1.module.scss';
import { useStoreon } from 'storeon/react';

export const Step1 = ({
	handleNextStep,
	handleSetRegData,

}) => {
	const { regStep,regData, errorReg } = useStoreon('regStep','regData', 'errorReg')

	return <WrapperCard>
			<div className={cls.labels}>
				{/* <Icon src={icons.rightArrow} rotate={180}/> */}
				<div></div>
				<div className={cls.contLabel}>
					<Label p={11} text={'Регистрация через почту'} type={'gradient'} />
					<Label p={5} text={`${regStep} из 5`} />
				</div>
			</div>
			<div className={cls.cardBody}>
				<Input
					value={regData.email}
					onChange={(e) => handleSetRegData({email: e.target.value})}
					label={errorReg? errorReg : 'Почта'}
					error={errorReg}
					id={'mail'}
					className={cls.authInput}
					onEnter={() => (regData.email.includes('@') && regData.email.includes('.') && regData.email.length !== 0) && handleNextStep()}
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

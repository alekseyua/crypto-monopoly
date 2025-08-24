import { useState } from 'react';
import { Button, Input, Label, WrapperCard } from '../../../../shared/UI';
import cls from './Step2.module.css';
import { useStoreon } from 'storeon/react';

export const Step2 = ({
	handleNextStep,
	handlePrevStep,
	handleGetDublicateCode
}) => {
	const { regStep, regData, errorReg } = useStoreon('regStep', 'regData', 'errorReg')

	const [emailCode, setEmailCode] = useState('');
	// const codeInputRef = useMask({
	// 	mask: '_.__.__',
	// 	// replacement: { _: /\d/ },
	// 	replacement: { },
	// 	showMask: false,
	// });

	return (
		<WrapperCard>
			<div className={cls.labels}>
				<Label text={'Проверка почты'} type={'gradient'} />
				<Label text={`${regStep} из 6`} />
			</div>
			<div className={cls.cardBody}>
				<Input
					// ref={codeInputRef}
					value={emailCode}
					onChange={(value) => setEmailCode(value)}
					label={errorReg ? errorReg : `Код для проверки отправлен на указанный почтовый ящик  (${regData.email.slice(0,4)}***${regData.email.slice(-6,regData.email.length)})`}
					error={errorReg}
					id={'mail'}
					style={{
									padding: '24px 25px'
								}}
					iconRight={<div className={cls.dublicateCode} onClick={handleGetDublicateCode}>Дублировать код</div>}
				/>
				<div className={cls.btns}>
					<Button onClick={()=>handlePrevStep()}>Указать другую почту</Button>
					<Button
						onClick={() => handleNextStep({code: emailCode})}
						disabled={
							!emailCode
								? true
								: emailCode?.match(/\d/g)?.length
								? emailCode?.match(/\d/g)?.length < 5
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

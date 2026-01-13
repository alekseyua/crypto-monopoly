import { useState } from 'react';
import { Button, Input, Label, WrapperCard } from '../../../../shared/UI';
import cls from './Step6.module.scss';
import { useMask } from '@react-input/mask';
import { useStoreon } from 'storeon/react';

export const Step6 = ({handleSetRegData, handleRegistration}) => {
	const { dispatch, regStep,regData, errorReg } = useStoreon('regStep','regData', 'errorReg')

	const [emailCode, setEmailCode] = useState(null);
	const codeInputRef = useMask({
		mask: '_.__.__',
		replacement: { _: /\d/ },
		showMask: true,
	});

	return (
		<WrapperCard>
			<div className={cls.labels}>
				<Label text={'Вас пригласили?'} type={'gradient'} />
				<Label text={`${regStep} из 6`} />
			</div>
			<div className={cls.cardBody}>
				<Input
					value={regData.refFrend}
					onChange={(e) => handleSetRegData({refFrend: e.target.value})}
					placeholder={'Никнейм друга...'}
					label={errorReg? errorReg : `Если вас пригласил друг, вы можете указать его никнейм, а мы отблагодарим его!`}
					id={'refFrend'}
					style={{
									padding: '24px 25px'
								}}
				/>
				<div className={cls.btns}>
					<Button 
					p={24}
					onClick={handleRegistration}>Пропустить</Button>
					<Button
						p={24}
						type='fill'
						onClick={handleRegistration}
						disabled={!regData.refFrend.length>0}
						fillColor='#726CED'
						textColor='#fff'>
						Подвердить
					</Button>
				</div>
			</div>
		</WrapperCard>
	);
};

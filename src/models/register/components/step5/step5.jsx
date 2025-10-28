import { useEffect, useState } from 'react';
import { Button, Label, WrapperCard } from '../../../../shared/UI';
import cls from './step5.module.scss';
import { useStoreon } from 'storeon/react';
import ListSecureQuestion from './Components/ListSecureQuestion';
import { GET_SECURE_QUESTION, INC_REG_STEP } from '../../../../store/auth/registration';




export const Step5 = ({
	handleRegistration,
}) => {
	const { dispatch, regStep, secureQuestions, errorReg } = useStoreon('errorReg', 'regStep', 'secureQuestions');
	const [selectedAnswer, setSelectedAnswer] = useState('');
	const [isLockAddition, setIsLockAddition] = useState(false)
	const [isShowLine, setIsShowLine] = useState(true)
	useEffect(() => {
		dispatch(GET_SECURE_QUESTION)
	}, [dispatch]);

	const [ListSecureQuestions, setListSecureQuestions] = useState([])

	useEffect(() => {
		if (secureQuestions?.length) {
			setListSecureQuestions(secureQuestions?.map(el => ({ ...el, active: false, secret_answer: '', })))
		}
	}, [secureQuestions])

	const handleSelectSecureQuestion = (id) => {
		setIsLockAddition(true)
		setIsShowLine(false)
		setListSecureQuestions(state => state?.map(el => +el.id === +id ? { ...el, active: !el.active } : el).sort((a, b) => {
			if (a.id === id) return 1
			if (b.id === id) return -1
			return 0
		}))
	}

	const handleCancelSecureQuestion = (id, isAnswer) => {
		if (isAnswer){ 
			setIsLockAddition(false);
			setIsShowLine(true)
		}
		setListSecureQuestions(state => state?.map(el => +el.id === +id ? { ...el, active: false, secret_answer: '' } : el))
	}

	const handleSaveAnswer = (id, text) => {
		setListSecureQuestions(state => state?.map(el => (el.id === id ? { ...el, secret_answer: text } : el)))
		setSelectedAnswer('')
		setIsLockAddition(false)
		setIsShowLine(true)
	}
	return (
		<WrapperCard>
			<div className={cls.labels}>
				<Label text={'Секретные вопросы'} type={'gradient'} />
				<Label text={`${regStep} из 5`} type={'default'} />
			</div>
			<div className={cls.cardBody}>
				<Label type={'transparent'} text={errorReg ? errorReg : `Заполните секретные вопросы на выбор для восстановления акаунта в случае утери доступа`} 
					error={errorReg}
				/>
				{!!(3 - ListSecureQuestions.filter(el => el.active).length) && <Button variant='center'>{`Еще ${3 - ListSecureQuestions.filter(el => el.active).length} вопроса`}</Button>}
				<div className={cls.inputs}>
					<ListSecureQuestion
						list={ListSecureQuestions}
						isShowLine={isShowLine}
						isLockAddition={isLockAddition || ListSecureQuestions.filter(el => el.active && el.secret_answer !== '').length === 3}
						selectedAnswer={selectedAnswer}
						handleSaveAnswer={handleSaveAnswer}
						setSelectedAnswer={setSelectedAnswer}
						handleCancelSecureQuestion={handleCancelSecureQuestion}
						handleSelectSecureQuestion={handleSelectSecureQuestion}
					/>

				</div>
				<Button
					onClick={() => dispatch(INC_REG_STEP,{
						...ListSecureQuestions.filter(el => el.active && el.secret_answer !== '')?.map((el,i)=>({
							[`secret_question_${i+1}`]: el.question,
							[`secret_answer_${i+1}`]: el.secret_answer,
                            id: el.id
						})).reduce((acc, obj) => ({ ...acc, ...obj }), {}), 
						callbackReg: handleRegistration
					})}
					p={24}
					type='fill'
					fillColor='#726CED'
					textColor='#fff'
					disabled={
						ListSecureQuestions.filter(el => el.active && el.secret_answer !== '').length !== 3
					}>
					Далее
				</Button>
			</div>
		</WrapperCard>
	);
};

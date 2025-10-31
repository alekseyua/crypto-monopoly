import { QuestionDropdown } from '../../UI';
import cls from './Questions.module.scss';

export const Questions = ({
	questions
}) => {
	return (
		<div className={cls.Questions}>
			{
			questions?.map( (question, i) =>{
				return (
					<div key={i} className='quickGameQuestions'>
						{question.titleArticle && <h3 className={cls.title}>{question.titleArticle}</h3>}
						<div className={cls.questionsCont}>
							{
								question.list?.map( (q,i) => {
									return (
										<QuestionDropdown key={i} buttonText={q.title}>
											<div className={cls.question} dangerouslySetInnerHTML={{__html: q.answer}}/>
										</QuestionDropdown>
									)
								})
							}
						</div>
					</div>
				)
			})

			}
		</div>
	);
};
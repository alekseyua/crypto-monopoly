import { Button, Input, Offset } from '../../../../../shared/UI';
import cls from './list-questions.module.css';
import Line from '../../../../../shared/UI/Line/Line';
import BlockGrid from '../../../../../shared/UI/Block/BlockGrid';
import { Cross, crossBlack, IconSuccess, RightArrowIcon } from '../../../../../assets';
import Icon from '../../../../../shared/UI/Icon/Icon';

const ListSecureQuestion = ({ 
    list,
    isShowLine,
    isLockAddition,
    selectedAnswer,
    setSelectedAnswer,
    handleSaveAnswer,
    handleSelectSecureQuestion,
    handleCancelSecureQuestion,
 }) => {
    return (
        <div className={cls.containerListSecureQestion}>
            {
                list.filter(el => el.active)?.map((q, i) => {
                    return (
                        <BlockGrid
                            key={i}
                        >
                            <Button
                                type='fill--light'
                                fillColor='#726CED'
                                textColor='#fff'
                                style={{ height: '52.25px', cursor: 'unset' }}
                                // iconRight={<Cross className={cls.activeSecureQuestion} width={15} height={15} onClick={()=>handleCancelSecureQuestion(q.id)} />}
                                iconRight={<Icon src={Cross} className={cls.activeSecureQuestion} onClick={() => handleCancelSecureQuestion(q.id, q.secret_answer === '')} /> }
                            >
                                {q.question}
                            </Button>
                                {q.secret_answer === '' && 
                                <>
                                    <Offset mt={17} />
                                    <Line 
                                    direction={'horizontal'}
                                    />
                                    <Offset mt={17} />
                                <BlockGrid 
                                style={{ height: '52.25px' }}

                                >
                                    <Input 
                                    style={{ height: '52.25px',
									padding: '24px 25px'
                                     }}
                                    value={selectedAnswer}
                                    onChange={(e)=>setSelectedAnswer(e.target.value)}
                                    />
                                    <Button
                                        fillColor='#E9ECFF'
                                        // fillColor = 'transparent'
                                    onClick={() => setSelectedAnswer('')}
                                    style={{ 
                                        position: 'absolute', 
                                        right: 50,
                                        top: 12,
                                        width: 30,
                                        height: 30,
                                        padding: 0,
                                        cursor: 'pointer',
                                    }}
                                        textColor='#fff'
                                        iconRight={<Icon src={crossBlack} width={12} height={12} />}></Button>
                                     <Button
                                        fillColor='#E9ECFF'
                                        // fillColor = 'transparent'
                                    style={{ 
                                        position: 'absolute', 
                                        right: 10,
                                        top: 12,
                                        width: 30,
                                        height: 30,
                                        padding: 0,
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleSaveAnswer(q.id,selectedAnswer)}
                                    textColor='#fff'
                                        iconRight={<Icon src={IconSuccess} width={30} height={30} />}></Button>
                                    </BlockGrid>
                                    </>
                                    }
                        </BlockGrid>
                    )
                })
            }
            {isShowLine  && <Line />}
            {
                list.filter(el => !el.active)?.map((q, i) => {
                    return (
                        <Button
                            key={i}
                            onClick={() => handleSelectSecureQuestion(q.id)}
                            style={{
                                height: '52.25px',
                                pointerEvents: isLockAddition ?  'none' : 'all'
                            }}
                            type='fill--light'
                            fillColor='#E9ECFF'
                            textColor='#000'
                            iconRight={<Icon src={RightArrowIcon} width={15} height={15} />}
                        >
                            {q.question}
                        </Button>
                    )
                })
            }
        </div>
    )
}

export default ListSecureQuestion
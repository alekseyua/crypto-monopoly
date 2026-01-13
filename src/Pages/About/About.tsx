import React from 'react'
import RollDiceContainer from '../../shared/UI/RollDice/RoleDiceContainer';
import BlockWrapper from '../../shared/UI/Block/BlockWrapper';
import { useStoreon } from 'storeon/react';
import { SET_ROLL_DICE_QG } from '../../store/const';

const About:React.FC = () => {
  const {dispatch } = useStoreon();
  const getRandomNumber = () => {
    const num = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    return num;
  }
  return (
    <BlockWrapper>
      <h1>About project</h1>

    <div
      style={{
        width: 200,
        height: 100,
        position: "relative",
      }}
    >
      <RollDiceContainer 
        onClick={()=>{
            dispatch(SET_ROLL_DICE_QG, {
              rd1: getRandomNumber(),
              rd2: getRandomNumber(),
            });
            // setTimeout(()=>{
            //   dispatch(SET_ROLL_DICE_QG, {
            //     rd1: 0,
            //     rd2: 0,
            //   });
            // }, 2000)
        }}
        
      />
    </div>
        </BlockWrapper>
  );
}

export default About
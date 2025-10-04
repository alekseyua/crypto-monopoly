import React from 'react'
import RollDiceContainer from '../../shared/UI/RollDice/RoleDiceContainer';

const About:React.FC = () => {
  return (
    <div
      style={{
        width: 200,
        height: 100,
        position: "relative",
      }}
    >
      <RollDiceContainer 
        roleDice1={1}
        roleDice2={2}
        onClick={()=>{}}
      />
    </div>
  );
}

export default About
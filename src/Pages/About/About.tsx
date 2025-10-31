import React from 'react'
import RollDiceContainer from '../../shared/UI/RollDice/RoleDiceContainer';
import BlockWrapper from '../../shared/UI/Block/BlockWrapper';

const About:React.FC = () => {
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
        roleDice1={1}
        roleDice2={2}
        onClick={()=>{}}
      />
    </div>
        </BlockWrapper>
  );
}

export default About
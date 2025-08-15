import React from 'react'

interface IProps {
    handleChangeScreen: (newScreen: 'actions-card' | 'info-card') => void;
}

const ActionsCard:React.FC<IProps> = ({
    handleChangeScreen,
}:IProps) => {
  return (
    <div>ActionsCard</div>
  )
}

export default ActionsCard
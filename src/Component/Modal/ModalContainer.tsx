import React, { Children, CSSProperties } from 'react'
import Modal from './Modal'

interface IProps{
  children?: React.ReactNode;
  isShow: boolean;
  content?: string;
  handleBtnOk?: ()=>any;
  addClass?: any;
}
const ModalContainer:React.FC<IProps> = ({
  children,
  handleBtnOk,
  content,
  isShow,
  addClass,
}) => {

  if(children){
    return <Modal
    addClass={addClass}
    isShow={isShow}
    >
      {children}
    </Modal>
  }
  return (
    <Modal 
    addClass={addClass}
      isShow={isShow}
      content={content}
      handleBtnOk={handleBtnOk}
    />
  )
}

export default ModalContainer;
import React from 'react'
import Modal from './Modal'
import { useStoreon } from 'storeon/react';
import { SET_MODAL } from '../../store/modal/modal';

const ModalContainer:React.FC = () => {
  // Implement logic to handle modal state and interactions
  // Example: useState, useEffect, etc.
  // Render the Modal component based on the modal state
  // Example: return <Modal isOpen={isOpen} onClose={handleCloseModal} />
  const { modal, dispatch } = useStoreon('modal');

  const handleCloseModal = () => {
    dispatch(SET_MODAL, { isOpen: false})
  }

  if (!modal.isOpen) return;

  return (
    <Modal 
      isOpen={modal.isOpen}
      title={modal.title}
      onClose={handleCloseModal}
      content={modal.content}
      maxWidth={modal?.maxWidth ?? 'auto'}
    />
  )
}

export default ModalContainer
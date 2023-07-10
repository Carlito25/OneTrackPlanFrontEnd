import React from 'react'
import { Modal } from 'antd';

const ModalComponents = ({ title, isShownModal, modalContent, handleCancel, handleOk, okText, cancelText, closable, style }) => {


  return (
    <Modal 
    title={title} 
    open={isShownModal} 
    onOk={handleOk} 
    onCancel={handleCancel} 
    okText={okText} 
    cancelText={cancelText} 
    closable={closable}
    style={style}
    >
      {modalContent}
    </Modal>
  )
}

export default ModalComponents

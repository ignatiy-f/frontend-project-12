import React from 'react';
import { useSelector } from 'react-redux';
import getModal from './index';

const ModalComponent = () => {
  const modalType = useSelector(({ modals }) => modals.modalType);
  if (!modalType) {
    return null;
  }
  const Component = getModal(modalType);
  return <Component />;
};

export default ModalComponent;
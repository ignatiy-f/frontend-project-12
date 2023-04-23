import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { actions } from '../../slices/modalSlice';
import socket from '../../socket';

const RemoveModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const id = useSelector(({ modals }) => modals.handledChannelId);
  const [isSubmitting, setSubmitting] = useState(false);
  const submit = () => {
    setSubmitting(true);
    socket.emit('removeChannel', { id }, (response) => {
      console.log(response.status);
      setSubmitting(false);
    });
    toast.success(t('toastify.remove'));
    dispatch(actions.setModalType(null));
  };

  return (
    <Modal centered show onHide={() => dispatch(actions.setModalType(null))}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('modal.remove')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modal.removeConfirm')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={() => dispatch(actions.setModalType(null))}>{t('modal.btnCancel')}</Button>
          <Button variant="danger" disabled={isSubmitting} onClick={submit}>{t('modal.btnRemove')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveModal;
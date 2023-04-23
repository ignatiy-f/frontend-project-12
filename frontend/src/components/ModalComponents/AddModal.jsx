import React, { useEffect, useRef, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { actions as modalActions } from '../../slices/modalSlice';
import { actions as channelsActions } from '../../slices/channelsSlice';
import socket from '../../socket';

const AddModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channelsNames = useSelector(({ channels }) => channels.channelsList)
    .map(({ name }) => name);
  const [isSubmitting, setSubmitting] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup.string().notOneOf(channelsNames, t('errors.unique')).required(t('errors.required')),
    }),
    onSubmit: ({ name }) => {
      setSubmitting(true);
      socket.emit('newChannel', { name }, (response) => {
        const { status, data } = response;
        console.log(status);
        dispatch(channelsActions.setCurChannelId(data.id));
        setSubmitting(false);
      });
      toast.success(t('toastify.add'));
      dispatch(modalActions.setModalType(null));
    },
  });
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal centered show onHide={() => dispatch(modalActions.setModalType(null))}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('modal.add')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="name">
            <Form.Control
              required
              name="name"
              ref={inputRef}
              value={formik.values.name}
              className="mb-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.name && formik.errors.name}
            />
            <Form.Label className="visually-hidden">{t('modal.channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={() => dispatch(modalActions.setModalType(null))}>{t('modal.btnCancel')}</Button>
              <Button type="submit" disabled={isSubmitting}>{t('modal.btnSubmit')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
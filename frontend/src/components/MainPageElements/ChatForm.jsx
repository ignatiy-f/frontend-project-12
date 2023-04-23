import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import socket from '../../socket';

const ChatForm = () => {
  const { t } = useTranslation();
  const curChannelId = useSelector(({ channels }) => channels.curChannelId);
  const username = localStorage.getItem('username');
  const [isSubmitting, setSubmitting] = useState(false);
  const formik = useFormik({ // Разобраться с рамкой вокруг кнопки когда она заблокирована
    initialValues: {
      body: '',
    },
    validationSchema: yup.object({
      body: yup.string().required(),
    }),
    onSubmit: ({ body }, { resetForm }) => {
      setSubmitting(true);
      socket.emit('newMessage', { body, channelId: curChannelId, username }, (response) => {
        console.log(response.status);
        setSubmitting(false);
      });
      resetForm();
    },
  });
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="mt-auto px-5 py-3">
      <Form
        noValidate
        className="py-1 border rounded-2"
        onSubmit={formik.handleSubmit}
      >
        <InputGroup>
          <Form.Control
            ref={inputRef}
            className="border-0 p-0 ps-2"
            name="body"
            placeholder={t('main.chat')}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.body}
            aria-label="Новое сообщение"
          />
          <Button
            type="submit"
            className="btn-group-vertical"
            variant=""
            disabled={isSubmitting}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
            </svg>
            <span className="visually-hidden">Отправить</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default ChatForm;
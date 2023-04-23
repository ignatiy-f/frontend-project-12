import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import {
  Form, FloatingLabel, Button, Container, Row, Col, Card, Image,
} from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import routes from '../../routes';
import Header from '../../Header';

const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [error409, setError] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      username: yup.string().min(3, t('errors.min3Max20')).max(20, t('errors.min3Max20')).required(t('errors.required')),
      password: yup.string().min(6, t('errors.min6')).required(t('errors.required')),
      confirmPassword: yup.string().oneOf([yup.ref('password')], t('errors.password')),
    }),
    onSubmit: async ({ username, password }) => {
      try {
        setSubmitting(true);
        const { data } = await axios.post(routes.signUpPath(), { username, password });
        localStorage.setItem('userId', data.token);
        localStorage.setItem('username', data.username);
        setSubmitting(false);
        setError(false);
        navigate('/');
      } catch (err) {
        setSubmitting(false);
        console.error(err.message);
        if (err.response.status === 409) {
          setError(true);
        }
        if (err.message === 'Network Error') {
          toast.error(t('toastify.error'));
        }
      }
    },
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <Container className="h-100" fluid>
        <Header />
        <Row className="justify-content-center align-content-center h-100">
          <Col xs={12} md={8} xxl={6}>
            <Card className="shadow-sm">
              <Card.Body as={Row} className="p-5">
                <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                </Col>
                <Col as={Form} xs={12} md={6} className="mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                  <h1 className="text-center mb-4">{t('register.title')}</h1>
                  <FloatingLabel
                    controlId="username"
                    label={t('register.username')}
                    className="mb-3"
                  >
                    <Form.Control
                      required
                      ref={inputRef}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      name="username"
                      placeholder={t('register.username')}
                      isInvalid={formik.errors.username || error409}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.username}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="password"
                    label={t('register.password')}
                    className="mb-4"
                  >
                    <Form.Control
                      required
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      name="password"
                      type="password"
                      placeholder={t('register.password')}
                      isInvalid={(formik.errors.password && formik.touched.password) || error409}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.password}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="confirmPassword"
                    label={t('register.confirmPassword')}
                    className="mb-4"
                  >
                    <Form.Control
                      required
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                      name="confirmPassword"
                      type="password"
                      placeholder={t('register.confirmPassword')}
                      isInvalid={formik.errors.confirmPassword || error409}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.confirmPassword || t('errors.registerError')}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  <Button
                    type="submit"
                    className="w-100 mb-3"
                    variant="outline-primary"
                    disabled={isSubmitting}
                  >
                    {t('register.btn')}
                  </Button>
                </Col>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterPage;
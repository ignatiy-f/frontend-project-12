import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Header from '../../Header';

const NotFound = () => {
  const { t } = useTranslation();
  return (

        <div className="d-flex flex-column h-100">
            <Header />
            <div className="text-center">
                <h1 className="display-1 fw-bold">{'404'}</h1>
                <p className="fs-3">
                  {t('notFound.title')}
                </p>
                <p className="text-muted">
                  {t('notFound.footerFirst')}
                </p>
                <Link to="/">{t('notFound.footerSecond')}</Link>
            </div>
        </div>

  );
};

export default NotFound;
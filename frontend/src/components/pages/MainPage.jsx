import React from 'react';
import { Link } from 'react-router-dom';


const MainPage = () => {
  return (

        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-1 fw-bold">{'Main'}</h1>
                <p className="fs-3"> <span className="text-danger">{'Main page!'}</span> Page not found.</p>
                <a href="index.html" className="btn btn-primary">Go Home</a>
            </div>
        </div>

  );
};

export default MainPage;
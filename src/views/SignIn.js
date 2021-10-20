import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'reactstrap';
import { signInUser } from '../api/auth';
import googleLogImg from '../assets/googleLogImg.png';

export default function SignIn({ user }) {
  return (
    <>
      {user === null ? (<Spinner className="loading" style={{ width: '3rem', height: '3rem' }} />) : (
        <div className="text-center mt-5 login-container">
          <h1>Welcome! Sign In!</h1>
          <div className="login-btn-container">
            <button type="button" className="login-btn" onClick={signInUser}>
              <img src={googleLogImg} alt="Google" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

SignIn.defaultProps = {
  user: null,
};

SignIn.propTypes = {
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({
    fullName: PropTypes.string,
    profileImage: PropTypes.string,
    uid: PropTypes.string,
    user: PropTypes.string,
  })]),
};

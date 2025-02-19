// VerifyEmail.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/verify-email/${token}/`);
        setMessage(response.data.message);
      } catch (error) {
        setMessage('Email verification failed. Please try again.');
      }
    };

    verifyEmail();
  }, [token]);

  return <div>{message}</div>;
};

export default VerifyEmail;

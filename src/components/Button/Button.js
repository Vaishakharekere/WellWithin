import React, { use } from 'react';
import './Button.css';
import { useNavigate } from 'react-router-dom';

const Button = ({content,func}) => {
  const navigate = useNavigate();
  return (
    <div className='button' onClick={func}>
        {content}
    </div>
  )
}

export default Button
import React from 'react';
import './Button.scss';

const Button = (props) => {

  return (
    <div className={props.btnStyle} onClick={ () => props.onBtnClick() }>
      <span className='label w-500 fs-16 white'>{props.btnText}</span>
    </div>
  )
}

export default Button
import React from 'react';
import './Button.scss';

interface ButtonProps {
  btnStyle: string;
  btnText: string;
  onBtnClick: () => void
}

const Button: React.FC<ButtonProps> = ({btnStyle, btnText, onBtnClick}) => {

  return (
    <div className={btnStyle} onClick={ () => onBtnClick() }>
      <span className='label w-500 fs-16 white'>{btnText}</span>
    </div>
  )
}

export default Button
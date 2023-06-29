import { ButtonProps } from '../types';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { button } from '../assets/styles';
const Button = ({
  isDisabled,
  btnType,
  title,
  handleClick,
  styling,
}: ButtonProps) => {
  const dynamicStyles = css`
    ${styling}
  `;
  return (
    <button
      css={[button, dynamicStyles]}
      disabled={isDisabled}
      type={btnType || 'button'}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Button;

/** @jsxImportSource @emotion/react */

import { loadingSpinner, loadingSpinnerContainer } from '../assets/styles';

const Loading = () => {
  return (
    <div css={loadingSpinnerContainer}>
      <svg css={loadingSpinner} viewBox='0 0 50 50'>
        <circle cx='25' cy='25' r='20' fill='none' strokeWidth='5'></circle>
      </svg>
    </div>
  );
};

export default Loading;

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

import { ModalProps } from '../types';

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const container = css({
    display: 'flex',
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  });
  const child1 = css({
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: 0.2,
  });

  const contentWrapper = css({
    zIndex: 10,
    width: '100%',
    margin: '0 5px',
  });

  const content = css({
    backgroundColor: '#ffffff',
    width: '100%',
    borderRadius: '0.5rem',
    boxShadow:
      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  });

  return (
    <div css={container}>
      <div css={child1} onClick={onClose}></div>
      <div onClick={handleContentClick} css={contentWrapper}>
        <div css={content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;

/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { mq } from '../utils/mediaQuery';

export const container = css`
  display: flex;
  flex-direction: column;
  font-family: Poppins;
  width: 100%;
  color: white;
`;

export const navbarStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 1rem;
  height: 60px;
  position: relative;

  ${mq[1]} {
    // color: green;
  }
`;

export const titleApp = css`
  font-size: 1.2rem;
  font-weight: 600;

  & > a {
    text-decoration: none;
    color: white;
  }
`;

export const burgers = css`
  display: block;
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

export const dropdownMenu = css`
  position: absolute;
  z-index: 10;
  top: 60px;
  left: 0;
  right: 0;

  & > ul {
    flex-direction: column;
    height: fit-content;
    list-style-type: none;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(2px);
    padding: 1.5rem;
    border-radius: 1rem;
    height: fit-content;
    position: relative;

    & > li a {
      display: flex;
      text-decoration: none;
      text-align: left;
      color: white;
      width: 100%;
      padding: 0.2rem 0.5rem;
      margin-bottom: 1rem;

      &:hover {
        background-color: #5ab9c7;
        border-radius: 2px;
      }
    }

    & > li:last-child a {
      margin-bottom: 0;
    }

    & > span {
      position: absolute;
      bottom: 0;
      font-size: 10px;
      font-weight: 600;
      left: 50%;
      transform: translateX(-50%);
      color: #5ab9c7;
    }
  }
`;

export const searchBarContainer = css`
  display: flex;
  flex-direction: row;
  padding: 0 1rem;

  & > span {
    display: block;
    width: 20px;
    height: 20px;
    background-color: #2d3240;
    border-radius: 9999px;
    padding: 0.5rem;
    color: white;
    margin-left: 5px;
  }
`;

export const searchBar = css`
  width: 100%;
  display: flex;
  position: relative;

  & > span {
    display: block;
    position: absolute;
    width: 20px;
    height: 20px;
    color: white;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }

  & > input {
    width: 100%;
    padding: 0.5rem;
    background-color: #2d3240;
    outline-style: none;
    border: 0;
    padding-left: 2.3rem;
    padding-right: 1rem;
    border-radius: 1rem;
    color: white;
  }
`;

export const animeCardContainer = css`
  margin-top: 1rem;
  padding: 1rem;
`;

export const animeCard = css`
  display: flex;
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  margin-bottom: 1.5rem;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  & > div {
    position: absolute;
    bottom: 5px;
    left: 5px;
    right: 5px;
    padding: 0 0.3rem;
    display: flex;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(8px);
    border-radius: 1.2rem;
    font-size: 12px;
    color: white;
    text-align: center;
  }
`;

export const button = css`
  background-color: rgb(88, 186, 199, 0.5);
  border: 1px solid #5ab9c7;
  color: white;
  padding: 0.5rem 1rem;
  margin: 0 1rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 14px;
  margin-top: 1rem;
  font-family: Poppins;

  &: hover {
    background-color: rgb(88, 186, 199, 1);
  }
`;

export const footer = css`
  display: flex;
  color: white;
  padding: 1rem;
  border-top: 1px solid black;
  margin-top: 1rem;

  ${mq[1]} {
    text-align: center;
    & > div {
      width: 100%;
    }
  }

  & > div > h1 {
    margin: 0;
  }
  & > div > p {
    font-size: 12px;
    font-weight: 300;
    text-align: justify;

    ${mq[1]} {
      font-size: 18px;
      text-align: center;
    }
  }
  & > div > ul {
    display: flex;
    flex-direction: row;
    justify-content: start;
    list-style-type: none;
    padding: 0;

    ${mq[1]} {
      justify-content: center;
    }

    & > li {
      width: 25px;
      height: 25px;
      margin-left: 0.5rem;
      background-color: #2c2c2c;
      padding: 0.5rem;
      border-radius: 0.5rem;

      &:first-of-type {
        margin-left: 0px;
      }

      &:hover {
        background-color: #5ab9c7;
      }

      & > svg {
        fill: white;
      }
    }
  }

  & > div > span {
    font-size: 12px;
    font-weight: 400;
  }
`;

export const animeDetailContainer = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: Poppins;
`;
export const coverImage = (src: string) => css`
  flex: 1;
  background-image: url('${src}');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const floatingContent = (floatingDivExpanded: boolean) => css`
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(6px);
  color: #fff;
  padding: 1rem 0.8rem;
  border-radius: 1.5rem 1.5rem 0 0;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${floatingDivExpanded ? '50vh' : '16vh'};
  transition: height 0.3s ease-out;
  font-family: Poppins;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  ${floatingDivExpanded ? 'overflow-y: scroll;' : ''}

  & > h1 {
    font-size: 1.5rem;
    margin: 0;
    text-align: center;
  }

  & > div > span {
    font-size: 12px;
    font-weight: 300;

    &:nth-of-type(2) {
      margin: 0 0.5rem;
    }
  }

  & > summary {
    display: flex;
    justify-content: space-between;
    border: 0.5px solid rgb(255, 255, 255, 0.3);
    width: 100%;
    border-radius: 1rem;
    padding: 0.5rem 0;

    & > div {
      display: flex;
      flex-direction: column;
      align-items: center;

      &:first-of-type {
        margin-left: 1rem;
      }

      &:last-child {
        margin-right: 1rem;
      }

      & > span:first-of-type {
        display: block;
        width: 20px;
        height: 20px;
      }

      & > span:last-child {
        font-size: 12px;
        font-weight: 300;
      }
    }
  }

  & > p {
    font-size: 12px;
    font-weight: 300;
    text-align: justify;
  }
`;

export const genres = css`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  row-gap:1rem;
  width: 100%;
  margin-top:1rem;

  & > div {
    text-align: center;
    font-size: 10px;
    font-weight; 400;
    padding: 0.4rem;
    background-color: rgb(88,186,199, 0.5);
    border-radius: 0.3rem;
    margin-right:0.3rem;

    &:last-child {
      margin-right: 0
    }
  }
  
`;

export const inCollection = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1rem;

  & > h1 {
    font-size: 1rem;
    font-weight: 400;
    margin: 0;
  }

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  & > div > div > a {
    text-decoration: none;
    color: white;
    font-size: 10px;
    font-weight: 400;
    padding: 0.4rem;
    background-color: rgb(88, 186, 199, 0.5);
    border-radius: 0.3rem;
  }

  & > div > p {
    margin: 0 0.5rem 0 0;
    font-size: 10px;
    font-weight: 400;
    max-width: 80%;
  }

  & > div > span {
    display: block;
    width: 20px;
    height: 20px;
    padding: 0.2rem;
    background-color: rgb(88, 186, 199, 0.5);
    border: 1px solid #5ab9c7;
    margin-left: 0.2rem;
    border-radius: 9999px;
  }
`;

export const collectionListContainer = css`
  display: flex;
  flex-direction: column;
  color: white;
  min-height: 80vh;
  padding: 0.5rem;

  & > div {
    background-color: white;
    margin: 0.5rem;
    border-radius: 0.3rem;
    display: flex;
    flex-direction: row;
    padding: 0.5rem;

    & > div {
      width: 30%;
      overflow: hidden;
      border-radius: 0.2rem;

      & > img {
        width: 100%;
        height: 100%;
        background-size: cover;
      }
    }

    & > div:last-child {
      width: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
      margin-left: 1rem;

      & > h1 {
        font-size: 1.2rem;
        font-weight: 400;
        color: black;
        text-decoration: none;
        margin: 0;
        width: 90%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      & > div {
        display: flex;
        height: 50%;
        align-items: end;
      }

      & > a {
        display: block;
        width: 20px;
        height: 20px;
        position: absolute;
        top: 0;
        right: 0;

        & > span > svg {
          stroke: black;
        }
      }
    }
  }

  & > p {
    font-weight: 400;
    padding: 0.5rem;
  }
`;

export const collectionDetail = css`
  padding: 1rem;
  display: flex;
  flex-direction: column;

  & > div {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  & > div > div {
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.4rem;
    color: black;
    position: relative;
    margin-bottom: 1rem;

    & > h2 {
      margin: 0.5rem 0;
      padding: 0;
    }

    & > a {
      display: block;
      width: 30px;
      height: 30px;
      position: absolute;
      top: 5px;
      right: 5px;

      & > span > svg {
        stroke: black;
      }
    }
  }
`;

export const popupCollection = css`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  color: black;

  & > h1 {
    margin: 0 0 0.5rem 0;
    padding: 0;
    font-size: 1.5rem;
    font-weight: 700;
  }

  & > div {
    width: 100%;
  }

  & > div > input {
    outline: none;
    border: 1px solid #5ab9c7;
    padding: 0.5rem;
    border-radius: 0.4rem;
  }

  & > div:last-child {
    display: grid;
    row-gap: 1rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));

    & > span {
      text-align: center;
      margin-right: 0.5rem;
      background-color: #5ab9c7;
      padding: 0.2rem;
      border-radius: 0.2rem;
      color: white;
      font-weight: 500;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`;

export const loadingSpinnerContainer = css`
  width: 100%;
  height: 100vh;
  position: relative;
`;

export const loadingSpinner = css`
  animation: ${rotate} 2s linear infinite;
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
  width: 50px;
  height: 50px;

  & > circle {
    stroke: #5ab9c7;
    stroke-linecap: round;
    animation: ${dash} 1.5s ease-in-out infinite;
  }

  & > svg {
    fill: red;
  }
`;

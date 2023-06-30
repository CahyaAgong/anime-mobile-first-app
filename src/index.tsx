import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/client';
import client from './config/apollo';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const basename = 'https://cahyaagong.github.io/anime-mobile-first-app';

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App basename={basename} />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// import './assets/font.css';

import { BrowserRouter, Route, Routes, HashRouter } from 'react-router-dom';
import { AnimeList, AnimeDetail, Collection, CollectionDetail } from './pages';

function App() {
  const basename = process.env.REACT_APP_BASENAME || '';

  return (
    //<BrowserRouter basename={basename}>
    <HashRouter>
      <Routes>
        <Route path='/' element={<AnimeList />} />
        <Route path='/anime/:id' element={<AnimeDetail />} />
        <Route path='/collections' element={<Collection />} />
        <Route path='/collections/:name' element={<CollectionDetail />} />
      </Routes>
    </HashRouter>
    //</BrowserRouter>
  );
}

export default App;

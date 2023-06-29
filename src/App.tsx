import './assets/font.css';

import { HashRouter, Route, Routes } from 'react-router-dom';
import { AnimeList, AnimeDetail, Collection, CollectionDetail } from './pages';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<AnimeList />} />
        <Route path='/anime/:id' element={<AnimeDetail />} />
        <Route path='/collections' element={<Collection />} />
        <Route path='/collections/:name' element={<CollectionDetail />} />
      </Routes>
    </HashRouter>
  );
}

export default App;

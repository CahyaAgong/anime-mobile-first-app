import './assets/font.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AnimeList, AnimeDetail, Collection, CollectionDetail } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AnimeList />} />
        <Route path='/anime/:id' element={<AnimeDetail />} />
        <Route path='/collections' element={<Collection />} />
        <Route path='/collections/:name' element={<CollectionDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
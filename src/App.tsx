import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LensResultPage from './pages/LensResultPage';
import '../src/styles/global.scss';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lens-result" element={<LensResultPage />} />
        {/* More routes later */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

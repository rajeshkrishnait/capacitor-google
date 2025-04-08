import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
// import LensResultPage from './pages/LensResultPage';
import '../src/styles/global.scss';
import { ThemeProvider } from './context/ThemeProvider.tsx';
import SearchResult from './pages/SearchResult.tsx';
function App() {
  return (
    <ThemeProvider>  
    <BrowserRouter>
      <Routes>
        <Route path="/capacitor-google" element={<HomePage />} />
        <Route path="/search-result" element={<SearchResult />} />
        {/* More routes later */}
      </Routes>

    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

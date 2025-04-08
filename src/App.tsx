import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
// import LensResultPage from './pages/LensResultPage';
import '../src/styles/global.scss';
import { ThemeProvider } from './context/ThemeProvider.tsx';
function App() {
  return (
    <ThemeProvider>  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/lens-result" element={<LensResultPage />} /> */}
        {/* More routes later */}
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Submit from './Submit';
import Search from './Search';
import topoBg from './assets/topography.svg'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Submit />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
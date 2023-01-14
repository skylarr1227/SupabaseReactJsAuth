import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Login from "./pages/login";
import Success from "./pages/success";
import Register from "./pages/register";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/success' element={<Success />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;

import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/users/Login';
import Fecore from './components/Fecore';
import Jobs from './features/core/Jobs';
import Notes from './features/core/Notes';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
      </Route>
      <Route path="fecore" element={<Layout />}>
        <Route index element={<Fecore />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="notes" element={<Notes />} />
      </Route>
    </Routes>
  );
}

export default App;

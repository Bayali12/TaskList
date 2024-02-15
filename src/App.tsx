import { Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout';
import { NotFound } from './pages/NotFound';
import { Home } from './pages/Home';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

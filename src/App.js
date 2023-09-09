import React from 'react';
import CharsList from "./pages/charsList";
import CharacterPage from "./pages/CharacterPage";
import { Provider } from 'react-redux';
import store from './redux/store';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  
  return (
  <Provider store={store}>

    <Router>
      <Routes>
        <Route path="/" element={<CharsList />} />
        <Route path="/character/:id" element={<CharacterPage />} />
      </Routes>
    </Router>
    </Provider>

  );
}

export default App;
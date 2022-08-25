import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Base from './components/Base';
import Landing from './components/Landing';
import General from './components/General';
import Default from './components/Default';
import Organisation from './components/Organisation';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Base />}>
          <Route path="/" element={<Landing />} />
          <Route path="general" element={<General />}>
          </Route>
          <Route
            path="organisation/:orgId"
            element={<Organisation />}
          />
          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
              routes for. */}
          <Route path="*" element={<Default />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

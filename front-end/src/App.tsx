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
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import Success from './components/Success';
import Cancel from './components/Cancel';

function App() {
  return (
    <PayPalScriptProvider options={
      { "client-id": "ATT3Tn46NrmHggGqVC4mzWOZWlnbp2ID9DA0yQnhsgqPFIVPPlLhfSI_-atbZc3aN7n_k7wUVTyQJMnI",
      "currency":"AUD",
     }
     }>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Base />}>
            <Route path="/" element={<Landing />} />
            <Route path="general" element={<General />} />
            <Route path="success" element={<Success />} />
            <Route
              path="organisation/:orgId"
              element={<Organisation />}
            />
            <Route
              path="cancel/:orgId"
              element={<Cancel />}
            />
            {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
              routes for. */}
            <Route path="*" element={<Default />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PayPalScriptProvider>
  );
}

export default App;

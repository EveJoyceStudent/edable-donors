import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Base from "./components/Base";
import Landing from "./components/Landing/Landing";
import Volunteer from "./components/Volunteer/Volunteer";
import Default from "./components/Default";
import Organisation from "./components/Organisation/Organisation";
import ItemPage from "./components/Item/ItemPage";
import Success from "./components/DonorForm/Success";
import Cancel from "./components/DonorForm/Cancel";
import PastDonations from "./components/DonorForm/PastDonations";
import PastItemDonations from "./components/DonorForm/PastItemDonations";
import DonateTime from "./components/Volunteer/DonateTime";
import TaskPage from "./components/Volunteer/TaskPage";

function App() {
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
        process.env.REACT_APP_PAYPAL_CLIENT_ID||"ATT3Tn46NrmHggGqVC4mzWOZWlnbp2ID9DA0yQnhsgqPFIVPPlLhfSI_-atbZc3aN7n_k7wUVTyQJMnI",
        currency: "AUD",
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Base />}>
            <Route path="/" element={<Landing />} />
            <Route path="volunteer" element={<Volunteer />} />
            <Route path="success" element={<Success />} />
            <Route path="organisation/:orgId" element={<Organisation />} />
            <Route path="cancel/:orgId" element={<Cancel />} />
            <Route path="organisation/:orgId" element={<PastDonations />} />
            <Route path="item/:orgID/:itemID" element={<ItemPage />} />
            <Route path="item/:orgID/:itemID" element={<PastItemDonations />} />
            <Route path="volunteer/organisation/:orgId" element={<DonateTime />} />
            <Route path="volunteer/task-page" element={<TaskPage />} />

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

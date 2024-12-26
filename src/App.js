import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Components/layout/layout.jsx';
import Home from './Components/Home/home.jsx';
import Blogs from './Components/Blogs/Blogs.jsx';
import Contact from './Components/Contact/contact.jsx';
import TermsAndCondition from './Components/Terms-and-Condition/Terms_and_Condition.jsx';
import PrivacyPolicy from './Components/Privacy-Policy/Privacy_Policy.jsx';

function App() {
  return (
    <div className="App App-header">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route Contact element={<Contact />} />
            <Route Blogs element={<Blogs />} />
            <Route TermsAndCondition element={<TermsAndCondition />} />
            <Route PrivacyPolicy element={<PrivacyPolicy />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

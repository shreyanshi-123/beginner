import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Components/layout/layout.jsx';
import Home from './Components/Home/home.jsx';
import Blogs from './Components/Blogs/Blogs.jsx';
import Contact from './Components/Contact/contact.jsx';
import TermsAndCondition from './Components/Terms-and-Condition/Terms_and_Condition.jsx';
import PrivacyPolicy from './Components/Privacy-Policy/Privacy_Policy.jsx';
import List from './Components/listOfUsers/listofusers.js';
import BlogList from './Components/BlogListing/blogList.jsx';
import AddBlog from './Components/AddBlogs/addBlogs.jsx';
import SignIn from './Components/layout/sign-in.jsx';

function App() {
  return (
    <div className="App App-header">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/Contact' element={<Contact />} />
            <Route path='/Blogs' element={<Blogs />} />
            <Route path='/TermsAndCondition' element={<TermsAndCondition />} />
            <Route path='/PrivacyPolicy' element={<PrivacyPolicy />} />
            <Route path='/UsersList' element={<List />} />
           <Route path='/blogslist' element={<BlogList/>}/>
           <Route path='/BlogsCorner' element={<AddBlog/>}/>
           <Route path='/SignIn' element={<SignIn/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

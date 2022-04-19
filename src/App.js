// import Router from './Router';
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.css';
import Form from './component/Form';
import Blog from './component/Blog';

const App = () => (
  <>
    <BrowserRouter>
      {/* <Header/>
      <Routes>
        <Route exact path="/" element={<Home />}>
        </Route>
      </Routes> */}
      <div className="overflow-hidden">
        <Routes>
          <Route exact path="/" element={<Form />} />
          <Route path="/posts" element={<Blog />} />
        </Routes>
      </div>
    </BrowserRouter>
  </>
);

export default App;

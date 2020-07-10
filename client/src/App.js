import React from 'react';
import 'antd/dist/antd.css';
import Nav from './components/views/Nav/Nav';
import LoginPage from './components/views/LoginPage/LoginPage';
import LandingPage from './components/views/LandingPage/LandingPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import UploadProductPage from './components/views/UploadProductPage/UploadProductPage';
import ProductPage from './components/views/ProductPage/ProductPage';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from './hoc/auth';

function App() {
  return (
    <Router>
      <Nav/>
      <div>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)}/>
          <Route exact path="/login" component={Auth(LoginPage, false)}/>
          <Route exact path="/register" component={Auth(RegisterPage, false)}/>
          <Route exact path="/product/upload" component={Auth(UploadProductPage, true)} />
          <Route exact path="/product/:productId" component={Auth(ProductPage, null)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

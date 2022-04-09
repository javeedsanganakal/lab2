import React from "react"
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Category from "./Category";
import Welcome from "./Welcome";
import Body from "./Body";
import Home from "./Home";
import Contact from "./Contact";
import Footer from "./components/Footer";
import Login from "./Login";
import Register from "./Register";
import ProfileDashboard from "./components/ProfileDashboard";
import ItemsData from "./Data.json";


function App() {
  
  return (
    <Router> 
      <div className="app">
        
        <Switch className="">
          <Route path="/checkout">
            <h1>
              Checkout Page
            </h1>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/Register">
            <Register/>
          </Route>
          <Route path="/ProfileDashboard">
            <ProfileDashboard/>
          </Route>

          {/* This is an default page i.e., http://localhost:3000/*/}
          <Route path="/">
            <Header data={ItemsData}/>
            <Category/>
            <Welcome/>
            <Body/>
            <Home/>
            <Contact/>
            <Footer/>
          </Route>
        </Switch>
        
      </div>

    </Router>
  );
}
export default App;

import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import './App.scss';
import { customReactTheme } from './assets/custom-theme';

import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import LoginPage from './pages/login/login.pages';
import HomePage from './pages/home/home.pages';

import { userData } from './tools/user-data.tools';
import { tokenName } from './assets/config';

function App() {
  const [ data, setData ] = useState(JSON.parse(sessionStorage.getItem(tokenName)));
  const [ token, setToken ] = useState(localStorage.getItem(tokenName));
  const [reloadUserData, setReloadUserData] = useState(false);
  const [darkMode, setDarkMode] = useState(data?.profile?.darkMode ? data.profile.darkMode : false);
  const [theme, setTheme] = useState(customReactTheme(darkMode));
  const [currentHomeDisplay, setCurrentHomeDisplay] = useState('home');

  useEffect((data, token) => {
    try {
      if((token && !data) || reloadUserData) {
        const fetchUserData = async () => { 
          const newSessionData = await userData();
          if(newSessionData.statusCode === 500) {
            localStorage.removeItem(tokenName);
            setToken(null);
            window.location.reload();
          }
          setData(JSON.parse(newSessionData.data));
          setReloadUserData(false);
        }
        fetchUserData();
      }
    } catch (err) {
      console.log('There was and error fetching new user data: ', err);
    }
  }, [ reloadUserData ]);

  useEffect(() => { if((token && !data)) { setReloadUserData(true) }}, []);

  useEffect(() => { setTheme(customReactTheme(darkMode)) }, [ darkMode ]);


  const Loading = () => {
    return (
      <div className='spinnerDiv'>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  }

  const header = () => {
    if(token && data) {
      return (
        <Header 
            currentHomeDisplay={currentHomeDisplay}
            setCurrentHomeDisplay={setCurrentHomeDisplay}
          />
      );
    }
  }

  const routes = () => {
    if(token && !data) {
      return (
        <Routes>
          <Route 
            path="/" 
            element={<Loading />} 
          />
        </Routes>
      );
    } else if(token && data){
      return (
        <Routes>
          <Route 
            path="/" 
            element={
            <HomePage 
              data={data}
              setReloadUserData={setReloadUserData}
              currentHomeDisplay={currentHomeDisplay}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
            }
          />
        </Routes>
      );
    } else {
      return (
        <Routes>
          <Route 
            path="/" 
            element={<LoginPage />} 
          />
        </Routes>
      );
    }
  }

  return (
    <div className="App">
      <style type="text/css">{ theme }</style>
      {header()}
      <BrowserRouter>
        { routes() }
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
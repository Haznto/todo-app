import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SettingPage from './Components/SettingsPage/SettingPage';
import Todo from './Components/Todo';
import AppHeader from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import './App.scss'
import Settings from './Components/Context/Settings/Settings';
import ListsSaver from './Components/Context/ListOfData/ListOfData';
import LoginProvider from './Components/Context/LoginContext/LoginContext';
// import { When } from 'react-if';

export default function App() {
  // const {loginData} = useContext(LoginContext)
  return (
    <BrowserRouter>
      <LoginProvider>
        <Settings>
          <ListsSaver>
            <AppHeader />

            <Routes>
              <Route path='/' element={<Todo />} />
              <Route path='/settings' element={<SettingPage />} />
            </Routes>
            <Footer />
          </ListsSaver>
        </Settings>
      </LoginProvider>
    </BrowserRouter>
  );
}


import React, { useEffect }from 'react';
import { BrowserRouter, Routes , Route, Navigate } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import {Navbar, Footer ,Sidebar, ThemeSettings } from './components';
import { WebPosts , Campaign, ResidenceData, 
        Volunteers, Todolist, Editor, ReceiveEmails, Login, Home, Signup } from './pages';

import { useStateContext } from './contexts/ContextProvider';    
import { useAuthContext } from './hook/useAuthContext'

import './App.css'

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  const { admin } = useAuthContext()

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);
  
  return (  
      <div className={currentMode === 'Dark' ? 'dark' : ''}>
        <BrowserRouter>
          <div className="flex relative dark:bg-main-dark-bg">
            <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
              <TooltipComponent
                content="Settings"
                position="Top"
              >
                <button
                  type="button"
                  onClick={() => setThemeSettings(true)}
                  style={{ background: currentColor, borderRadius: '50%' }}
                  className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                >
                  <FiSettings />
                </button>

              </TooltipComponent>
            </div>
            
            {activeMenu ? (
              <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                {admin ? (
                  <Sidebar /> ) : (<></>)
                }
              </div>
            ) : (
              <div className="w-0 dark:bg-secondary-dark-bg">
                {admin ? (
                  <Sidebar /> ) : (<></>)
                }
              </div>
            )}
            <div
              className={
                activeMenu
                  ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                  : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
              }
            >   
              <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                <Navbar />
              </div>
              <div>
                {themeSettings && (<ThemeSettings />)}

                <Routes>
                <Route path="/login" element={!admin ? <Login /> : <Navigate to='/' />} />
                <Route path="/signup" element={!admin ? <Signup /> : <Navigate to='/' />} />

                    {/* pages  */}
                    <Route path="/" element={admin ? <Home /> : <Navigate to='/login' />} />
                    <Route path="/web-posts" element={admin ? <WebPosts /> : <Navigate to='/login' />} />
                    <Route path="/campaign" element={admin ? <Campaign /> : <Navigate to='/login' />} />
                    <Route path="/residence-Data" element={admin ? <ResidenceData /> : <Navigate to='/login' />} />
                    <Route path="/volunteers" element={admin ? <Volunteers /> : <Navigate to='/login' />} />
                    <Route path="/to-do-list" element={admin ? <Todolist /> : <Navigate to='/login' />} />
                    <Route path="/editor" element={admin ? <Editor /> : <Navigate to='/login' />} />
                    <Route path="/received-Emails" element={admin ? <ReceiveEmails /> : <Navigate to='/login' />} />
                  
                </Routes>
              </div>
              <Footer />
            </div>
          </div>
        </BrowserRouter>
      </div>
  );
};

export default App;


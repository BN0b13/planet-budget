import React from 'react';

import PurchaseEntry from '../../components/purchase-entry/purchase-entry.component';
import Charts from '../../components/charts/charts.component';
import HomeProfile from '../../components/home-profile/home-profile.component';
import './home.styles.scss';

const HomePage = ({ data, setReloadUserData, currentHomeDisplay, darkMode, setDarkMode }) => {

    const content = () => {
        if(currentHomeDisplay === 'home') {
            return (
              <div className='container'>
                  <PurchaseEntry 
                      data={data}
                      setReloadUserData={setReloadUserData} 
                  />
                  <Charts 
                      data={data}
                  />
              </div>
            );
        }
        if(currentHomeDisplay === 'profile') {
            return (
                <HomeProfile 
                    data={data}
                    setReloadUserData={setReloadUserData}
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                />
            );
        }
        return null;
    }
    
    return (
        <>
            { content() }
        </>
    );
};

export default HomePage;
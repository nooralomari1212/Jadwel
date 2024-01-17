import React from 'react';
import Welcome from './pages/Welcome';
import GenrateSchedule from './demo/Chairman/GenrateSchedule';
import { useSelector } from 'react-redux';
import Calendar from './Calendar';

const Home = () => {
  const userAuthority = useSelector((state) => state.auth.user.authority)

  const renderContent = () => 
  {
 
    switch (userAuthority[0]) {
      case 'student':
        return <Welcome/>;
      case 'chairman':
        return  <GenrateSchedule/>
      case 'registerer':
        return <div><Calendar/></div>;
      default:
        return <div>Invalid user autherity</div>;
    }
  };
    
    return(
        <>
        {userAuthority && renderContent()}
        </>
    );
     
    
  
};

export default Home;

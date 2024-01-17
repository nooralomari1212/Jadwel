import React from 'react'
import Header from 'components/template/Header'
import SidePanel from 'components/template/SidePanel'
import UserDropdown from 'components/template/UserDropdown'
import HeaderLogo from 'components/template/HeaderLogo'
import MobileNav from 'components/template/MobileNav'
import HorizontalNav from 'components/template/HorizontalNav'
import View from 'views'
import { Link } from 'react-router-dom';
import Notification from 'components/template/Notification'
import { useSelector } from 'react-redux'
const HeaderActionsStart = () => {
    return (
        <>
        <Link to="/">
        <HeaderLogo />
      
      </Link>
      <Link to="/">
        <h2>Jadwel</h2>
    
    </Link>
    </>
    )
}

const HeaderActionsEnd = () => {
    return (
        <>
                       <Notification/>

            <UserDropdown hoverable={false} />
        </>
    )
}

const SimpleLayout = () => {
    const mode = useSelector((state) => state.theme.mode)

    return (
<div className="app-layout-simple flex flex-auto flex-col min-h-screen" >
        <div className="flex flex-auto min-w-0" >
          <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full " >
          <Header 
      container
      className={`shadow ${mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
      headerStart={<HeaderActionsStart />}
      headerMiddle={<HorizontalNav />}
      headerEnd={<HeaderActionsEnd />}
    />
            <View pageContainerType="contained"  />
          </div>
        </div>
      </div>
    );
  }

export default SimpleLayout

import React from 'react'
import Logo from 'components/template/Logo'
import { useSelector } from 'react-redux'
const HeaderLogo = () => {
    const mode = useSelector((state) => state.theme.mode)
    return <Logo logoWidth={150}  mode={"Dark"} className="hidden md:block" />
}

export default HeaderLogo

import React from 'react'
import cl from './Header.module.css'
import { NavLink } from 'react-router-dom'

function Header() {
	return (
		<div className={cl.header} >
			<header >
				<NavLink className={cl.link} to='/'>Home</NavLink>
			</header>
		</div >
	)
}

export default Header
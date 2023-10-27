import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './UI/header/Header'

function Layout() {
	return (
		<div>
			<Header />
			<Outlet />
		</div>
	)
}

export default Layout
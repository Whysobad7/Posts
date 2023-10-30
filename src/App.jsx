import React from "react";
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'
import PostPage from "./pages/PostPage";
import Main from "./Main";


function App() {

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Main />} />
					<Route path="post/:postId" element={<PostPage />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;

import React, { useState, useMemo, useEffect } from "react";
import './styles/Main.css'
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import axios from 'axios'


function Main() {

	const [posts, setPosts] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [fetching, setFetching] = useState(true)
	const [totalCount, setTotalCount] = useState(0)


	const [filter, setFilter] = useState({ sort: '', query: '' })
	const [modal, setModal] = useState(false)

	useEffect(() => {
		if (fetching) {
			axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${currentPage}`)
				.then(response => {
					setPosts([...posts, ...response.data])
					setCurrentPage(prevState => prevState + 1)
					setTotalCount(response.headers['x-total-count'])
				})
				.finally(() => setFetching(false))
		}
	}, [fetching]);



	useEffect(() => {
		const scrollHandler = (e) => {
			if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100
				&& posts.length < totalCount) {
				setFetching(true);
			}
		}

		document.addEventListener('scroll', scrollHandler)
		return function () {
			document.removeEventListener('scroll', scrollHandler)
		};
	}, [fetching])





	const sortedPosts = useMemo(() => {
		if (filter.sort) {
			return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
		}
		return posts;
	}, [filter.sort, posts]);

	const sortedAndSearchedPosts = useMemo(() => {
		return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
	}, [filter.query, sortedPosts])

	const createPost = (newPost) => {
		setPosts([newPost, ...posts])
		setModal(false)
	}
	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id))
	}


	return (
		<div className="Main">
			<MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
				Создать пост
			</MyButton>
			<MyModal visible={modal} setVisible={setModal}>
				<PostForm create={createPost} />
			</MyModal>
			<hr style={{ margin: '15px 0' }} />
			<PostFilter
				filter={filter}
				setFilter={setFilter}
			/>
			<PostList remove={removePost} posts={sortedAndSearchedPosts} title='Посты про что-то интересное' />
		</div>
	)
}

export default Main
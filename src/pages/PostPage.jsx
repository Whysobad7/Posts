import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MyButton from '../components/UI/button/MyButton';
import cl from './PostPage.module.css'

function PostPage() {
	const [post, SetPost] = useState(null)
	const navigate = useNavigate();
	const { postId } = useParams();

	useEffect(() => {
		fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
			.then(res => res.json())
			.then(data => SetPost(data))
			.catch(error => {
				console.log('Ошибка, которую разработчик предвидел', error);
			});
	}, [postId])

	const goBack = () => navigate(-1)

	return (
		<div className={cl.postPage}>
			<MyButton onClick={goBack} >Назад</MyButton>

			{post ? (
				<div className={cl.postItem}>
					<h2>{post.title}</h2>
					<p>{post.body}</p>
				</div>
			) : (
				<p>Загрузка данных...</p>
			)}
		</div>
	)
}

export default PostPage
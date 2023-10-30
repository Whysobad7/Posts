import React from 'react';
import MyButton from './UI/button/MyButton';
import { useNavigate } from 'react-router-dom'

const PostItem = (props) => {
	const navigate = useNavigate();

	const handleViewClick = (post) => {
		navigate(`/post/${props.post.id}`)
		console.log(post.id);
	}

	function formatText(text, maxLength) {
		if (text.length <= maxLength) {
			return text;
		} else {
			return text.slice(0, maxLength) + '...';
		}
	}


	return (
		<div className="post" key={props.post.id}>
			<div className="post__content">
				<strong>{props.number}. {props.post.title}</strong>
				<div>
					{props.post.body.length > 140 ? formatText(props.post.body, 240) : props.post.body}
				</div>
			</div>
			<div className='post__btns'>
				{props.post.body.length > 140 && (
					<MyButton onClick={() => handleViewClick(props.post.id)}>Просмотр</MyButton>
				)}
				<MyButton style={{ marginTop: '30px' }} onClick={() => props.remove(props.post)}>Удалить</MyButton>
			</div>
		</div>
	);
}

export default PostItem;
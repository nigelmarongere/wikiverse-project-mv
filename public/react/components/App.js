import React, { useState, useEffect } from 'react';
import { PagesList } from './PagesList';

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {
	// initialise state
	const [pages, setPages] = useState([]);
	const [add, setAdd] = useState(false);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [tags, setTags] = useState('');

	// Write handleSubmit
	async function handleSubmit(ev){
		try {
			ev.preventDefault();
			const articleData = {title, content, name, email, tags};
			const response = await fetch(`${apiURL}/wiki`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(articleData)
			});
			const data = await response.json();
			console.log(JSON.stringify(data));
			// Reset state
			setTitle('');
			setContent('');
			setName('');
			setEmail('');
			setTags('');
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	async function deletePage(ev){
		try {
			ev.preventDefault();
			const response = await fetch(`${apiURL}/wiki/${pages.slug}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			})
			const data = await response.json();
			console.log(JSON.stringify(data));
			fetchPages();
		}  catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	async function fetchPages(){
		try {
			const response = await fetch(`${apiURL}/wiki`);
			const pagesData = await response.json();
			setPages(pagesData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	async function fetchSelected(url){
		try {
			const response = await fetch(url);
			const selectedData = await response.json();
			setPages(selectedData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	useEffect(() => {
		fetchPages();
	}, []);

	return (
		<main>	
      <h1>WikiVerse</h1>
			{
				pages.id?
				<div>
					<h3>{pages.title}</h3>
					<p><b>Author:</b> {pages.author.name}</p>
					<p><b>Published:</b> {pages.createdAt}</p>
					<p>{pages.content}</p>
					<p><b>Tags: </b>{pages.tags.map((tag) => <div>{tag.name}</div>)}</p>
					<button onClick={(ev) => {deletePage(ev)}}>DELETE</button>
					<button onClick={() => {fetchPages()}}>Back to Wiki List</button>
				</div>
				:
				add?
				<div>
					<form onSubmit={handleSubmit}>
						<h3>Add a Page</h3>
						<div><input type="text" placeholder="Title" value={title} onChange={(ev) => setTitle(ev.target.value)}></input></div>
						<div><input type="text" placeholder="Article Content" value={content} onChange={(ev) => setContent(ev.target.value)}></input></div>
						<div><input type="text" placeholder="Author Name" value={name} onChange={(ev) => setName(ev.target.value)}></input></div>
						<div><input type="text" placeholder="Author Email" value={email} onChange={(ev) => setEmail(ev.target.value)}></input></div>
						<div><input type="text" placeholder="Tags" value={tags} onChange={(ev) => setTags(ev.target.value)}></input></div>
						<div><button type="submit">Create Page</button></div>
					</form>
					<button onClick={() => {setAdd(false)}}>Back to Wiki List</button>
				</div>
				:
				<div>
					<h2>An interesting 📚</h2>
					<PagesList pages={pages} fetchSelected={fetchSelected}/>
					<h3>Add a Page</h3>
					<button onClick={() => {setAdd(true)}}>Add</button>
				</div>
			}
		</main>
	)
}
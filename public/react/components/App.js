import React, { useState, useEffect } from 'react';
import { PagesList } from './PagesList';

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {

	const [pages, setPages] = useState([]);

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
			<h2>An interesting 📚</h2>
			{
				pages.id?
				<div>
					<h3>{pages.title}</h3>
					<p><b>Author:</b> {pages.author.name}</p>
					<p><b>Published:</b> {pages.createdAt}</p>
					<p>{pages.content}</p>
					<p><b>Tags:</b> </p>
					<button onClick={() => {fetchPages()}}>Back to Wiki List</button>
				</div>
				:
				<PagesList pages={pages} fetchSelected={fetchSelected}/>
			}
		</main>
	)
}
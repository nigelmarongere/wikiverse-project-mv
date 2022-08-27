import React from 'react';
import apiURL from '../api';

export const Page = (props) => {

  return <div>
    <h3>{props.page.title}</h3>
    <button onClick={() => {props.fetchSelected(`${apiURL}/wiki/${props.page.slug}`)}}>View</button>
  </div>
} 
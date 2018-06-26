import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import { search } from "./BooksAPI";

ReactDOM.render(<App />, document.getElementById('root'));

window.searchBooks = search;
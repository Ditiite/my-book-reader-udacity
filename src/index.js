import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { search } from './BooksAPI';

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

window.searchBooks = search;
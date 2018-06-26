import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Shelf from './Shelf.jsx';

class Search extends Component {

    constructor(props){
        super(props);

        this.state = {
            books: []
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const keyword = event.target.value.trim();

        BooksAPI.search( keyword ).then((result) => {
            const books = (Array.isArray(result))? result: [];
            
            this.setState({
                books
            })
        })
    }
    
    render() {
        const displayBooks = this.state.books.map((resultBook) => {
            const sameBook = this.props.myBooks.find( (myBook) => myBook.id === resultBook.id );
            if (sameBook) {
                resultBook.shelf = sameBook.shelf;
            } else {
                resultBook.shelf = 'none';
            }
    
            return resultBook;
        });

        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">

                        <input type="text" placeholder="Search by title or author" 
                            onChange={this.handleChange}/>

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        <Shelf 
                            changeShelf={this.props.changeShelf}
                            books={displayBooks} />
                    </ol>
                </div>
            </div>
        );
    }
}

export default Search;
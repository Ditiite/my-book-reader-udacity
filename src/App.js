import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './components/Shelf';

class BooksApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /**
             * TODO: Instead of using this state variable to keep track of which page
             * we're on, use the URL in the browser's address bar. This will ensure that
             * users can use the browser's back and forward buttons to navigate between
             * pages, as well as provide a good URL they can bookmark and share.
             */
            showSearchPage: false,
            shelves: {
                read: [],
                wantToRead: [],
                currentlyReading: []
            }
        }

        this.changeShelf = this.changeShelf.bind(this)
    }

    changeShelf(book, newShelf) {
        BooksAPI.update(book, newShelf)
            .then( (result) => {
                this.getAllBooks();
            });
    }

    componentDidMount() {
       this.getAllBooks();
    }

    getAllBooks() {
        let shelves = {
            read: [],
            wantToRead: [],
            currentlyReading: []
        };

        BooksAPI.getAll().then((result) => {
            result.forEach(book => {
                switch (book.shelf) {
                    case 'read':
                        shelves.read.push(book);
                        break;
                    case 'wantToRead':
                        shelves.wantToRead.push(book);
                        break;
                    case 'currentlyReading':
                        shelves.currentlyReading.push(book);
                        break;
                    case 'none':
                        break;
                    default:
                        throw new Error('Unknown shelf');
                }
            });
            this.setState({
                shelves
            });
        });
    }
    
    render() {
        return (
            <div className="app">
                {this.state.showSearchPage ? (
                    <div className="search-books">
                        <div className="search-books-bar">
                            <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
                            <div className="search-books-input-wrapper">

                                <input type="text" placeholder="Search by title or author" />

                            </div>
                        </div>
                        <div className="search-books-results">
                            <ol className="books-grid"></ol>
                        </div>
                    </div>
                ) : (
                        <div className="list-books">
                            <div className="list-books-title">
                                <h1>MyReads</h1>
                            </div>
                            <div className="list-books-content">
                                <div>
                                    <Shelf title="Currently Reading" books={this.state.shelves.currentlyReading} changeShelf={this.changeShelf} />
                                    <Shelf title="Want to Read" books={this.state.shelves.wantToRead} changeShelf={this.changeShelf} />
                                    <Shelf title="Read" books={this.state.shelves.read} changeShelf={this.changeShelf} />
                                </div>
                            </div>
                            <div className="open-search">
                                <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
                            </div>
                        </div>
                    )}
            </div>
        )
    }
}

export default BooksApp
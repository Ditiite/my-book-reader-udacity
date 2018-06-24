import React, { Component } from "react";
import SelectShelf from './SelectShelf'

export default class Shelf extends Component {

    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        { this.props.books.map((book) => {
                            return (
                                <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ 
                                                    width: 128, 
                                                    height: 193, 
                                                    backgroundImage: 'url(' + book.imageLinks.thumbnail + ')'
                                                }}></div>

                                            <div className="book-shelf-changer">
                                                <SelectShelf
                                                    book={book}
                                                    changeShelf={ this.props.changeShelf }
                                                />
                                            </div>
                                        </div>
                                        <div className="book-title">{ book.title }</div>
                                        <div className="book-authors">{
                                            book.authors.join(', ')
                                        }</div>
                                    </div>
                                </li>
                            );
                        }) }
                    </ol>
                </div>
            </div>
        );
    }
}
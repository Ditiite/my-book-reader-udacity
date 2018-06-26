import React, { Component } from 'react'

class SelectShelf extends Component {
    constructor(props) {
        super(props);
        
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        const shelf = event.target.value;
        this.props.changeShelf(this.props.book, shelf);
    }

    render() {
        return(
            <select
                value={this.props.book.shelf}
                name="shelf"
                onChange={this.handleChange}  
                >
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        );
    }
}

export default SelectShelf;
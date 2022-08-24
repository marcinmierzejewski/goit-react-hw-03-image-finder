import React, { Component } from 'react';

export class SearchBar extends Component {
  state = {
    searchPicture: '',
  };

  inputChange = e => {
    this.setState({ searchPicture: e.target.value });
  };

  valueSubmit = e => {
    e.preventDefault();
    console.log(`Search: ${this.state.searchPicture}`);
    this.props.newSearch({ ...this.state });
    this.setState({ searchPicture: ''});
  };

  render() {

    return (
      <header>
        <form onSubmit={this.valueSubmit}>
          <button type="submit">
            <span>Search</span>
          </button>

          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name='searchPicture'
            onChange={this.inputChange}
          />
        </form>
      </header>
    );
  }
}

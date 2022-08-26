import React, { Component } from 'react';
import styles from './SearchBar.module.css'

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
    const {SearchBar, SearchForm, SearchFormButton,  SearchFormButtonLabel, SearchFormInput } = styles;

    return (
      <header className={SearchBar}>
        <form className={SearchForm} onSubmit={this.valueSubmit}>
          <button className={SearchFormButton} type="submit">
            <span className={SearchFormButtonLabel} >Search</span>
          </button>

          <input className={SearchFormInput}
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

import React, { Component } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import axios from 'axios';

const INITIAL_STATE = {
  pictures: [],
  page: 1,
  search: '',
  nextSearch: '',
  isLoading: false,
};

export class App extends Component {
  state = {
    ...INITIAL_STATE,
  };

  fetchPhotos = async (searchP, currentPage) => {
    console.log('searching.....');

    const API_KEY = '1424879-278d005ef871cdc02a09416fb';
    const params = new URLSearchParams({
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 12,
      page: currentPage,
    });

    const response = await axios.get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${searchP}&${params}`
    );
    const responseData = response.data.hits;
    return responseData;
  };

  updatePictures = async newSearch => {
    const { page, pictures } = this.state;
    const photos = await this.fetchPhotos(newSearch, page);
    const oldPictures = pictures;
    console.log(oldPictures);
    const newPictures = [...oldPictures, ...photos];
    console.log(newPictures);
    this.setState({ pictures: newPictures, isLoading: false, page: page + 1 });
  };

  resetArray = searchPicture => {
    this.setState({
      search: searchPicture,
      isLoading: true,
      pictures: [],
      page: 1,
    });
  };

  changeSearchValue = ({ searchPicture }) => {
    console.log(`searchPicture: ${searchPicture}`);
    console.log(`Po reset ${this.state.pictures}`);
    this.resetArray(searchPicture);
    console.log('szukaj');
    this.updatePictures(searchPicture);
  };

  addPages = () => {
    this.setState(oldState => ({
      page: oldState.page + 1,
    }));
  };

  loadMorePictures = () => {
    // this.setState(state => ({
    //   page: state.page + 1
    // }))
    const { page, nextSearch } = this.state;
    this.addPages();
    console.log(page);
    this.updatePictures(nextSearch);
  };

  async componentDidUpdate() {
    console.log('update....');
    const { search, nextSearch } = this.state;
    if (nextSearch !== search) {
      this.updatePictures(search);
      this.setState({ nextSearch: search });
    }
  }

  render() {
    return (
      <div>
        <SearchBar newSearch={this.changeSearchValue} />
        <div>
          {this.state.isLoading ? (
            <Loader />
          ) : (
            <ImageGallery pictures={this.state.pictures} />
          )}
        </div>
        <div>
          {this.state.page > 1 ? (
            <Button text="Load more" func={this.loadMorePictures} />
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

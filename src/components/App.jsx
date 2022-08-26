import React, { Component } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { fetchPhotos } from 'api/fetchPhotos';

const INITIAL_STATE = {
  pictures: [],
  page: 1,
  search: '',
  nextSearch: '',
  isLoading: false,
  error: null,
};

export class App extends Component {
  state = {
    ...INITIAL_STATE,
  };

  // fetchPhotos = async (searchP, currentPage) => {
  //   console.log('searching.....');

  //   const API_KEY = '1424879-278d005ef871cdc02a09416fb';
  //   const params = new URLSearchParams({
  //     image_type: 'photo',
  //     orientation: 'horizontal',
  //     safesearch: 'true',
  //     per_page: 12,
  //     page: currentPage,
  //   });

  //   const response = await axios.get(
  //     `https://pixabay.com/api/?key=${API_KEY}&q=${searchP}&${params}`
  //   );
  //   const responseData = response.data.hits;
  //   return responseData;
  // };

  updatePictures = async newSearch => {
    const { page, pictures, search } = this.state;

    try {
      const photos = await fetchPhotos(newSearch, page);
      const oldPictures = pictures;
      if (photos.length !== 0) {
        console.log(oldPictures);
        const newPictures = [...oldPictures, ...photos];
        console.log(newPictures);
        if (search !== newSearch) {
          this.setState({ pictures: photos});
        }  if (search === newSearch) {
          this.setState({ pictures: newPictures, page: page + 1 });
        }
        
      } else {
        alert('Sorry, no image matching');
      }
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
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
    const { error, page, pictures, isLoading } = this.state;

    return (
      <div>
        <SearchBar newSearch={this.changeSearchValue} />
        <div>
          {error && <p>ERROR: Whoops, something went wrong: {error.message}</p>}
          {isLoading ? <Loader /> : <ImageGallery pictures={pictures} />}
        </div>
        <div>
          {page > 1 && pictures.length > 0 ? (
            <Button text="Load more" func={this.loadMorePictures} />
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

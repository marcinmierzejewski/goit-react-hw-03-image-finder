import React, { Component } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { fetchPhotos } from 'api/fetchPhotos';

export class App extends Component {
  state = {
    pictures: [],
    page: 1,
    search: '',
    nextSearch: '',
    isLoading: false,
    isModalOpen: false,
    modalImg: null,
    error: null,
  };

  updatePictures = async newSearch => {
    const { page, pictures, search } = this.state;

    try {
      const photos = await fetchPhotos(newSearch, page);
      const oldPictures = pictures;
      if (photos.length !== 0) {
        // console.log(oldPictures);
        const newPictures = [...oldPictures, ...photos];
        // console.log(newPictures);
        if (search !== newSearch) {
          this.setState({ pictures: photos, page: 1 });
        }
        if (search === newSearch) {
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
    // console.log(`searchPicture: ${searchPicture}`);
    // console.log(`Po reset ${this.state.pictures}`);
    this.resetArray(searchPicture);
    // console.log('szukaj');
    this.updatePictures(searchPicture);
  };

  // addPages = () => {
  //   this.setState(oldState => ({
  //     page: oldState.page + 1,
  //   }));
  // };

  loadMorePictures = () => {
    const { nextSearch } = this.state;
    // this.addPages();
    this.updatePictures(nextSearch);
  };

  async componentDidUpdate() {
    const { search, nextSearch } = this.state;
    if (nextSearch !== search) {
      this.updatePictures(search);
      this.setState({ nextSearch: search });
    }
  }

  openModalWindow = e => {
    const largeImg = e.target.dataset.source;
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    this.setState({
      modalImg: largeImg,
      isModalOpen: true,
    });
  };

  closeModalWindow = e => {
    if (e.target.nodeName === 'IMG') {
      return;
    }
    this.setState({ isModalOpen: false });
  };

  render() {
    const { error, pictures, isLoading, isModalOpen, modalImg } =
      this.state;

    if (isModalOpen) {
      window.addEventListener('keydown', e => {
        if (e.code === 'Escape') {
          this.setState({ isModalOpen: false });
        }
      });
    } 
    // else {
    //   window.removeEventListener('keydown', e => {
    //     if (e.code === 'Escape') {
    //       this.setState({ isModalOpen: false });
    //     }
    //   });
    // }    

    return (
      <div>
        <SearchBar newSearch={this.changeSearchValue} />

        {error && <p>ERROR: Whoops, something went wrong: {error.message}</p>}
        {isLoading ? (
          <Loader />
        ) : (
          <ImageGallery
            pictures={pictures}
            openModalWindow={this.openModalWindow}
          />
        )}

        {pictures.length !== 0 ? (
          <Button text="Load more" func={this.loadMorePictures} />
        ) : (
          ''
        )}

        {isModalOpen ? (
          <Modal modalImgLarge={modalImg} closeImg={this.closeModalWindow} />
        ) : (
          <></>
        )}
      </div>
    );
  }
}

import React, { Component } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import axios from 'axios';

export class App extends Component {
  state = {
    pictures: [],
    page: 1,
    search: '',
    isLoading: false,
  };

  fetchPhotos = async (searchP) => {
    console.log('searching.....');
    const { page, pictures } = this.state;
    const API_KEY = '1424879-278d005ef871cdc02a09416fb';
    const params = new URLSearchParams({
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 12,
      page: page,
    });

    const response = await axios.get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${searchP}&${params}`
    );
    const responseData = response.data.hits;
    const oldPictures = pictures;
    console.log(oldPictures);
    const newPictures = [...oldPictures, ...responseData];
    console.log(newPictures);
    this.setState({ pictures: newPictures, isLoading: false, page: page+1 });
  };

  changeSearchValue = ({ searchPicture }) => {
    console.log(`searchPicture: ${searchPicture}`)
    this.setState(state => ({
      search: searchPicture, isLoading: true 
    }));
    console.log('szukaj');
    this.fetchPhotos(searchPicture);
  };

  addPages = () => {
    this.setState((oldState) => ({
      
      page: oldState.page + 1,
    }));
  }

  loadMorePictures = () => {
    // this.setState(state => ({
    //   page: state.page + 1
    // }))
    const {page, search} = this.state
    this.addPages()
    console.log(page)
    console.log(search)
    this.fetchPhotos(search)
  }
    

  // async componentDidMount(){
  //   console.log('componentDidMount')
  //   const {search} = this.state
  //   const API_KEY = '1424879-278d005ef871cdc02a09416fb';
  //   const params = new URLSearchParams({
  //     image_type: 'photo',
  //     orientation: 'horizontal',
  //     safesearch: 'true',
  //     per_page: 12,
  //     page: 1,
  //   });
  //   if (search) {
  //     const response = await axios.get(
  //       `https://pixabay.com/api/?key=${API_KEY}&q=${search}&${params}`
  //     );
  //     const responseData = response.data;
  //     this.setState({pictures: responseData})
  //   }
  // }

  // async componentDidUpdate(){
  //   console.log('componentDidUpdate')
  //   const { page, search, nextSearch, pictures} = this.state
  //   const API_KEY = '1424879-278d005ef871cdc02a09416fb';
  //   const params = new URLSearchParams({
  //     image_type: 'photo',
  //     orientation: 'horizontal',
  //     safesearch: 'true',
  //     per_page: 12,
  //     page: {page},
  //   });
  //   // this.setState({ isLoading: true });
  //   if (nextSearch  !==  search) {

  //     const response = await axios.get(
  //       `https://pixabay.com/api/?key=${API_KEY}&q=${nextSearch}&${params}`

  //     );
  //     const responseData = response.data.hits;
  //     const currentPictures = pictures
  //     console.log(currentPictures);
  //     const allPictures = [...currentPictures, ...responseData];
  //     console.log(allPictures)
  //     this.setState({search: nextSearch, pictures: allPictures, isLoading: false})
  //   }
  // }

  render() {
    return (
      <div>
        <SearchBar newSearch={this.changeSearchValue}/>
        <div>
          {this.state.isLoading ? (
            <Loader />
          ) : (
            <ImageGallery pictures={this.state.pictures} />
          )}
        </div>
        <div>
          <Button
            text='Load more'
            func={this.loadMorePictures}
          />
        </div>
      </div>
    );
  }
}

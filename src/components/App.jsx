import React, { Component } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import axios from 'axios';

export class App extends Component {

  state = {
    pictures: [],
    page: 2,
    search: '',
    nextSearch: '',
  }

  changeSearchValue = ({searchPicture}) => {
    this.setState( {nextSearch: searchPicture} )
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

  async componentDidUpdate(){
    console.log('componentDidUpdate')
    const { page, search, nextSearch} = this.state
    const API_KEY = '1424879-278d005ef871cdc02a09416fb';
    const params = new URLSearchParams({
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 12,
      page: {page},
    });
    if (nextSearch  !==  search) {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${nextSearch}&${params}`
        
      );
      this.setState({search: nextSearch})
      const responseData = response.data.hits;
      this.setState({pictures: responseData})
    } 
  }
    

  render() {
    return (
      <div>
        <SearchBar 
          newSearch={this.changeSearchValue}
        />
        <ImageGallery
          pictures={this.state.pictures}
        />
      </div>
    );
  }

};

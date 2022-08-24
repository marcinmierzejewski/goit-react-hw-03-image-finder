import React, { Component } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import axios from 'axios';

export class App extends Component {

  state = {
    pictures: [],
    page: 2,
    search: '',
    nextSearch: '',
    isLoading: false,
  }

  changeSearchValue = ({searchPicture}) => {
    this.setState( {nextSearch: searchPicture, isLoading: true} )
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
    // this.setState({ isLoading: true });
    if (nextSearch  !==  search) {
      
      
      const response = await axios.get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${nextSearch}&${params}`
        
      );      
      const responseData = response.data.hits;
      this.setState({search: nextSearch, pictures: responseData, isLoading: false})
    } 
  }
    

  render() {
    return (
      <div>
        <SearchBar 
          newSearch={this.changeSearchValue}
        />
        <div>
          {this.state.isLoading ? (
            <Loader/>            
          ) : (
            <ImageGallery
            pictures={this.state.pictures}
          />
          )}
        </div>
        
      </div>
    );
  }

};

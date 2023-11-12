import React, { Component } from 'react';
import axios from 'axios';
import './styles.css';
import Searchbar from 'components/Searchbar/Searchbar.js';
import ImageGallery from 'components/ImageGallery/ImageGallery.js';
import Button from 'components/Button/Button.js';
import Loader from 'components/Loader/Loader.js';
import Modal from 'components/Modal/Modal.js';

const API_KEY = '39751555-c2fbc931ac716611d03f33f4d';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      images: [],
      page: 1,
      loading: false,
      showModal: false,
      selectedImage: '',
    };
  }

  fetchImages = async () => {
    const { searchQuery, page } = this.state;
    try {
      this.setState({ loading: true });
      const response = await axios.get(
        `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const newImages = response.data.hits.map((image) => ({
        id: image.id,
        webformatURL: image.webformatURL,
        largeImageURL: image.largeImageURL,
      }));
      this.setState((prevState) => ({ images: [...prevState.images, ...newImages] }));
    } catch (error) {
      console.error('Error fetching images', error);
    } finally {
      this.setState({ loading: false });
    }
  };

  loadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }), this.fetchImages);
  };

  openModal = (image) => {
    this.setState({ showModal: true, selectedImage: image.largeImageURL });
  };

  closeModal = () => {
    this.setState({ showModal: false, selectedImage: '' });
  };

  handleSubmit = (searchQuery) => {
    this.setState({ searchQuery, page: 1, images: [] }, this.fetchImages);
  };

  render() {
    const { searchQuery, images, loading, showModal, selectedImage } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} value={searchQuery} />

        <ImageGallery images={images} openModal={this.openModal} />

        {loading && <Loader />}

        {images.length > 0 && !loading && <Button onLoadMore={this.loadMore} />}

        {showModal && <Modal onClose={this.closeModal} largeImageURL={selectedImage} />}
      </div>
    );
  }
}

export default App;

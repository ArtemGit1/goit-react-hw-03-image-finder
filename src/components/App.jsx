import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import Searchbar from 'components/Searchbar/Searchbar.js';
import ImageGallery from 'components/ImageGallery/ImageGallery.js';
import Button from 'components/Button/Button.js';
import Loader from 'components/Loader/Loader.js';
import Modal from 'components/Modal/Modal.js';

const API_KEY = '39751555-c2fbc931ac716611d03f33f4d';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleSubmit = (searchQuery) => {
    setSearchQuery(searchQuery);
    setPage(1);
    setImages([]);
  };

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const newImages = response.data.hits.map((image) => ({
        id: image.id,
        webformatURL: image.webformatURL,
        largeImageURL: image.largeImageURL,
      }));
      setImages((prevImages) => [...prevImages, ...newImages]);
    } catch (error) {
      console.error('Error fetching images', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image) => {
    setShowModal(true);
    setSelectedImage(image.largeImageURL);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(''); // Очищення значення selectedImage при закритті модального вікна
  };

  useEffect(() => {
    if (searchQuery === '') return;

    fetchImages();
  }, [page, searchQuery]);

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

      <ImageGallery images={images} openModal={openModal} />

      {loading && <Loader />}

      {images.length > 0 && !loading && <Button onLoadMore={loadMore} />}

      {showModal && <Modal onClose={closeModal} largeImageURL={selectedImage} />}
    </div>
  );
};

export default App;

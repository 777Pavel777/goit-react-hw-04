import { useEffect, useState } from 'react';
import { fetchGallery } from '../galleryApi';

import SearchBar from './SearchBar/SearchBar';
import ShowGallery from './ImageGallery/ImageGallery';
import ImageModule from './ImageModule/ImageModule';
import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMassege/ErrorMessage';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';

export default function App() {
  const [img, setImg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [imgURL, setImgURL] = useState();
  const [modal, setModal] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  const handleSubmit = newQuery => {
    setQuery(newQuery);
    setImg([]);
    setPage(1);
    setError(false);
    setLoading(false);
    setImgURL(null);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    async function getGallery() {
      try {
        setError(false);
        setLoading(true);

        const data = await fetchGallery(query, page);
        setShowBtn(data.total_pages && data.total_pages !== page);
        setImg(prevGallery => {
          return [...prevGallery, ...data.results];
        });
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getGallery();
  }, [page, query]);

  const showModal = url => {
    setImgURL(url);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {img.length > 0 && <ShowGallery images={img} onClick={showModal} />}
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {img.length > 0 && !loading && showBtn && (
        <LoadMoreBtn addPage={handleLoadMore} />
      )}
      <ImageModule image={imgURL} state={modal} close={closeModal} />
    </>
  );
}

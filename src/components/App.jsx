import { useEffect, useState } from 'react';
import { fetchGallery } from '../galleryApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [limit, setLimit] = useState();

  const handleSubmit = newQuery => {
    setQuery(newQuery);
    setImg([]);
    setLimit(null);
    setPage(1);
    setError(false);
    setLoading(false);
    setImgURL(null);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    async function getGallery() {
      try {
        setError(false);
        setLoading(true);

        const data = await fetchGallery(query, page);
        if (Math.ceil(data.total_pages / limit) === page) {
          toast("We're sorry, but you've reached the end of search results.", {
            position: 'top-right',
            type: 'error',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
          });
          return;
        }
        setImg(prevGallery => {
          return [...prevGallery, ...data];
        });
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getGallery();
  }, [page, query, limit]);

  const showModal = url => {
    setImgURL(url);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <>
      <ToastContainer />
      <SearchBar onSubmit={handleSubmit} />
      {img.length > 0 && <ShowGallery images={img} onClick={showModal} />}
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {img.length > 0 && !loading && !limit && (
        <LoadMoreBtn addPage={handleLoadMore} />
      )}
      <ImageModule image={imgURL} state={modal} close={closeModal} />
    </>
  );
}

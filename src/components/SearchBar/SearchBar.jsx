import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './SearchBar.module.css';

export default function SearchBar({ onSubmit }) {
  const onSubmitBar = e => {
    e.preventDefault();
    const data = e.target.elements.search.value;

    if (data.trim() === '') {
      toast(
        'Sorry, input is empty. Please enter something in the search field!',
        {
          position: 'top-right',
          type: 'error',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        }
      );
      return;
    }
    onSubmit(data.trim());

    e.target.reset();
  };

  return (
    <>
      <header>
        <form className={css.container} onSubmit={onSubmitBar}>
          <input
            className={css.searchBox}
            type="text"
            name="search"
            placeholder="Search images and photos"
            autoComplete="off"
            autoFocus
          />
          <button className={css.searchBtn} type="submit">
            Search
          </button>
        </form>
      </header>
      <ToastContainer />
    </>
  );
}

import css from './LoadMoreBtn.module.css';

export default function LoadMoreBtn({ addPage }) {
  return (
    <>
      <div className={css.container}>
        <button className={css.loadMoreBtn} onClick={addPage}>
          Load More
        </button>
      </div>
    </>
  );
}

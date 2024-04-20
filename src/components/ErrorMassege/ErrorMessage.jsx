import css from './ErrorMessage.module.css';

export default function ErrorMessage() {
  return (
    <div className={css.errorMessage}>
      <p>Oops, sometsing wents wrong.Please try later</p>
    </div>
  );
}

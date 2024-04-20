import css from './ImageCard.module.css';

export default function ImgCard({
  img: {
    alt_description,
    urls: { small, regular },
  },
  onClick,
}) {
  return (
    <div>
      <img
        className={css.containerCard}
        onClick={() => onClick(regular)}
        alt={alt_description}
        src={small}
      />
    </div>
  );
}

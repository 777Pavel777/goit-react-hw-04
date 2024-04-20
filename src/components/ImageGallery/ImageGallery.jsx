import css from './ImageGallery.module.css';
import ImgCard from '../ImageCard/ImageCard';

export default function ShowGallery({ images, onClick }) {
  return (
    <ul className={css.container}>
      {images.map(img => (
        <li key={img.id}>
          <ImgCard img={img} onClick={onClick} />
        </li>
      ))}
    </ul>
  );
}

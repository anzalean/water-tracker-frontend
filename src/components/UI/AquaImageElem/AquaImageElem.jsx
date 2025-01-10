import clsx from 'clsx';
import css from './AquaImageElem.module.css';

const AquaImageElem = ({ imgUrl, altText = '', containerClass = null }) => {
  return (
    <div className={clsx(css.container, containerClass && containerClass)}>
      <img className={css.img} src={imgUrl} alt={`Photo of ${altText}`} />
    </div>
  );
};

export default AquaImageElem;

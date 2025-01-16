import styles from './AddWaterButton.module.css';

const AddWaterButton = ({ onClick, variant = 'default' }) => {
  return (
    <button
      className={`${styles.buttonContainer} ${
        variant === 'dailyInfo' ? styles.dailyInfoVariant : ''
      }`}
      onClick={onClick}
    >
      <svg
        className={`${styles.buttonIcon} ${
          variant === 'dailyInfo' ? styles.dailyInfoIcon : ''
        }`}
        width="30"
        height="30"
      >
        <use
          href={`/src/assets/icons/sprite.svg#${
            variant === 'dailyInfo' ? 'icon-plus1' : 'icon-plus'
          }`}
        />
      </svg>
      <span
        className={`${styles.buttonText} ${
          variant === 'dailyInfo' ? styles.dailyInfoText : ''
        }`}
      >
        Add water
      </span>
    </button>
  );
};

export default AddWaterButton;

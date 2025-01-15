import styles from "./WaterList.module.css";
import WaterItem from "../WaterItem/WaterItem";

const WaterList = ({ items }) => {
  return (
    <div className={styles.waterList}>
      {items.map((item) => (
        <WaterItem
          key={item.id}
          volume={item.volume}
          time={item.time}
          onEdit={() => console.log(`Edit ${item.id}`)}
          onDelete={() => console.log(`Delete ${item.id}`)}
        />
      ))}
    </div>
  );
};

export default WaterList;

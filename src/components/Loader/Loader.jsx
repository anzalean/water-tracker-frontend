import { useSelector } from "react-redux";
import { Rings } from "react-loader-spinner";
import { selectLoader } from "../../redux/loader/selectors";
import { selectIsRefreshing } from "../../redux/user/selectors";
import css from "./Loader.module.css";

const Loader = () => {
  const isLoading = useSelector(selectLoader);
  const isRefreshing = useSelector(selectIsRefreshing);

  if (!isLoading && !isRefreshing) {
    return null;
  }

  return (
    <div className={css.loader}>
      <Rings
        visible={true}
        height="300"
        width="300"
        color="#87d28d"
        ariaLabel="rings-loading"
      />
    </div>
  );
};

export default Loader;

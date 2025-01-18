import { Rings } from 'react-loader-spinner';

export const Loading = ({ customHeight}) => {
  return (
    <div>
      <Rings
        visible={true}
        height={customHeight || "160"}
        width="160"
        color="#87d28d"
        ariaLabel="rings-loading"
        wrapperStyle={{}}
        wrapperClass="loader"
      />
    </div>
  );
};
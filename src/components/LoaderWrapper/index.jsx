import Loader from "../Loader";
import cx from "classnames";
import styles from "@styles/components/_loader-wrapper.module.scss";

const LoaderWrapper = ({
  isError,
  isDataLoaded,
  children,
  errorMessage = " An error occured",
}) => {
  return (
    <>
      {isError ? (
        <div className={cx(styles["error"], styles["center-content"])}>
          {errorMessage}
        </div>
      ) : (
        <>
          {!isDataLoaded ? (
            <div className={styles["center-content"]}>
              <Loader />
            </div>
          ) : (
            children
          )}
        </>
      )}
    </>
  );
};

export default LoaderWrapper;

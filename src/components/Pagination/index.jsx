import cx from "classnames";

import Button from "@components/Button";

import styles from "@styles/components/_pagination.module.scss";

const Pagination = ({
  totalPages,
  currentPage,
  pageChangeHandler,
  lastPage,
}) => {
  // EVENT HANDLERS
  function prevHandler() {
    pageChangeHandler(currentPage - 1);
  }

  function nextHandler() {
    pageChangeHandler(currentPage + 1);
  }

  function pageClickHandler(event) {
    const pageNumber = Number(event.target.textContent);
    pageChangeHandler(pageNumber);
  }
  // EVENT HANDLERS ENDS

  const renderButton = (btnObj) => {
    const {
      className,
      type,
      btnStyle,
      label,
      clickHandler = () => {},
      isDisabled = false,
    } = btnObj;

    return (
      <Button
        className={className}
        type={type}
        btnStyle={btnStyle}
        size="rg"
        label={String(label)}
        onClick={clickHandler}
        disabled={isDisabled}
      />
    );
  };
  const hasTotalPages = totalPages;

  return (
    <div className={styles.paginationWrapper}>
      {/* PREVIOUS BUTTON */}
      {renderButton({
        className: styles.navigationButtons,
        type: 3,
        btnStyle: 3,
        label: "Previous",
        clickHandler: prevHandler,
        isDisabled: currentPage === 1,
      })}

      {hasTotalPages && (
        <div className={styles.pagesButtonsWrapper}>
          {![1, 2, 3].includes(currentPage) && (
            <>
              {renderButton({
                className: styles.pagesButtons,
                type: 1,
                btnStyle: 3,
                label: 1,
                clickHandler: pageClickHandler,
              })}

              {!(currentPage - 3 === 1) && (
                <div className={styles.dots}>
                  <span>...</span>
                </div>
              )}
            </>
          )}

          {/* SECOND LEFT FROM CURRENT PAGE */}
          {currentPage > 2 &&
            renderButton({
              className: cx(styles.pagesButtons),
              type: 1,
              btnStyle: 3,
              label: currentPage - 2,
              clickHandler: pageClickHandler,
            })}

          {/* LEFT FROM CURRENT PAGE */}
          {currentPage > 1 &&
            renderButton({
              className: styles.pagesButtons,
              type: 1,
              btnStyle: 3,
              label: currentPage - 1,
              clickHandler: pageClickHandler,
            })}

          {/* CURRENT PAGE */}
          {renderButton({
            className: cx(styles.pagesButtons, styles.pagesButtonsActive),
            type: 1,
            btnStyle: 3,
            label: currentPage,
            clickHandler: pageClickHandler,
          })}

          {/* RIGHT FROM CURRENT PAGE */}
          {currentPage < totalPages &&
            renderButton({
              className: styles.pagesButtons,
              type: 1,
              btnStyle: 3,
              label: currentPage + 1,
              clickHandler: pageClickHandler,
            })}

          {/* SECOND RIGHT FROM CURRENT PAGE */}
          {currentPage < totalPages - 1 &&
            renderButton({
              className: cx(styles.pagesButtons),
              type: 1,
              btnStyle: 3,
              label: currentPage + 2,
              clickHandler: pageClickHandler,
            })}

          {![totalPages - 2, totalPages - 1, totalPages].includes(
            currentPage
          ) && (
            <>
              {!(currentPage + 3 === totalPages) && (
                <div className={styles.dots}>...</div>
              )}

              {renderButton({
                className: styles.pagesButtons,
                type: 1,
                btnStyle: 3,
                label: totalPages,
                clickHandler: pageClickHandler,
              })}
            </>
          )}
        </div>
      )}

      {/* NEXT BUTTON */}
      {renderButton({
        className: styles.navigationButtons,
        type: 2,
        btnStyle: 3,
        label: "Next",
        clickHandler: nextHandler,
        isDisabled: currentPage === totalPages,
      })}
    </div>
  );
};

export default Pagination;

import cx from "classnames";

import { RightArrow, LeftArrow, Plus } from "./SVG";

import styles from "@styles/components/_button.module.scss";

const BTN_STYLE = {
  1: "primary",
  2: "secondary",
  3: "tertiary",
};

function Button(props) {
  const {
    btnType = "button",
    type,
    label = "",
    onClick = () => {},
    className = "",
    btnStyle = 1,
    size = "sm",
    children,
    disabled = false,
    loading = false,
    otherAttributes,
  } = props;

  function handleClick(e) {
    if (!loading || disabled) {
      onClick(e);
    }
  }

  // handle class list
  function classList(className) {
    let sizeStyle = `${size}-btn`;
    if (type > 1) {
      sizeStyle = `${size}-btn-with-icon`;
    }
    return cx(
      className,
      styles[sizeStyle],
      styles[`${BTN_STYLE[btnStyle]}-btn`],
      styles[`btn-${type}`],
      styles.btn,
      { [styles.pointer]: loading || disabled }
    );
  }

  let render = "";

  // handle which button should be rendered
  switch (type) {
    // simple button
    case 1:
      render = label || children;
      break;

    // button with right arrow
    case 2:
      render = (
        <span data-testid="right-arrow-btn">
          {label}
          <RightArrow />
        </span>
      );
      break;

    // button with left arrow
    case 3:
      render = (
        <>
          <LeftArrow />
          {label}
        </>
      );
      break;

    // button with plus icon
    case 4:
      render = (
        <>
          <Plus />
          <div className={styles.bar} />
          {label}
        </>
      );
      break;
    default:
      render = null;
  }

  return (
    <button
      type={btnType}
      className={classList(className)}
      onClick={handleClick}
      disabled={disabled}
      {...otherAttributes}
    >
      {loading ? <div className={styles["btn-loader"]} /> : render}
    </button>
  );
}

export default Button;

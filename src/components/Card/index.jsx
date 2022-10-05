import Image from "next/image";
import cx from "classnames";
import styles from "@styles/components/_card.module.scss";

const Card = ({ imageSrc, cardTag, cardDesc, type = 1 }) => {
  return (
    <div className={cx(styles.card, styles[`card-${type}`])}>
      <div
        className={cx(
          styles["card-image--wrapper"],
          styles[`card-image--wrapper-${type}`]
        )}
      >
        {imageSrc && (
          <Image
            className={cx(styles["card-image"], styles[`card-image-${type}`])}
            src={imageSrc}
            objectFit={type === 2 ? "cover" : "fill"}
            alt="card-image"
            layout={"fill"}
          />
        )}
      </div>
      <div
        className={cx(
          styles["card-lower-section"],
          styles[`card-lower-section-${type}`]
        )}
      >
        <div className={styles["card-right-section"]}>
          <div className={styles["card-desc"]}>{cardDesc}</div>
          <div className={styles["card-animate-bg"]} />
        </div>
      </div>
    </div>
  );
};

export default Card;

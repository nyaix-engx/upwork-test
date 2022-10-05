import { useRouter } from "next/router";

import Icon from "@components/Icon";

import styles from "@styles/components/_input-search.module.scss";

function InputSearch({ onChange, onSubmit, value }) {
  const router = useRouter();
  return (
    <div className={styles["input"]}>
      <input
        type="search"
        autoFocus={router.asPath.includes("/search")}
        onChange={onChange}
        value={value}
        placeholder="What are you looking for?"
        className={styles["search-field"]}
      />
      <div
        className={styles["search-icon-wrapper"]}
        role="presentation"
        onClick={onSubmit}
      >
        <Icon icon="search" size="20px" />
      </div>
    </div>
  );
}

export default InputSearch;

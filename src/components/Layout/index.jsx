import * as React from "react";

import styles from "@styles/components/_layout.module.scss";

const Layout = ({ children }) => {
  return <div className={styles["site-wrapper"]}>{children}</div>;
};

export default Layout;

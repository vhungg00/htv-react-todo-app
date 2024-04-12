import { ScreenUrlPath } from "@/typing/ScreenUrlPath";
import React from "react";
import { Link } from "react-router-dom";

import styles from "@/styles/modules/app.module.scss";

export const ReturnLink: React.FC = () => {
  return (
    <p>
      <Link className={styles.returnLink} to={ScreenUrlPath.Root}>
        <i className={styles.iconReturnLink}></i>
        Quay lại trang chủ
      </Link>
    </p>
  );
};

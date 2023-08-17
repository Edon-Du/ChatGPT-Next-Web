import styles from "./auth.module.scss";
import { IconButton } from "./button";

import { useNavigate } from "react-router-dom";
import { Path } from "../constant";
import { useAccessStore } from "../store";
import Locale from "../locales";

import BotIcon from "../icons/bot.svg";
import { useEffect } from "react";
import { getClientConfig } from "../config/client";
import React, { useState } from "react";

export function AuthPage() {
  const navigate = useNavigate();
  const access = useAccessStore();

  const goHome = () => navigate(Path.Home);

  const [showTooltip, setShowTooltip] = useState(false);

  const handleShowTooltip = () => {
    // showToast(Locale.WIP)
    if (showTooltip) {
      setShowTooltip(false);
    } else {
      setShowTooltip(true);
    }
  };

  useEffect(() => {
    if (getClientConfig()?.isApp) {
      navigate(Path.Settings);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles["auth-page"]}>
      <div className={`no-dark ${styles["auth-logo"]}`}>
        <BotIcon />
      </div>

      <div className={styles["auth-title"]} onClick={handleShowTooltip}>
        获取密码
        {showTooltip && (
          <div
            style={{
              display: "flex",
              justifyContent: "center", // 水平居中
              alignItems: "center", // 垂直居中
              position: "fixed",
              left: "75%", // 将右侧位置设置为屏幕的中央
              top: "50%", // 将顶部位置设置为屏幕的中央
              transform: "translate(-50%, -50%)", // 通过负的50%偏移来实现居中
              zIndex: "9999",
              boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div
              style={{
                backgroundImage: "url('/qrcode_mp258_258.jpg')",
                backgroundSize: "cover",
                width: "258px",
                height: "258px",
              }}
            ></div>
          </div>
        )}
      </div>
      <div className={styles["auth-tips"]}>{Locale.Auth.Tips}</div>

      <input
        className={styles["auth-input"]}
        type="password"
        placeholder={Locale.Auth.Input}
        value={access.accessCode}
        onChange={(e) => {
          access.updateCode(e.currentTarget.value);
        }}
      />

      <div className={styles["auth-actions"]}>
        <IconButton
          text={Locale.Auth.Confirm}
          type="primary"
          onClick={goHome}
        />
        <IconButton text={Locale.Auth.Later} onClick={goHome} />
      </div>
    </div>
  );
}

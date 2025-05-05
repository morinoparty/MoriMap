import { cx, sva } from "../../styled-system/css";
import React from "react";
import { RailwayJson } from "../utils/parseRailwayHtmlToJson";

// スタイル定義
export const TransferGuidePopupStyles = sva({
  slots: [
    "root",
    "header",
    "headerIcon",
    "headerTitle",
    "lineColor",
    "contentContainer",
    "stationRow",
    "stationIconWrapper",
    "travelTimeIconWrapper",
    "stationIcon",
    "stationName",
    "timeRow",
    "timeIcon",
    "timeText",
    "popupArrow",
  ],
  base: {
    root: {
      width: "200px",
      border: "2.5px solid #A7D6BD",
      px: "12px",
      py: "10px",
      borderRadius: "10px",
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      gap: "14px",
      "& p": {
        m: "0 !important",
        p: "0 !important",
      },
    },
    header: {
      display: "flex",
      alignItems: "center",
      gap: "2px",
      width: "176px",
    },
    headerIcon: {
      width: "16px",
      height: "16px",
      minWidth: "16px",
      minHeight: "16px",
    },
    headerTitle: {
      fontSize: "12px",
      fontWeight: "bold",
      color: "#7DBD9D",
      lineHeight: "1.48",
      width: "100%",
    },
    lineColor: {
      width: "12px",
      height: "12px",
      minWidth: "12px",
      minHeight: "12px",
      borderRadius: "6px",
      backgroundColor: "#A7D6BD",
      mr: "2px",
      border: "1px solid rgba(0, 0, 0, 0.25)",
    },
    contentContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      width: "100%",
    },
    stationRow: {
      display: "flex",
      alignItems: "flex-start",
      gap: "8px",
      width: "100%",
    },
    stationIconWrapper: {
      display: "flex",
      alignItems: "center",
      padding: "4px",
      borderRadius: "6px",
      backgroundColor: "#DEEEE6",
    },
    travelTimeIconWrapper: {
      display: "flex",
      alignItems: "center",
      padding: "4px",
      borderRadius: "6px",
      backgroundColor: "white",
    },
    stationIcon: {
      width: "16px",
      height: "16px",
    },
    stationName: {
      fontSize: "14px",
      fontWeight: "bold",
      color: "#539676",
      lineHeight: "1.48",
      width: "100%",
    },
    timeRow: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      width: "100%",
    },
    timeIcon: {
      width: "16px",
      height: "16px",
      padding: "4px",
      borderRadius: "6px",
    },
    timeText: {
      fontSize: "12px",
      fontWeight: "bold",
      color: "#7DBD9D",
      lineHeight: "1.48",
      width: "100%",
    },
    popupArrow: {
      position: "absolute",
      bottom: "-5px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: -1,
    },
  },
});

// 乗換案内のプロパティ定義
export interface TransferGuidePopupProps {
  className?: string;
  style?: React.CSSProperties;
  lineColor?: string;
}

// 乗換案内コンポーネント
export const TransferGuidePopup: React.FC<
  TransferGuidePopupProps & RailwayJson
> = ({
  className,
  style,
  lineName,
  fromStation,
  toStation,
  travelTime,
  direction,
  lineColor,
}) => {
  const classes = TransferGuidePopupStyles();
  return (
    <div
      className={cx(classes.root, className, "transfer-guide-popup")}
      style={style}
    >
      <div className={classes.header}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.79175 7.33333H13.4584M8.12508 2V7.33333M5.45841 12.6667L4.12508 14.6667M12.1251 14.6667L10.7917 12.6667M5.45841 10H5.46508M10.7917 10H10.7984M4.12508 2H12.1251C12.8615 2 13.4584 2.59695 13.4584 3.33333V11.3333C13.4584 12.0697 12.8615 12.6667 12.1251 12.6667H4.12508C3.3887 12.6667 2.79175 12.0697 2.79175 11.3333V3.33333C2.79175 2.59695 3.3887 2 4.12508 2Z"
            stroke="#7DBD9D"
            strokeWidth="1.44"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div
          className={cx(classes.lineColor)}
          style={{
            backgroundColor: lineColor || "#A7D6BD",
          }}
        ></div>

        <h2 className={classes.headerTitle}>{lineName || "乗換案内"}</h2>
      </div>

      <div className={classes.contentContainer}>
        {/* 出発駅 */}
        <div className={classes.stationRow}>
          <div className={classes.stationIconWrapper}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.79175 7.33333H13.4584M8.12508 2V7.33333M5.45841 12.6667L4.12508 14.6667M12.1251 14.6667L10.7917 12.6667M5.45841 10H5.46508M10.7917 10H10.7984M4.12508 2H12.1251C12.8615 2 13.4584 2.59695 13.4584 3.33333V11.3333C13.4584 12.0697 12.8615 12.6667 12.1251 12.6667H4.12508C3.3887 12.6667 2.79175 12.0697 2.79175 11.3333V3.33333C2.79175 2.59695 3.3887 2 4.12508 2Z"
                stroke="#539676"
                strokeWidth="1.44"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className={classes.stationName}>{fromStation}</p>
        </div>

        {/* 所要時間 */}
        <div className={classes.timeRow}>
          <div className={classes.travelTimeIconWrapper}>
            {direction === "bidirectional" && (
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.125 10.6667L4.79167 13.3333M4.79167 13.3333L7.45833 10.6667M4.79167 13.3333V2.66666M14.125 5.33332L11.4583 2.66666M11.4583 2.66666L8.79167 5.33332M11.4583 2.66666V13.3333"
                  stroke="#539676"
                  strokeWidth="1.44"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            {direction === "unidirectional" && (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.99992 3.33334V12.6667M7.99992 12.6667L12.6666 8.00001M7.99992 12.6667L3.33325 8.00001"
                  stroke="#539676"
                  strokeWidth="1.44"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <p className={classes.timeText}>{travelTime}</p>
        </div>

        {/* 目的駅 */}
        <div className={classes.stationRow}>
          <div className={classes.stationIconWrapper}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.79175 7.33333H13.4584M8.12508 2V7.33333M5.45841 12.6667L4.12508 14.6667M12.1251 14.6667L10.7917 12.6667M5.45841 10H5.46508M10.7917 10H10.7984M4.12508 2H12.1251C12.8615 2 13.4584 2.59695 13.4584 3.33333V11.3333C13.4584 12.0697 12.8615 12.6667 12.1251 12.6667H4.12508C3.3887 12.6667 2.79175 12.0697 2.79175 11.3333V3.33333C2.79175 2.59695 3.3887 2 4.12508 2Z"
                stroke="#539676"
                strokeWidth="1.44"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className={classes.stationName}>{toStation}</p>
        </div>
      </div>

      <svg
        width="17"
        height="8"
        viewBox="0 0 17 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={classes.popupArrow}
      >
        <path
          d="M7.3 4.90024L4 0.500244H13L9.7 4.90024C9.1 5.70024 7.9 5.70024 7.3 4.90024Z"
          fill="white"
        />
        <path
          d="M5.4541 6.59375C7.09786 8.53145 10.1501 8.46699 11.7002 6.40039L16.125 0.5H13L9.7002 4.90039L9.58105 5.04102C8.95267 5.69716 7.86232 5.65022 7.2998 4.90039L4 0.5H0.875L5.2998 6.40039L5.4541 6.59375Z"
          fill="#A7D6BD"
        />
      </svg>
    </div>
  );
};

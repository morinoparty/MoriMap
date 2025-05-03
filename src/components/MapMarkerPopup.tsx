import { cx, sva } from "../../styled-system/css";
import React from "react";

export const MapMarkerPopupStyles = sva({
  slots: [
    "root",
    "header",
    "headerIcon",
    "headerTitle",
    "ownerRow",
    "ownerAvatar",
    "ownerName",
    "divider",
    "trustListWrapper",
    "trustListSection",
    "trustListLabel",
    "trustListUl",
    "popupArrow",
  ],
  base: {
    root: {
      width: "auto",
      maxWidth: "200px",
      border: "2.5px solid #A7D6BD",
      px: "12px",
      py: "10px",
      borderRadius: "10px",
    },
    header: {
      display: "flex",
      alignItems: "center",
      gap: "2px",
    },
    headerIcon: {},
    headerTitle: {
      fontSize: "12px",
      margin: "0 !important",
      fontWeight: "bold",
      color: "#488669",
      whiteSpace: "nowrap",
    },
    ownerRow: {
      display: "flex",
      alignItems: "center",
      pt: "8px",
      gap: "8px",
    },
    ownerAvatar: {
      imageRendering: "pixelated",
      borderRadius: "4px",
    },
    ownerName: {
      fontSize: "14px",
      color: "#539676",
      lineHeight: "1",
      fontWeight: "bold",
      m: "0 !important",
    },
    divider: {
      my: "10px",
      border: "1px solid #EAF2EF",
    },
    trustListWrapper: {
      fontSize: "13px",
      color: "#3A5A40",
    },
    trustListSection: {
      "& + &": {
        mt: "10px",
      },
    },
    trustListLabel: {
      fontWeight: "bold",
      fontSize: "12px",
      color: "#7DBD9D",
      lineHeight: "1",
      display: "inline-block",
      width: "100%",
      fontFamily: "monospace",
      pb: "2px",
    },
    trustListUl: {
      listStyle: "none",
      padding: "0",
      margin: "0",
      fontWeight: "bold",
      fontSize: "14px",
      color: "#488669",
      lineHeight: "1.2",
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

export const MapMarkerPopup: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, className, style }) => {
  const classes = MapMarkerPopupStyles();
  return (
    <div className={cx(classes.root, className, "text-popup")} style={style}>
      <div className={cx(classes.header, className)}>
        <p className={classes.headerTitle}>{children}</p>
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

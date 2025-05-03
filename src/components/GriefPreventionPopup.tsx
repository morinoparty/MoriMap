import { cx, sva } from "../../styled-system/css";
import { TrustJson } from "../utils/parseTrustHtmlToJson";
import React from "react";

export const GriefPreventionPopupStyles = sva({
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
      width: "200px",
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
      fontWeight: "bold",
      color: "#7DBD9D",
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

// Trustリスト部分
const TrustList: React.FC<{
  label: string;
  items: string[];
  className?: string;
}> = ({ label, items, className }) => {
  const classes = GriefPreventionPopupStyles();
  return items.length === 0 ? null : (
    <div className={cx(className, classes.trustListSection)}>
      <span className={classes.trustListLabel}>{label}:</span>
      <ul className={classes.trustListUl}>
        {items.map((v, i) => (
          <li key={label + "-" + i}>{v}</li>
        ))}
      </ul>
    </div>
  );
};

export const GriefPreventionPopup: React.FC<{
  data: TrustJson;
  className?: string;
  style?: React.CSSProperties;
}> = ({ data, className, style }) => {
  const classes = GriefPreventionPopupStyles();
  return (
    <div
      className={cx(classes.root, className, "grief-prevention-popup")}
      style={style}
    >
      <div className={cx(classes.header, className)}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={classes.headerIcon}
        >
          <g clipPath="url(#clip0_271_2302)">
            <path
              d="M8.00003 5.33334L12 3.33334L8.00003 1.33334V8.00001M5.33337 7.99334L1.6667 10.0867C1.5641 10.1448 1.47876 10.2291 1.41939 10.331C1.36002 10.4329 1.32874 10.5487 1.32874 10.6667C1.32874 10.7846 1.36002 10.9004 1.41939 11.0023C1.47876 11.1042 1.5641 11.1885 1.6667 11.2467L7.33337 14.4867C7.53606 14.6037 7.76599 14.6653 8.00003 14.6653C8.23408 14.6653 8.46401 14.6037 8.6667 14.4867L14.3334 11.2467C14.436 11.1885 14.5213 11.1042 14.5807 11.0023C14.6401 10.9004 14.6713 10.7846 14.6713 10.6667C14.6713 10.5487 14.6401 10.4329 14.5807 10.331C14.5213 10.2291 14.436 10.1448 14.3334 10.0867L10.6667 8.00001M4.3267 8.56668L11.6734 12.7667M11.6734 8.56668L4.33337 12.7667"
              stroke="#7DBD9D"
              strokeWidth="1.44"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_271_2302">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <h2 className={classes.headerTitle}>
          {data.type === "claim" && "保護"}
          {data.type === "Administrator Claim" && "運営の保護"}
        </h2>
      </div>

      {data.type === "claim" && (
        <div className={cx(classes.ownerRow, className)}>
          <img
            width="24"
            height="24"
            src={`https://mc-heads.net/avatar/${data.owner}/24`}
            alt="avatar"
            className={classes.ownerAvatar}
          />
          <p className={classes.ownerName}>{data.owner}</p>
        </div>
      )}

      {(data.permissionTrust.length > 0 ||
        data.trust.length > 0 ||
        data.containerTrust.length > 0 ||
        data.accessTrust.length > 0) && <hr className={classes.divider} />}

      <div className={classes.trustListWrapper}>
        <TrustList label="Permission Trust" items={data.permissionTrust} />
        <TrustList label="Trust" items={data.trust} />
        <TrustList label="Container Trust" items={data.containerTrust} />
        <TrustList label="Access Trust" items={data.accessTrust} />
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

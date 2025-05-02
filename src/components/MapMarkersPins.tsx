import { css } from "../../styled-system/css";

export const MapMarkersPinText: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div
      className={css({
        position: "relative",
        width: "1px",
        height: "1px",
        fontWeight: "bold",
        fontSize: "14px",
        lineHeight: "1.1",
        color: "#EAF2EF",
        whiteSpace: "nowrap",
        zIndex: 2,
        _before: {
          content: "var(--city-name)",
          position: "absolute",
          top: "50%",
          left: "50%",
          color: "#488669",
          textAlign: "center",
          transform: "translate(-50%, -50%)",
        },
        _after: {
          content: "var(--city-name)",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          WebkitTextFillColor: "#488669",
          WebkitTextStroke: "3px #EAF2EF",
          zIndex: -1,
          textAlign: "center",
        },
      })}
      style={
        {
          "--city-name": `"${text}"`,
        } as React.CSSProperties
      }
    ></div>
  );
};

export const MapMarkersPinPin: React.FC = () => {
  return (
    <div>
      <svg
        width="30"
        height="33"
        viewBox="0 0 30 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={css({
          zIndex: -1,
        })}
      >
        <path
          d="M25 23L18.7002 31.4004C17.1501 33.467 14.0979 33.5314 12.4541 31.5938L12.2998 31.4004L6 23H25ZM11 25.5L14.2998 29.9004C14.8623 30.6502 15.9527 30.6972 16.5811 30.041L16.7002 29.9004L20 25.5H11Z"
          fill="#A7D6BD"
        />
        <path
          d="M14.3 29.9L11 25.5H20L16.7 29.9C16.1 30.7 14.9 30.7 14.3 29.9Z"
          fill="white"
        />
        <rect
          x="1.25"
          y="1.25"
          width="27.5"
          height="27.5"
          rx="8.75"
          fill="white"
        />
        <rect
          x="1.25"
          y="1.25"
          width="27.5"
          height="27.5"
          rx="8.75"
          stroke="#A7D6BD"
          strokeWidth="2.5"
        />
        <path
          d="M20.3333 13.6667C20.3333 16.9953 16.6406 20.462 15.4006 21.5327C15.2851 21.6195 15.1445 21.6665 15 21.6665C14.8554 21.6665 14.7148 21.6195 14.5993 21.5327C13.3593 20.462 9.66663 16.9953 9.66663 13.6667C9.66663 12.2522 10.2285 10.8956 11.2287 9.89543C12.2289 8.89523 13.5855 8.33333 15 8.33333C16.4144 8.33333 17.771 8.89523 18.7712 9.89543C19.7714 10.8956 20.3333 12.2522 20.3333 13.6667Z"
          stroke="#539676"
          strokeWidth="1.44"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 15.6667C16.1045 15.6667 17 14.7712 17 13.6667C17 12.5621 16.1045 11.6667 15 11.6667C13.8954 11.6667 13 12.5621 13 13.6667C13 14.7712 13.8954 15.6667 15 15.6667Z"
          stroke="#539676"
          strokeWidth="1.44"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.3 29.9L11 25.5H20L16.7 29.9C16.1 30.7 14.9 30.7 14.3 29.9Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

export const MapMarkersPinPinFill: React.FC = () => {
  return (
    <div>
      <svg
        width="30"
        height="33"
        viewBox="0 0 30 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={css({
          zIndex: -1,
        })}
      >
        <path
          d="M25 23L18.7002 31.4004C17.1501 33.467 14.0979 33.5314 12.4541 31.5938L12.2998 31.4004L6 23H25ZM11 25.5L14.2998 29.9004C14.8623 30.6502 15.9527 30.6972 16.5811 30.041L16.7002 29.9004L20 25.5H11Z"
          fill="#7DBD9D"
        />
        <path
          d="M14.3 29.9L11 25.5H20L16.7 29.9C16.1 30.7 14.9 30.7 14.3 29.9Z"
          fill="#539676"
        />
        <rect
          x="1.25"
          y="1.25"
          width="27.5"
          height="27.5"
          rx="8.75"
          fill="#539676"
        />
        <rect
          x="1.25"
          y="1.25"
          width="27.5"
          height="27.5"
          rx="8.75"
          stroke="#7DBD9D"
          strokeWidth="2.5"
        />
        <path
          d="M20.3333 13.6667C20.3333 16.9953 16.6406 20.462 15.4006 21.5327C15.2851 21.6195 15.1445 21.6665 15 21.6665C14.8554 21.6665 14.7148 21.6195 14.5993 21.5327C13.3593 20.462 9.66663 16.9953 9.66663 13.6667C9.66663 12.2522 10.2285 10.8956 11.2287 9.89543C12.2289 8.89523 13.5855 8.33333 15 8.33333C16.4144 8.33333 17.771 8.89523 18.7712 9.89543C19.7714 10.8956 20.3333 12.2522 20.3333 13.6667Z"
          stroke="white"
          strokeWidth="1.44"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 15.6667C16.1045 15.6667 17 14.7712 17 13.6667C17 12.5621 16.1045 11.6667 15 11.6667C13.8954 11.6667 13 12.5621 13 13.6667C13 14.7712 13.8954 15.6667 15 15.6667Z"
          stroke="white"
          strokeWidth="1.44"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.3 29.9L11 25.5H20L16.7 29.9C16.1 30.7 14.9 30.7 14.3 29.9Z"
          fill="#539676"
        />
      </svg>
    </div>
  );
};

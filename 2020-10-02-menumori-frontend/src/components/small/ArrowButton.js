const ArrowButton = ({ title, children }) => {
  return (
    <button className="btn btn-primary inline-flex items-center ml-2">
      {title || children}
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        className="w-4 h-4 ml-2"
        viewBox="0 0 24 24"
      >
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button>
  );
};

export default ArrowButton;

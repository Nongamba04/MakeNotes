export default function Button({ text, styles,handleSubmit }) {
    const { color, colorHover } = styles;
  
    return (
      <button
        className="w-[10rem] py-3 px-4 rounded-lg transition ease-in-out duration-200 font-bold flex justify-center items-center"
        style={{
          backgroundColor: color,
          borderColor: color,
          color: "#fff",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colorHover)} // Hover effect
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = color)} // Remove hover effect
        onClick={handleSubmit}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path
            fill="currentColor"
            d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
          ></path>
        </svg>
        {text}
      </button>
    );
  }
  
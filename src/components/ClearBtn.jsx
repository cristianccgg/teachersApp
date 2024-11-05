function ClearBtn({ onClick }) {
  return (
    <button
      className="bg-pink-500 w-24 text-white font-semibold px-4 py-2 rounded-md block text-nowrap"
      onClick={onClick}
    >
      Clear All
    </button>
  );
}

export default ClearBtn;

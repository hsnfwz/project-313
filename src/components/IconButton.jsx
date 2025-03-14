function IconButton({
  children,
  handleClick,
  isDisabled,
  isLoading,
  tailwindColor,
}) {
  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={handleClick}
      className={`${tailwindColor ? `bg-${tailwindColor}-500 hover:bg-${tailwindColor}-700` : 'bg-transparent hover:bg-neutral-700'} flex rounded-full border-2 border-transparent fill-white p-2 focus:border-2 focus:border-white focus:outline-none focus:ring-0 disabled:pointer-events-none disabled:opacity-50`}
    >
      {isLoading && (
        <div className="h-[24px] w-[24px] animate-spin rounded-full border-2 border-t-0 bg-sky-500"></div>
      )}
      {!isLoading && <>{children}</>}
    </button>
  );
}

export default IconButton;

export default function ErrorMessage() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow gap-4 px-16 text-xl">
      <p className="text-secondary text-center opacity-75">
        An error occurred, please try again
      </p>
      <button
        className="bg-primary rounded-xl px-4 py-2 hover:scale-110"
        onClick={() => location.reload()}
      >
        Reload
      </button>
    </div>
  );
}

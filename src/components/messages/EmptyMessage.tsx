export default function EmptyMessage({ message }: { message: string }) {
  return (
    <p className="grid place-items-center flex-grow text-xl text-secondary text-center opacity-75">
      {message}
    </p>
  );
}

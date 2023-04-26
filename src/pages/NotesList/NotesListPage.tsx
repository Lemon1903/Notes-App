import { FaPlus } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useSearchValue } from "../../components/Header";
import { EmptyMessage, ErrorMessage } from "../../components/messages";
import { useNotes } from "../../hooks/useNotes";
import NoteListItem from "./NoteListItem";

export default function NotesListPage() {
  const { notes, setNotes } = useNotes();
  const searchValue = useSearchValue();
  const pathname = useLocation().pathname;

  if (notes === undefined) {
    return <EmptyMessage message="Loading Notes..." />;
  } else if (notes === null) {
    return <ErrorMessage />;
  }

  let filteredNotes = notes.slice();
  if (pathname === "/favorites") {
    filteredNotes = notes.filter((note) => note.isFavorite);

    if (filteredNotes.length === 0) {
      return <EmptyMessage message="You have no favorites" />;
    }
  }

  // filter notes based on search input
  filteredNotes = filteredNotes.filter(
    (note) =>
      note.content?.toLowerCase().includes(searchValue.toLowerCase()) ||
      note.title?.toLowerCase().includes(searchValue.toLowerCase())
  );

  if (notes.length > 0 && filteredNotes.length === 0) {
    return <EmptyMessage message="No matching results" />;
  }

  function setFavorite(id?: number, isFavorite?: boolean) {
    if (notes) {
      setNotes(
        notes.map((note) => (note.id === id ? { ...note, isFavorite } : note))
      );
    }
  }

  return (
    <div className="flex flex-col flex-grow p-4 overflow-y-scroll">
      <div className="flex flex-col flex-grow gap-4">
        {filteredNotes.length === 0 ? (
          <EmptyMessage message="Create your first note" />
        ) : (
          filteredNotes.map((note) => (
            <NoteListItem key={note.id} note={note} setFavorite={setFavorite} />
          ))
        )}
      </div>
      {pathname === "/" && (
        <Link className="absolute right-8 bottom-24 text-white" to="notes/new">
          <button className="border-none rounded-2xl shadow-md shadow-gray-900 p-4 bg-primary duration-100 hover:scale-110">
            <FaPlus size={24} />
          </button>
        </Link>
      )}
    </div>
  );
}

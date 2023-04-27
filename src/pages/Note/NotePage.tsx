import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import EmptyMessage from "../../components/messages/EmptyMessage";
import ErrorMessage from "../../components/messages/ErrorMessage";
import { useNote } from "../../hooks/useNote";
import ColorButton from "./ColorButton";
import SaveButton from "./SaveButton";

export default function NotePage() {
  const { noteId } = useParams();
  const { note, setNoteValue, isUpdated } = useNote(noteId);

  const colors = localStorage.getItem("BG_COLORS");
  const bg_colors: string[] = colors
    ? JSON.parse(colors)
    : ["#FFFFFF", "#F9D54D", "#E96E5E", "#FAF29D", "#F3E9C6"];

  if (note === undefined) {
    return <EmptyMessage message="Loading Note..." />;
  } else if (note === null) {
    return <ErrorMessage />;
  }

  function handleInput(title?: string, content?: string) {
    setNoteValue({ ...note, title, content });
  }

  function handleClick(bgcolor: string) {
    setNoteValue({ ...note, bgcolor });
  }

  return (
    <div className="flex-grow flex flex-col gap-4 p-4 font-secondary">
      <input
        className={`rounded-lg py-3 px-4 font-bold placeholder:text-black placeholder:text-opacity-40`}
        style={{ backgroundColor: `${note.bgcolor}` }}
        type="text"
        placeholder="Title"
        value={note?.title}
        onChange={(e) => handleInput(e.target.value, note.content)}
      />
      <textarea
        className={`flex-grow resize-none rounded-lg p-3 px-4 placeholder:text-black placeholder:text-opacity-40`}
        style={{ backgroundColor: `${note.bgcolor}` }}
        placeholder="Text"
        value={note?.content}
        onChange={(e) => handleInput(note.title, e.target.value)}
      ></textarea>
      <div className="flex flex-wrap items-center gap-x-2 text-sm text-white">
        <p className="mb-1 w-full">Select Color</p>
        <button className="border-2 rounded-full w-4 h-4 duration-100 hover:scale-125">
          <FaPlus className="m-auto" size={8} />
        </button>
        {bg_colors.map((bg_color, index) => (
          <ColorButton
            key={index}
            color={bg_color}
            scale={bg_color === note?.bgcolor ? "scale-125" : ""}
            handleClick={handleClick}
          />
        ))}
        <SaveButton note={note} isUpdated={isUpdated} />
      </div>
    </div>
  );
}

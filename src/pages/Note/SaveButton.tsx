import { FaCheck } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { INote } from "../../types";

interface ISaveButtonProps {
  note?: INote;
  isUpdated: boolean;
}

export default function SaveButton(props: ISaveButtonProps) {
  const { noteId } = useParams();
  const { note, isUpdated } = props;

  function handleAction(method: string, id?: string) {
    fetch(`https://quartz-colossal-constellation.glitch.me/notes/${id}`, {
      method: method,
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ ...note, updated: new Date().toJSON() }),
    });
  }

  function onSubmit() {
    if (!isUpdated) return;

    if (noteId === "new") {
      if (note?.content && note?.title) {
        handleAction("POST", "");
      }
    } else {
      if (note?.content || note?.title) {
        handleAction("PUT", noteId);
      } else {
        handleAction("DELETE", noteId);
      }
    }
  }

  return (
    <Link className="group ml-auto duration-100 hover:text-green-500" to="/">
      <button className="flex items-center gap-2" onClick={onSubmit}>
        <div className="border-2 rounded-full p-2 group-hover:border-green-500">
          <FaCheck size={12} />
        </div>
        Save the note
      </button>
    </Link>
  );
}

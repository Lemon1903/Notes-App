import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { INote } from "../../types";

interface ISaveButtonProps {
  note?: INote;
  isUpdated: boolean;
}

export default function SaveButton(props: ISaveButtonProps) {
  const { noteId } = useParams();
  const { note, isUpdated } = props;
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);

  function handleAction(method: string, id?: string) {
    setIsUpdating(true);
    fetch(`https://quartz-colossal-constellation.glitch.me/notes/${id}`, {
      method: method,
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ ...note, updated: new Date().toJSON() }),
    })
      .then(() => {
        navigate("/");
        setIsUpdating(false);
      })
      .catch((err) => {
        alert(err);
        setIsUpdating(false);
      });
  }

  function onSubmit() {
    if (!isUpdated) navigate("/");

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
    <button
      className="group flex items-center gap-2 ml-auto duration-100 hover:text-green-500 disabled:text-gray-400"
      disabled={isUpdating}
      onClick={onSubmit}
    >
      <div className="border-2 rounded-full p-2 group-hover:border-green-500 group-disabled:border-gray-400">
        <FaCheck size={12} />
      </div>
      Save the note
    </button>
  );
}

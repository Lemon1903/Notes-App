import { useEffect, useState } from "react";
import { INote } from "../types";

export function useNote(noteId?: string) {
  const [isUpdated, setIsUpdated] = useState(false);
  const [note, setNote] = useState<INote | undefined | null>();

  useEffect(() => {
    if (noteId === "new") {
      setNote({
        title: "",
        content: "",
        isFavorite: false,
        bgcolor: "#FFFFFF",
      });
      return;
    }

    fetch(`https://quartz-colossal-constellation.glitch.me/notes/${noteId}`)
      .then((response) => response.json())
      .then(setNote)
      .catch((err) => {
        console.log(err);
        setNote(null);
      });
  }, []);

  function setNoteValue(changes: INote) {
    setNote(changes);
    setIsUpdated(true);
  }

  return { note, setNoteValue, isUpdated };
}

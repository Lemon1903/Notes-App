import { useEffect, useState } from "react";
import { INote } from "../types";

export function useNotes() {
  const [notes, setNotes] = useState<INote[] | null | undefined>();

  useEffect(() => {
    fetch("https://quartz-colossal-constellation.glitch.me/notes/")
      .then((response) => response.json())
      .then((data: Array<INote>) => {
        const sortedNotes = data.sort(comparingFunction);
        setNotes(sortedNotes);
      })
      .catch((err) => {
        console.log(err);
        setNotes(null);
      });
  }, []);

  function comparingFunction(a: INote, b: INote) {
    if (a.updated && b.updated) {
      if (a.updated < b.updated) return 1;
      if (a.updated > b.updated) return -1;
    }
    return 0;
  }

  return { notes, setNotes };
}

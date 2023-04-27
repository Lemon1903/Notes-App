import moment from "moment";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { INote } from "../../types";

interface INoteListItemProps {
  note: INote;
  setFavorite: Function;
}

export default function NoteListItem(props: INoteListItemProps) {
  const { note, setFavorite } = props;
  const noteContents = note.content?.split("\n");
  const timesince = moment
    .utc(new Date(note.updated ? note.updated : ""))
    .fromNow();

  function handleSetIsFavorite(e: React.MouseEvent) {
    e.preventDefault();
    fetch(`https://quartz-colossal-constellation.glitch.me/notes/${note.id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ ...note, isFavorite: !note.isFavorite }),
    });
    setFavorite(note.id, !note.isFavorite);
  }

  return (
    <Link to={`notes/${note?.id}`}>
      <div
        className={`flex flex-col gap-2 rounded-lg rounded-br-none px-4 py-3 font-secondary hover:brightness-125`}
        style={{ backgroundColor: `${note.bgcolor}` }}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg">{note.title}</h3>
          <button className="hover:scale-110" onClick={handleSetIsFavorite}>
            {note.isFavorite ? (
              <BsHeartFill size="20" />
            ) : (
              <BsHeart size="20" />
            )}
          </button>
        </div>
        <div className="break-words">
          {noteContents?.map((content, index) => (
            <p key={index}>{content}</p>
          ))}
        </div>
        <p className="text-sm opacity-50">Last updated {timesince}</p>
      </div>
    </Link>
  );
}

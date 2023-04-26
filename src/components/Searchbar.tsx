import { FaSearch } from "react-icons/fa";

interface ISearchbarProps {
  value: string;
  onChange: Function;
}

export default function Searchbar(props: ISearchbarProps) {
  const { value, onChange } = props;

  return (
    <form>
      <div className="group flex items-center gap-2 border-2 border-black border-opacity-30 focus-within:border-opacity-100 rounded-lg px-3 py-1 w-full font-secondary">
        <input
          className="w-full bg-transparent outline-none placeholder:text-black placeholder:text-opacity-30"
          type="text"
          placeholder="Search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="text-inherit opacity-30 group-focus-within:opacity-100">
          <FaSearch />
        </div>
      </div>
    </form>
  );
}

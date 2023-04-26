interface IColorButtonProps {
  color: string;
  scale: string;
  handleClick: (color: string) => void;
}

export default function ColorButton(props: IColorButtonProps) {
  const { color, scale, handleClick } = props;

  return (
    <button
      className={`${scale} rounded-full w-4 h-4 duration-100 hover:scale-125`}
      style={{ backgroundColor: `${color}` }}
      onClick={() => handleClick(color)}
    ></button>
  );
}

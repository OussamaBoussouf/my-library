import Button from "../ui/Button";
import Menu from "../ui/Menu";
import { Star, Trash } from "lucide-react";
import { InfoBook } from "../../utils/type";

function SingelBook({book} : InfoBook) {
  return (
    <div className="relative">
      <Menu>
        <Menu.Item icon={<Star />}>Favorite</Menu.Item>
        <Menu.Item icon={<Trash />}>Move to trash</Menu.Item>
      </Menu>
      <img src={book.imageUrl} height={336} width={210} alt="book cover" className="w-full" />
      <h2 className="my-3 text-lg capitalize">{book.title}</h2>
      <Button>Read now</Button>
    </div>
  );
}

export default SingelBook;

import { Book, Star, Trash} from "lucide-react";
import { Link } from "react-router-dom";

function Aside() {
  return (
    <aside className="w-[200px] h-screen sticky top-5">
      <div className="flex flex-col gap-8">
        <Link to="/dashboard/all-books" className="flex gap-2 hover:text-blue-500" type="button">
          <Book /> All books
        </Link>
        <Link to="/dashboard/favorites-books" className="flex gap-2 hover:text-blue-500" type="button">
          <Star /> Favorites
        </Link>
        <Link to="/dashboard/trash" className="flex gap-2 hover:text-blue-500" type="button">
          <Trash /> Trash
        </Link>
      </div>
    </aside>
  );
}

export default Aside;

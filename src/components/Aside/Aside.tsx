import { Book, Star, Trash} from "lucide-react";
import { Link, useParams } from "react-router-dom";

function Aside() {
  const {id} = useParams();
  return (
    <aside className="w-[150px] hidden md:block h-screen sticky top-5">
      <div className="flex flex-col gap-8">
        <Link to="/dashboard/all-books" className={`flex gap-2 ${id === "all-books" && "text-blue-500"}  hover:text-blue-500` }type="button">
          <Book /> All books
        </Link>
        <Link to="/dashboard/favorites-books" className={`flex gap-2 ${id === "favorites-books" && "text-blue-500"}`}type="button">
          <Star /> Favorites
        </Link>
        <Link to="/dashboard/trash" className={`flex gap-2 ${id === "trash" && "text-blue-500"}`} type="button">
          <Trash /> Trash
        </Link>
      </div>
    </aside>
  );
}

export default Aside;

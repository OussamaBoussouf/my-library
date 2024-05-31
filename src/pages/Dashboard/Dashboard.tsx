import Aside from "../../components/Aside/Aside";
import { useParams } from "react-router-dom";
import AllBooks from "./AllBooks";
import FavoriteBooks from "./FavoriteBooks";
import TrashBooks from "./TrashBooks";


function Dashboard() {
  const id = useParams().id;
  return (
    <div className="flex gap-5 max-w-[1200px] mt-20 mx-auto">
      <Aside />
      <main className="flex-grow">
        {id === "all-books" ? (
          <AllBooks />
        ) : id === "favorites-books" ? (
          <FavoriteBooks />
        ) : (
          <TrashBooks />
        )}
      </main>
    </div>
  );
}

export default Dashboard;

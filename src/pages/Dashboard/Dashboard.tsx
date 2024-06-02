import Aside from "../../components/Aside/Aside";
import { useParams } from "react-router-dom";
import AllBooks from "./AllBooks";
import UploadModal from "../../components/Upload_Modal/UploadModal";
import { useState } from "react";


interface NavigationInfo {
  [index: string]: {
    title: string;
    colcName: string;
  };
}
const categories = ["all", "drama", "non-fiction", "fiction"];
const navigationInfo: NavigationInfo = {
  "all-books": {
    title: "All Books",
    colcName: "books",
  },
  "favorite-books": {
    title: "Favorite Books",
    colcName: "favorites",
  },
  trash: {
    title: "Trash",
    colcName: "trash",
  },
};

function Dashboard() {
  const id = useParams().id as string;
  const [selectedCat, setSelectedCat] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex gap-5 max-w-[1200px] mt-20 mx-auto">
      <Aside />
      <main className="flex-grow">
        <div className="flex justify-between mb-4">
          <h2 className="text-4xl font-poetsenOne">
            {navigationInfo[id].title}
          </h2>
          <UploadModal />
        </div>
        <div className="flex justify-between">
          <input
            type="search"
            name="search"
            id="search"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-200 p-1"
          />
          <select
            onChange={(e) => setSelectedCat(e.target.value)}
            name="categroy"
            id="category"
            className="bg-gray-200 p-1"
          >
            {categories.map((category) => (
              <option key={category} value={category == "all" ? "" : category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <AllBooks subCollection={navigationInfo[id].colcName} selectedCat={selectedCat} searchTerm={searchTerm} />
      </main>
    </div>
  );
}

export default Dashboard;

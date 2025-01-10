import search from "../../assets/search.svg";

function EmptySearch() {
    return (
        <div className="text-center mt-20 flex flex-col items-center">
        <img className="mb-10 w-52" src={search} alt="search icon" />
        <h2 className="text-2xl font-bold mb-5">No results found</h2>
        <p className="w-60">
          Try adjusting your search to find what you are looking for
        </p>
      </div>
    );
}

export default EmptySearch;
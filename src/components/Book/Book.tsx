import { Link, useParams } from "react-router-dom";
import Button from "../ui/Button";
import Menu from "../ui/Menu";

function Book({
  image,
  title,
  fileUrl,
  id,
}: {
  image: string;
  title: string;
  fileUrl: string;
  id: string;
}) {
  const url = useParams().id as string;

  return (
    <div className="w-[240px] rounded-lg relative border-[1px] py-5 text-center">
      <Menu documentId={id} />
      <img
        className="object-contain mx-auto w-[150px] h-[220px]"
        width={150}
        height={220}
        src={image}
        alt="book cover"
      />
      <p className="text-xl font-poetsenOne my-2">{title}</p>
      {url === "trash" ? null : (
        <Link to={`${fileUrl}`} target="_blank">
          <Button className="mx-auto text-sm">Read</Button>
        </Link>
      )}
    </div>
  );
}

export default Book;

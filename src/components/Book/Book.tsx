import Button from "../ui/Button";
import Menu from "../ui/Menu";

function Book({ image }: { image: string }) {
  return (
    <div className="w-[240px] rounded-lg relative border-[1px] py-5 text-center">
      <Menu/>
      <img
        className="object-cover mx-auto rounded-md w-[200px] h-[300px]"
        width={200}
        height={300}
        src={image}
        alt="book cover"
      />
      <p className="text-xl font-poetsenOne my-2">Book Title</p>
      <Button>Read Book</Button>
    </div>
  );
}

export default Book;

import SingelBook from "../components/Singel-book/SingelBook";
import { useFetch } from "../hooks/useFetch";

function Home() {
  const { data } = useFetch();

  return (
    <>
      {data.map((book, index) => (
        <SingelBook key={index} book={book} />
      ))}
      {/* <SingelBook />
      <SingelBook />
      <SingelBook />
      <SingelBook />
      <SingelBook />
      <SingelBook />
      <SingelBook /> */}
    </>
  );
}

export default Home;

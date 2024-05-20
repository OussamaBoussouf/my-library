import Button from "../components/ui/Button";

function Home() {
  return (
    <main className="flex flex-col h-[calc(100vh-76px)] justify-center items-center">
      <div className="max-w-[800px] text-center px-3 md:px-0">
        <h1 className="text-5xl md:text-7xl font-poetsenOne mb-10 text-center">
          Your Personal <span className="text-red-600">PDF</span> Library Online
        </h1>
        <p className="font-semibold md:text-xl mb-6">
          Experience the convenience of reading your PDF books online. Upload
          your files and access them from anywhere with our intuitive platform.
        </p>
        <Button className="text-xl max-w-fit font-semibold rounded-full text-white bg-indigo-500 hover:bg-indigo-700 px-12 py-4">
          Start free with Google
        </Button>
      </div>
    </main>
  );
}

export default Home;

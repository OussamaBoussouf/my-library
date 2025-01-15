import { CircleX } from 'lucide-react';

function EmptySection() {
    return (
        <div className="flex items-center justify-center flex-col py-4 rounded-lg bg-gray-100">
        <CircleX size={45} color="red" className="mb-2" />
        <h2 className="text-xl text-black font-bold mb-2">No books found.</h2>
        <p className="text-gray-500">
          There are no books to show in this section
        </p>
      </div>
    );
}

export default EmptySection;
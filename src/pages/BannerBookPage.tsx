import { useGetBooksQuery } from "@/features/books/book.api";
import { useNavigate } from "react-router";

const BannerBookPage = () => {
  const { data } = useGetBooksQuery(undefined);
  const navigate = useNavigate();

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.data?.map((book: any) => (
        <div
          key={book._id}
          className="border rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 bg-white"
        >
          <h2 className="text-xl font-semibold mb-1 text-gray-800">{book.title}</h2>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Author:</span> {book.author}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Genre:</span> {book.genre}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">ISBN:</span> {book.isbn}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Copies:</span> {book.copies}
          </p>
          <p className="text-sm mb-3">
            <span className="font-medium">Available:</span>{" "}
            {book.copies > 0 ? (
              <span className="text-green-600 font-semibold">Yes</span>
            ) : (
              <span className="text-red-500 font-semibold">No</span>
            )}
          </p>
          <button
            onClick={() => navigate(`books`)}
            className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
          >
            View 
          </button>
        </div>
      ))}
    </div>
  );
};

export default BannerBookPage;

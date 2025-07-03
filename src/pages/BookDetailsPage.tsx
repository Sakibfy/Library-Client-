
import { useGetBookByIdQuery, useDeleteBookMutation } from '@/features/books/book.api';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';

/**
 * BookDetailsPage
 * ----------------------------------------
 * Route: /books/:bookId
 * Description: Shows all information about a single book
 *              and provides Edit / Delete / Borrow actions.
 */
export default function BookDetailsPage() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetBookByIdQuery(bookId as string);
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async () => {
    if (!bookId) return;
    const ok = window.confirm('Are you sure you want to delete this book?');
    if (!ok) return;

    try {
      await deleteBook(bookId).unwrap();
      toast.success('Book deleted');
      navigate('/books');
    } catch {
      toast.error('Failed to delete book');
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading book...</p>;
  if (isError || !data?.data)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load book details
      </p>
    );

  const book = data.data;

  return (
    <section className="max-w-3xl mx-auto p-6 bg-white shadow rounded-xl mt-8">
      <header className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-bold">{book.title}</h2>
          <p className="text-gray-500">by {book.author || 'Unknown'}</p>
        </div>

        <div className="space-x-2">
          <button
            onClick={() => navigate(`/edit-book/${book._id}`)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
          <button
            onClick={() => navigate(`/borrow/${book._id}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
            disabled={book.copies === 0}
          >
            Borrow
          </button>
        </div>
      </header>

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div>
          <dt className="font-medium text-gray-600">Genre</dt>
          <dd>{book.genre || 'N/A'}</dd>
        </div>
        <div>
          <dt className="font-medium text-gray-600">ISBN</dt>
          <dd>{book.isbn || 'N/A'}</dd>
        </div>
        <div>
          <dt className="font-medium text-gray-600">Copies</dt>
          <dd>{book.copies}</dd>
        </div>
        <div>
          <dt className="font-medium text-gray-600">Available</dt>
          <dd className={book.copies > 0 ? 'text-green-600' : 'text-red-600'}>
            {book.copies > 0 ? 'Yes' : 'No'}
          </dd>
        </div>
        {book.description && (
          <div className="sm:col-span-2">
            <dt className="font-medium text-gray-600">Description</dt>
            <dd className="whitespace-pre-wrap">{book.description}</dd>
          </div>
        )}
      </dl>
    </section>
  );
}

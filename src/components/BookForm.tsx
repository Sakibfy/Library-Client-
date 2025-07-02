import { useEffect, useState } from 'react';
import { useAddBookMutation, useUpdateBookMutation, useGetBookByIdQuery } from '../features/books/book.api';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const genres = ['Fiction', 'Non-fiction', 'Mystery', 'Science', 'Biography', 'Fantasy', 'Horror'];

export default function BookForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = !!id;

  const { data: existingBook } = useGetBookByIdQuery(id!, {
    skip: !isEditMode,
  });

  const [addBook] = useAddBookMutation();
  const [updateBook] = useUpdateBookMutation();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    description: '',
    copies: 1,
    available: true,
  });

  useEffect(() => {
    if (existingBook) {
      setFormData({
        title: existingBook.title,
        author: existingBook.author,
        genre: existingBook.genre,
        isbn: existingBook.isbn,
        description: existingBook.description || '',
        copies: existingBook.copies,
        available: existingBook.available ?? true,
      });
    }
  }, [existingBook]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateBook({ id: id!, updatedData: formData }).unwrap();
        toast.success('Book updated successfully!');
      } else {
        await addBook(formData).unwrap();
        toast.success('Book added successfully!');
      }
      navigate('/books');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white shadow-md p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center">
        {isEditMode ? '✏️ Edit Book' : '➕ Add New Book'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Author</label>
            <input
              type="text"
              name="author"
              required
              value={formData.author}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Genre</label>
            <select
              name="genre"
              required
              value={formData.genre}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select Genre</option>
              {genres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">ISBN</label>
            <input
              type="text"
              name="isbn"
              required
              value={formData.isbn}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Copies</label>
            <input
              type="number"
              name="copies"
              min={1}
              required
              value={formData.copies}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="flex items-center space-x-2 mt-6">
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label className="text-sm font-medium">Available</label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded w-full"
        >
          {isEditMode ? 'Update Book' : 'Add Book'}
        </button>
      </form>
    </div>
  );
}

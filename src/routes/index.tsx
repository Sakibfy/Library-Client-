import App from "@/App";
import BookForm from "@/components/BookForm";
import BorrowForm from "@/components/BorrowForm";
import BookDetailsPage from "@/pages/BookDetailsPage";
import BooksPage from "@/pages/BooksPage";
import BorrowSummaryPage from "@/pages/BorrowSummaryPage";
import EditBookForm from "@/pages/EditBookPage";
import { createBrowserRouter } from "react-router";


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'books',
        element: <BooksPage />
      },

      {
        path: 'books/:bookId',
        element: <BookDetailsPage />
      },
      {
        path: 'create-book',
        element: <BookForm />
      },
      {
        path: 'borrow-summary',
        element: <BorrowSummaryPage />
      },
   
      {
        path: 'borrow/:bookId',
        element: <BorrowForm />
      },
      {
        path: 'edit-book/:bookId',
        element: <EditBookForm />
      }
    ]
  }
]);

export default router;

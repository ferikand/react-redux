import { useDispatch, useSelector } from "react-redux"
import "./BookList.css"
import { deleteBook } from "../../redux/books/actionCreators.js"

const BookList = () => {
  const books = useSelector((state) => {
    // console.log(state)
    return state.books
  })
  const dispatch = useDispatch()

  const handleDeleteBook = (book) => {
    dispatch(deleteBook(book))
  }

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {books.map((book, i) => (
            <li key={book.id}>
              <div className="book-info">
                {++i + ". "}
                {book.title} by <strong>{book.author}</strong>
              </div>
              <div className="book-actions">
                <button type="button" onClick={() => handleDeleteBook(book)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BookList

import { useDispatch, useSelector } from "react-redux"
import { deleteBook, toggleFavorite } from "../../redux/books/actionCreators.js"
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs"
import {
  selectAuthorFilter,
  selectTitleFilter,
} from "../../redux/slices/filterSlice.js"
import "./BookList.css"

const BookList = () => {
  const books = useSelector((state) => state.books)
  const titleFilter = useSelector(selectTitleFilter)
  const authorFilter = useSelector(selectAuthorFilter)
  const dispatch = useDispatch()

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id))
  }

  const handleDeleteBook = (book) => {
    dispatch(deleteBook(book))
  }

  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase())

    const matchesAuthor = book.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase())

    return matchesTitle && matchesAuthor
  })

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {filteredBooks.map((book, i) => (
            <li key={book.id}>
              <div className="book-info">
                {++i + ". "}
                {book.title} by <strong>{book.author}</strong>
              </div>
              <div className="book-actions">
                <span onClick={() => handleToggleFavorite(book.id)}>
                  {book.isFavorite ? (
                    <BsBookmarkStarFill className="star-icon" />
                  ) : (
                    <BsBookmarkStar className="star-icon" />
                  )}
                </span>
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

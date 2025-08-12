import { useDispatch, useSelector } from "react-redux"
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs"
import {
  selectAuthorFilter,
  selectOnlyFavorite,
  selectTitleFilter,
} from "../../redux/slices/filterSlice.js"
import "./BookList.css"
import {
  selectBooks,
  setDeleteBook,
  setToggleFavorite,
} from "../../redux/slices/booksSlice.js"

const BookList = () => {
  const books = useSelector(selectBooks)
  const titleFilter = useSelector(selectTitleFilter)
  const authorFilter = useSelector(selectAuthorFilter)
  const onlyFavoriteFilter = useSelector(selectOnlyFavorite)
  const dispatch = useDispatch()

  const handleToggleFavorite = (id) => {
    dispatch(setToggleFavorite(id))
  }

  const handleDeleteBook = (book) => {
    dispatch(setDeleteBook(book))
  }

  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase())

    const matchesAuthor = book.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase())

    const matchesOnlyFavorite = !onlyFavoriteFilter || book.isFavorite

    return matchesTitle && matchesAuthor && matchesOnlyFavorite
  })

  const highlightMatch = (text, filter) => {
    if (!filter) return text

    const regex = new RegExp(`(${filter})`, "gi")

    return text.split(regex).map((substring, i) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span className="highlight" key={i}>
            {substring}
          </span>
        )
      }
      return substring
    })
  }

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
                {highlightMatch(book.title, titleFilter)} by{" "}
                <strong>{highlightMatch(book.author, authorFilter)}</strong>
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

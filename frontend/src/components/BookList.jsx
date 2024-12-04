import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useBookContext } from "../context/BookContext";

const BookList = () => {
    // Extracting books data and fetchBooks function from context
    const { books, fetchBooks } = useBookContext();

    /**
     * Fetch books when the component mounts
     * Ensures the latest book list is displayed
     */
    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    return (
        <div className="container mt-5">
            {/* Header with Add Book button */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Books List</h3>
                <Link to="/add-book" className="btn btn-primary">
                    Add Book
                </Link>
            </div>

            {/* Books table */}
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>S.No</th>
                            <th>Title</th>
                            <th>Author Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Show a message if no books are available */}
                        {books.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center">
                                    No books found.
                                </td>
                            </tr>
                        ) : (
                            // Map over the books array to display each book
                            books.map((book, index) => (
                                <tr key={book._id}>
                                    <td>{index + 1}</td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookList;

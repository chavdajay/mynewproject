import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBookContext } from "../context/BookContext";

const BookList = () => {
    const navigate = useNavigate();
    const { books, fetchBooks } = useBookContext();

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

   
    const bookList = Array.isArray(books?.data) ? books.data : [];

    const handleLogout = () => {
        // Remove the token from localStorage
        localStorage.removeItem("token");
        // Redirect to the login page
        navigate("/login");
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Books List</h3>
                <div>
                    <button onClick={handleLogout} className="btn btn-danger">
                        Logout
                    </button>
                    <Link to="/add-book" className="btn btn-primary ml-2">
                        Add Book
                    </Link>
                </div>
            </div>

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
                        {bookList.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center">
                                    No books found.
                                </td>
                            </tr>
                        ) : (
                            // Map over the books array to display each book
                            bookList.map((book, index) => (
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

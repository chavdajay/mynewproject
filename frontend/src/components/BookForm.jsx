import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useBookContext } from "../context/BookContext";

const BookForm = () => {
  const navigate = useNavigate();
  // Context for adding a new book
  const { addBook } = useBookContext();

  const [book, setBook] = useState({
    title: "",
    author: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  //Handles form submission and triggers the context function to add a new book

  const submitForm = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Add book using the context function
      await addBook(book);

      // Reset form fields
      setBook({ title: "", author: "" });

      // Display success toast notification
      toast.success("Book added successfully!", { position: "top-right" });

      // Redirect to the book list page
      navigate("/book-list");
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("Failed to add book. Please try again.", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="container mt-5">
      <Link to="/book-list" className="btn btn-secondary mb-3">
        Back
      </Link>

      <div className="card p-4">
        <h3 className="mb-4">Add New Book</h3>

        <form onSubmit={submitForm}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              placeholder="Book Name"
              value={book.title}
              onChange={inputHandler}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="author" className="form-label">
              Author Name
            </label>
            <input
              type="text"
              id="author"
              name="author"
              className="form-control"
              placeholder="Author Name"
              value={book.author}
              onChange={inputHandler}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookForm;

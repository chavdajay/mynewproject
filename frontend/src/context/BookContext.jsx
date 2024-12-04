import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const BookContext = createContext();

export const useBookContext = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  // Fetch books from backend
  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}books`, {
        headers: { Authorization: `Bearer ${token} `  },
      });
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error.message);
    }
  };

  // Add a new book
  const addBook = async (book) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${process.env.REACT_APP_API_URL}books`, book, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks((prevBooks) => [...prevBooks, response.data]); // Update context state
    } catch (error) {
        console.log(error)
      console.error('Error adding book:', error.message);

    }
  };

  return (
    <BookContext.Provider value={{ books, fetchBooks, addBook }}>
      {children}
    </BookContext.Provider>
  );
};
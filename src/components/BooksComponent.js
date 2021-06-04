import React, { useEffect, useState } from 'react'
import BooksSrv from '../services/BooksSrv';

export default function BooksComponent() {


  const [books, setBooks] = useState([]);


  useEffect(() => {

    const getBooks = async () => {
      const { data: { books } } = await BooksSrv.getBooks();
      setBooks(books || []);
    }

    getBooks();
  }, [])

  return (
    <div>

    </div>
  )
}

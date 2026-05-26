import axios from "axios";

const BASE_URL = "https://6a15bff791ff9a63de08bc7e.mockapi.io/books";

export const getBooks    = ()           => axios.get(BASE_URL);
export const addBook     = (book)       => axios.post(BASE_URL, book);
export const updateBook  = (id, book)   => axios.put(`${BASE_URL}/${id}`, book);
export const deleteBook  = (id)         => axios.delete(`${BASE_URL}/${id}`);
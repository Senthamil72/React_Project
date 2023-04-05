import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import background from "./background.jpg";
const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const onInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  let API_URL = `https://www.googleapis.com/books/v1/volumes`;
  const [books, setBooks] = useState({ items: [] });
  const fetchBooks = async () => {
    //call to API using Axios
    const result = await axios.get(`${API_URL}?q=${searchTerm}`);
    setBooks(result.data);
    // Books result
    console.log(result.data);
  };
  // Submit handler
  const onSubmitHandler = (e) => {
    // Prevent browser refreshing after form submission
    e.preventDefault();
    // Call fetch books async function
    fetchBooks();
  };

  const bookAuthors = (authors) => {
    if (authors.length <= 2) {
      authors = authors.join(" and ");
    } else if (authors.length > 2) {
      let lastAuthor = " and " + authors.slice(-1);
      authors.pop();
      authors = authors.join(", ");
      authors += lastAuthor;
    }
    return authors;
  };

  return (
    <section>
      <article
        className={App.article}
        style={{
          backgroundImage: `url(${background})`,
          paddingTop: "200px",
          paddingBottom: "400px",
        }}
      >
        <form onSubmit={onSubmitHandler}>
          <label>
            <center>
              <span>
                <h2 style={{ fontSize: "50px" }} className={App.header}>
                  Find Your Book!!
                </h2>
              </span>
              <br />
              <input
                type="search"
                placeholder="  Book Name"
                value={searchTerm}
                onChange={onInputChange}
                id="textBox1"
              />
              <div>
                <br />
                <button type="submit" id="textBox">
                  Search
                </button>
              </div>
            </center>
          </label>
        </form>
      </article>
      <ul>
        {books.items.map((book, index) => {
          return (
            
            <li key={index}>
              <div>
                <img
                  style={{ width: "100px", height: "100px" }}
                  alt={`${book.volumeInfo.title} book`}
                  src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                />
                <div>
                  <h3>{book.volumeInfo.title}</h3>
                  <p>{bookAuthors(book.volumeInfo.authors)}</p>

                  <p>{book.volumeInfo.publishedDate}</p>
                </div>
              </div>
              <hr />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default App;

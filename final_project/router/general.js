const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  if (isValid(username)) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ username, password });

  return res.status(200).json({ message: "User registered successfully" });
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).json(books);
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (book) {
    return res.status(200).json(book);
  }
  return res.status(404).json({ message: "Book not found" });
 
  //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
    let keys = Object.keys(books);
    let booksByAuthor = [];

    for (let i = 0; i < keys.length; i++) {
        if (books[keys[i]].author === author) {
            booksByAuthor.push(books[keys[i]]);
        }
    }

    return res.send(JSON.stringify(booksByAuthor));
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  let keys = Object.keys(books);
  let booksByTitle = [];

  for (let i = 0; i < keys.length; i++) {
      if (books[keys[i]].title === title) {
          booksByTitle.push(books[keys[i]]);
      }
  }

  return res.send(JSON.stringify(booksByTitle));
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (book) {
    return res.status(200).json(book.reviews);
  }
  return res.status(404).json({ message: "Book not found" });
 //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;

const fs = require("fs");
const path = require("path");

const Book = require("../Models/book");
const Author = require("../Models/author");
const Category = require("../Models/category");

const syncJsonData = async () => {
  try {
    const books = await Book.find().lean();
    const authors = await Author.find().lean();
    const categories = await Category.find().lean();

    const dataDir = path.join(__dirname, "../data");

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    fs.writeFileSync(
      path.join(dataDir, "books.json"),
      JSON.stringify(books, null, 2)
    );

    fs.writeFileSync(
      path.join(dataDir, "authors.json"),
      JSON.stringify(authors, null, 2)
    );

    fs.writeFileSync(
      path.join(dataDir, "categories.json"),
      JSON.stringify(categories, null, 2)
    );

    console.log("JSON files synced successfully");
  } catch (error) {
    console.error("Error syncing JSON:", error);
  }
};

module.exports = syncJsonData;
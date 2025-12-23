import Book from "../models/book.model.js";

/**
 * =========================
 * ADMIN: Create book directly (auto-approved)
 * =========================
 */
export const createBook = async (req, res) => {
  try {
    const { title, author, description, price, coverImage } = req.body;

    if (!title || !author || price === undefined) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const book = await Book.create({
      title,
      author,
      description,
      price,
      coverImage,
      createdBy: req.user._id,
      uploadedByRole: "admin",
      status: "approved",
    });

    res.status(201).json({
      message: "Book created successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * =========================
 * USER: Upload book (pending admin approval)
 * =========================
 */
export const uploadBookByUser = async (req, res) => {
  try {
    const { title, author, description, price } = req.body;

    if (!title || !author) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const book = await Book.create({
      title,
      author,
      description,
      price: price || 0,
      createdBy: req.user._id,
      uploadedByRole: "user",
      status: "pending",
    });

    res.status(201).json({
      message: "Book uploaded successfully and is pending admin approval",
      book,
    });
  } catch (error) {
    res.status(500).json({ message: "Upload failed" });
  }
};

/**
 * =========================
 * PUBLIC: Get all approved books
 * =========================
 */
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({ status: "approved" })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * =========================
 * PUBLIC: Get single approved book by ID
 * =========================
 */
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findOne({
      _id: req.params.id,
      status: "approved",
    }).populate("createdBy", "name email");

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Invalid book ID" });
  }
};

/**
 * =========================
 * ADMIN: Get all pending books
 * =========================
 */
export const getPendingBooks = async (req, res) => {
  try {
    const books = await Book.find({ status: "pending" })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * =========================
 * ADMIN: Approve a pending book
 * =========================
 */
export const approveBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.status = "approved";
    await book.save();

    res.status(200).json({
      message: "Book approved successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({ message: "Invalid book ID" });
  }
};

/**
 * =========================
 * ADMIN: Reject a pending book
 * =========================
 */
export const rejectBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.status = "rejected";
    await book.save();

    res.status(200).json({
      message: "Book rejected successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({ message: "Invalid book ID" });
  }
};

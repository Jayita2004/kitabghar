import User from "../models/user.model.js";
import Book from "../models/book.model.js";

export const getAdminDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBooks = await Book.countDocuments();
    const pendingBooks = await Book.countDocuments({ status: "pending" });
    const approvedBooks = await Book.countDocuments({ status: "approved" });

    res.status(200).json({
      totalUsers,
      totalBooks,
      pendingBooks,
      approvedBooks
    });
  } catch (error) {
    res.status(500).json({ message: "Dashboard data failed" });
  }
};

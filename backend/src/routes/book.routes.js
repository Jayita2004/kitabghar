import express from "express";

import {
  createBook,
  uploadBookByUser,
  getAllBooks,
  getBookById,
  getPendingBooks,
  approveBook,
  rejectBook
} from "../controllers/book.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

/**
 * PUBLIC ROUTES
 */
router.get("/", getAllBooks);

/**
 * USER ROUTE
 */
router.post(
  "/upload",
  authMiddleware,
  uploadBookByUser
);

/**
 * ADMIN ROUTES
 * ⚠️ MUST BE BEFORE "/:id"
 */
router.get(
  "/pending",
  authMiddleware,
  adminMiddleware,
  getPendingBooks
);

router.put(
  "/approve/:bookId",
  authMiddleware,
  adminMiddleware,
  approveBook
);

router.put(
  "/reject/:bookId",
  authMiddleware,
  adminMiddleware,
  rejectBook
);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createBook
);

/**
 * PUBLIC (LAST)
 */
router.get("/:id", getBookById);

export default router;

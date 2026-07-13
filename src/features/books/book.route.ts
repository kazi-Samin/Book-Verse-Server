import { Router } from "express";
import { createBook, deleteBook, getBookById, getBooks, updateBook } from "./book.controller";
import { requireAuth } from "../../middlewares/requireAuth";

const router = Router();

router.get("/", getBooks);
router.get("/:id", getBookById);

// Protected routes
router.post("/", requireAuth, createBook);
router.patch("/:id", requireAuth, updateBook);
router.delete("/:id", requireAuth, deleteBook);

export default router;

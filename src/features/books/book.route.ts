import { Router } from "express";
import { createBook, deleteBook, getBookById, getBooks, updateBook } from "./book.controller";
import { requireAdmin } from "../../middlewares/requireAdmin";

const router = Router();

router.get("/", getBooks);
router.get("/:id", getBookById);

// Protected routes
router.post("/", requireAdmin, createBook);
router.patch("/:id", requireAdmin, updateBook);
router.delete("/:id", requireAdmin, deleteBook);

export default router;

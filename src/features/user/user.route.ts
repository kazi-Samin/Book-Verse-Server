import { Router } from "express";
import { requireAuth } from "../../middlewares/requireAuth";
import { 
  getWishlist, 
  addToWishlist, 
  removeFromWishlist,
  getAddresses,
  addAddress,
  deleteAddress,
  getAllUsers
} from "./user.controller";

const router = Router();

// All user routes require authentication
router.use(requireAuth);

// Admin Routes
router.get("/all", getAllUsers);

// Wishlist Routes
router.get("/wishlist", getWishlist);
router.post("/wishlist", addToWishlist);
router.delete("/wishlist/:bookId", removeFromWishlist);

// Address Routes
router.get("/addresses", getAddresses);
router.post("/addresses", addAddress);
router.delete("/addresses/:id", deleteAddress);

export default router;

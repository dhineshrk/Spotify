import { Router } from "express";
import { getAllSongs, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs } from "../controller/songController.js";
import { protectRoute, requireAdmin } from "../middleware/authMiddleware.js";


const router = Router();


router.get('/', protectRoute, requireAdmin, getAllSongs)
router.get('/featured', getFeaturedSongs)
router.get('/trending', getTrendingSongs)
router.get('/made-for-you', getMadeForYouSongs)


router.get("/search", async (req, res, next) => {
    try {
      const { search } = req.query;
      const songs = await Song.find({
        title: { $regex: search, $options: "i" }, // Case-insensitive partial match
      });
      res.json(songs);
    } catch (error) {
      next(error);
    }
  });

export default router
import mongoose from "mongoose";
import Song from "../models/songModel.js";
import Album from "../models/albumModel.js";
import { config } from "dotenv";

config();

const seedDatabase = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);

		// Clear existing data
		await Album.deleteMany({});
		await Song.deleteMany({});

		// First, create all Songs
		const createdSongs = await Song.insertMany([
			{
				title: "City Rain",
				artist: "Urban Echo",
				imageUrl: "/cover-images/7.jpg",
				audioUrl: "/Songs/7.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 39, // 0:39
			},
			{
				title: "Neon Lights",
				artist: "Night Runners",
				imageUrl: "/cover-images/5.jpg",
				audioUrl: "/Songs/5.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 36, // 0:36
			},
			{
				title: "Urban Jungle",
				artist: "City Lights",
				imageUrl: "/cover-images/15.jpg",
				audioUrl: "/Songs/15.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 36, // 0:36
			},
			{
				title: "Neon Dreams",
				artist: "Cyber Pulse",
				imageUrl: "/cover-images/13.jpg",
				audioUrl: "/Songs/13.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 39, // 0:39
			},
			{
				title: "Summer Daze",
				artist: "Coastal Kids",
				imageUrl: "/cover-images/4.jpg",
				audioUrl: "/Songs/4.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 24, // 0:24
			},
			{
				title: "Ocean Waves",
				artist: "Coastal Drift",
				imageUrl: "/cover-images/9.jpg",
				audioUrl: "/Songs/9.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 28, // 0:28
			},
			{
				title: "Crystal Rain",
				artist: "Echo Valley",
				imageUrl: "/cover-images/16.jpg",
				audioUrl: "/Songs/16.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 39, // 0:39
			},
			{
				title: "Starlight",
				artist: "Luna Bay",
				imageUrl: "/cover-images/10.jpg",
				audioUrl: "/Songs/10.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 30, // 0:30
			},
			{
				title: "Stay With Me",
				artist: "Sarah Mitchell",
				imageUrl: "/cover-images/1.jpg",
				audioUrl: "/Songs/1.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 46, // 0:46
			},
			{
				title: "Midnight Drive",
				artist: "The Wanderers",
				imageUrl: "/cover-images/2.jpg",
				audioUrl: "/Songs/2.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 41, // 0:41
			},
			{
				title: "Moonlight Dance",
				artist: "Silver Shadows",
				imageUrl: "/cover-images/14.jpg",
				audioUrl: "/Songs/14.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 27, // 0:27
			},
			{
				title: "Lost in Tokyo",
				artist: "Electric Dreams",
				imageUrl: "/cover-images/3.jpg",
				audioUrl: "/Songs/3.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 24, // 0:24
			},
			{
				title: "Neon Tokyo",
				artist: "Future Pulse",
				imageUrl: "/cover-images/17.jpg",
				audioUrl: "/Songs/17.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 39, // 0:39
			},
			{
				title: "Purple Sunset",
				artist: "Dream Valley",
				imageUrl: "/cover-images/12.jpg",
				audioUrl: "/Songs/12.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 17, // 0:17
			},
		]);

		// Create Albums with references to Song IDs
		const Albums = [
			{
				title: "Urban Nights",
				artist: "Various Artists",
				imageUrl: "/Albums/1.jpg",
				releaseYear: 2024,
				Songs: createdSongs.slice(0, 4).map((Song) => Song._id),
			},
			{
				title: "Coastal Dreaming",
				artist: "Various Artists",
				imageUrl: "/Albums/2.jpg",
				releaseYear: 2024,
				Songs: createdSongs.slice(4, 8).map((Song) => Song._id),
			},
			{
				title: "Midnight Sessions",
				artist: "Various Artists",
				imageUrl: "/Albums/3.jpg",
				releaseYear: 2024,
				Songs: createdSongs.slice(8, 11).map((Song) => Song._id),
			},
			{
				title: "Eastern Dreams",
				artist: "Various Artists",
				imageUrl: "/Albums/4.jpg",
				releaseYear: 2024,
				Songs: createdSongs.slice(11, 14).map((Song) => Song._id),
			},
		];

		// Insert all Albums
		const createdAlbums = await Album.insertMany(Albums);

		// Update Songs with their Album references
		for (let i = 0; i < createdAlbums.length; i++) {
			const Album = createdAlbums[i];
			const AlbumSongs = Albums[i].Songs;

			await Song.updateMany({ _id: { $in: AlbumSongs } }, { AlbumId: Album._id });
		}

		console.log("Database seeded successfully!");
	} catch (error) {
		console.error("Error seeding database:", error);
	} finally {
		mongoose.connection.close();
	}
};

seedDatabase();
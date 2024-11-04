import mongoose from "mongoose";
import { config } from "./config/index.js";
import User from "./models/User.js";
import Video from "./models/Video.js";

const sampleData = {
  users: [
    {
      username: "techguru",
      email: "tech@example.com",
      password: "password123",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
    },
  ],
  videos: [
    {
      title: "Introduction to Web Development",
      description:
        "Learn the basics of web development in this comprehensive guide.",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1280",
      tags: ["programming", "web development", "tutorial"],
    },
    {
      title: "Modern JavaScript Tutorial",
      description: "Master JavaScript with this in-depth tutorial series.",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1280",
      tags: ["javascript", "programming", "tutorial"],
    },
    {
      title: "React.js Crash Course",
      description:
        "Get started with React.js in this beginner-friendly tutorial.",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1280",
      tags: ["react", "javascript", "tutorial"],
    },
  ],
};

async function seedDatabase() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Video.deleteMany({});

    // Create users
    const user = await User.create(sampleData.users[0]);

    // Create videos
    const videos = sampleData.videos.map((video) => ({
      ...video,
      user: user._id,
    }));
    await Video.create(videos);

    console.log("Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();

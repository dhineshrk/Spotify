import { clerkClient } from "@clerk/express";

export const protectRoute = (req, res, next) => {
    if (!req.auth.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
}

export const requireAdmin = async (req, res, next) => {
    try {
        const currentUser = await clerkClient.users.getUser(req.auth.userId);
        const adminEmails = process.env.ADMIN_EMAIL.split(','); // Split the comma-separated emails into an array
        const isAdmin = adminEmails.includes(currentUser.primaryEmailAddress.emailAddress); // Check if the user's email is in the admin list

        if (!isAdmin) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
}

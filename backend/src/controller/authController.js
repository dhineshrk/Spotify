import User  from "../models/userModel.js";

const authCallback = async (req, res, next) => {
	try {
		const { id, firstName, lastName, imageUrl } = req.body;

		// check if user already exists
		const user = await User.findOne({ clerkId: id });

		if (!user) {
			// signup
			await User.create({
				clerkId: id,
				fullName: `${firstName || ""} ${lastName || ""}`.trim(),
				imageUrl,
			});
		}

		res.status(200).json({ success: true });
	} catch (error) {
		if (error.code === 11000) {
      // Handle duplicate key error gracefully
      console.error("Duplicate key error:", error);

      return res.status(400).json({
        success: false,
        message: "User already exists with this Clerk ID",
      });
    }

    // Handle other errors
    console.error("Error in auth callback:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};

export default authCallback
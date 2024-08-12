const User = require("../model/user_model");
const Conversation = require("../model/conversation_model");
exports.getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // Fetch recent conversations where the logged-in user is a participant
    const conversations = await Conversation.find({
      participants: loggedInUserId,
    })
      .populate("messages", "senderId") // Populate messages to get senderId
      .sort({ updatedAt: -1 }); // Sort conversations by last updated time

    // Extract users from the most recent conversations
    const recentUserIds = new Set();
    for (const conversation of conversations) {
      const recentMessage = conversation.messages[0]; // Get the most recent message
      if (
        recentMessage &&
        recentMessage.senderId.toString() !== loggedInUserId.toString()
      ) {
        recentUserIds.add(recentMessage.senderId);
      }
    }

    // const allUsers = await User.find() add yourself to the sidebar
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    // Sort users with recent user IDs at the top
    const sortedUsers = [
      ...filteredUsers.filter((user) => recentUserIds.has(user._id)),
      ...filteredUsers.filter((user) => !recentUserIds.has(user._id)),
    ];

    res.status(200).json(sortedUsers);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.editProfile = async (req, res) => {
  try {
    const { username, Bio, profilePicture } = req.body;
    const userId = req.user._id; // Assuming you have the user's ID in req.user._id

    // Fetch the current user data
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(`Current User: ${JSON.stringify(currentUser)}`);

    // Build the update object
    const updateFields = {};
    if (username !== undefined && username !== "") {
      updateFields.username = username;
    } else {
      updateFields.username = currentUser.username; // Retain the existing username
    }

    if (Bio !== undefined && Bio !== "") {
      updateFields.Bio = Bio;
    } else {
      updateFields.Bio = currentUser.Bio; // Retain the existing Bio
    }

    if (profilePicture !== undefined && profilePicture !== "") {
      updateFields.profilePicture = profilePicture;
    } else {
      updateFields.profilePicture = currentUser.profilePicture; // Retain the existing profilePicture
    }

    console.log(`Update Fields: ${JSON.stringify(updateFields)}`);
    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true, runValidators: true } // options: return the updated document and run schema validators
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    // Get the user ID from request parameters
    const { id } = req.params;

    // Find and delete the user
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Optionally, clear the JWT cookie on successful deletion
    res.cookie("jwt", "", { maxAge: 0 });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: error.message });
  }
};

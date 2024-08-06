const User = require("../model/user_model");

exports.getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // const allUsers = await User.find() add yourself to the sidebar
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// exports.editProfile = async (req, res) => {
//   try {
//     const { username, Bio } = req.body;
//     const userId = req.user._id; // Assuming you have the user's ID in req.user._id

//     // Update the user
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { username, Bio },
//       { new: true, runValidators: true } // options: return the updated document and run schema validators
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json(updatedUser);
//   } catch (error) {
//     console.error(error); // Log the error for debugging
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

exports.editProfile = async (req, res) => {
  try {
    const { username, Bio } = req.body;
    const userId = req.user._id; // Assuming you have the user's ID in req.user._id

    // Fetch the current user data
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(`Current User: ${JSON.stringify(currentUser)}`);

    // Build the update object
    const updateFields = {};
    if (username !== "") {
      updateFields.username = username;
    } else {
      updateFields.username = currentUser.username; // Retain the existing username
    }

    if (Bio !== "") {
      updateFields.Bio = Bio;
    } else {
      updateFields.Bio = currentUser.Bio; // Retain the existing Bio
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

    // Verify that the requesting user is allowed to delete this user
    // This example assumes users can only delete their own accounts
    // if (req.user._id.toString() !== id) {
    //   return res
    //     .status(403)
    //     .json({ message: "Unauthorized to delete this account" });
    // }

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

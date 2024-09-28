const Feedback = require("../Models/comment");

exports.getDoctorFeedback = async (req, res) => {
  try {
    const { partnerId } = req.params;

    // Fetch all feedback for the specified doctor and populate patient info
    const feedback = await Feedback.find({ partnerid: partnerId })
      .populate("userId") // Populate patient info (User)
      .exec();

    res.json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.avgstars = async (req, res) => {
  try {
    const { partnerId } = req.params;

    // Fetch all ratings for the doctor
    const feedback = await Feedback.find(
      { partnerid: partnerId },
      "rating"
    ).exec();

    const ratings = feedback.map((fb) => fb.rating);
    if (ratings.length === 0) {
      return res
        .status(200)
        .json({ averageRating: 0, message: "No ratings found" });
    }

    const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
    const averageRating = totalRating / ratings.length;

    res.json({ averageRating });
  } catch (error) {
    console.error("Server error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createFeedback = async (req, res) => {
  const { partnerid, user_id, rating, comment } = req.body;

  try {
    if (!partnerid || !user_id) {
      return res
        .status(400)
        .json({ message: "Partner ID and User ID are required" });
    }

    const feedback = new Feedback({
      userId: user_id, // Ensure consistency with the schema
      partnerid,
      rating,
      comment,
    });

    await feedback.save();
    res
      .status(201)
      .json({ message: "Feedback created successfully", feedback });
  } catch (error) {
    console.error("Error creating feedback:", error); // log the exact error
    res.status(500).json({ message: "Error creating feedback", error });
  }
};

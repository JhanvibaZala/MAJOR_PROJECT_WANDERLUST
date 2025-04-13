const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { reviewSchema } = require("../schema.js");
const { isLoggedIn, isAuthor, isOwner } = require("../middleware.js");

//middleware function for errors

const validateReview = (req, res, next) => {
  console.log("Received request body:", req.body); // Debugging

  // Ensure 'review' exists before validation
  if (!req.body.review || typeof req.body.review !== "object") {
    throw new ExpressError(400, "Invalid Review Data: Missing review object");
  }

  let { error } = reviewSchema.validate({ review: req.body.review });

  console.log("Request Body:", req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(", ");
    console.log("Validation error :", errMsg);
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

const reviewController = require("../controllers/review.js");

// REVIEWS
// POST reiew route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

// DELETE review route
router.delete(
  "/:reviewId",
  isAuthor,
  wrapAsync(reviewController.destroyListing)
);

module.exports = router;

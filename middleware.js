const Listing = require("./models/listing");
const Review = require("./models/review");
const { listingSchema, reviewSchema } = require("./schema");
const ExpressError = require("./utils/ExpressError");

module.exports.validateListing = (req, res, next) => {
  // 👇 Add this before validation
  if (req.file) {
    // Ensure nested object exists
    if (!req.body.listing) {
      req.body.listing = {};
    }

    req.body.listing.image = {
      url: req.file.path,       // Cloudinary URL
      filename: req.file.filename
    };
  }

  const { error } = listingSchema.validate(req.body);

  if (error) {
    console.log("Joi validation error : ", error.details);
    const errMsg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};


module.exports.isLoggedIn = (req, res, next) => {
  // console.log(req.user);
  // console.log(req.path, "..", req.originalUrl);
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl
    req.flash("error", "You must login to create listing!");
    return res.redirect("/login")
  }
  next();
};

module.exports.savedRedirectUrl = (req,res,next) => {
  if(req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next()
}

module.exports.isOwner = async(req,res,next) => {
  let {id} = req.params;
  let listing = await Listing.findById(id);
  if(!listing.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the owner of this listing!")
    return res.redirect(`/listings/${id}`);
  }
  next();
}

module.exports.isAuthor = async(req,res,next) => {
  let {id,reviewId} = req.params;
  let review = await Review.findById(reviewId);
  if(!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author of this review!");
    return res.redirect(`/listings/${id}`);
  }
  next();
}
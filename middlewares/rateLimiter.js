import aj from "../config/arcjet.js";

export const rateLimiter = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      return res.status(429).json({
        success: false,
        message: "Too many requests. Please try again later",
      });
    }

    next();
  } catch (err) {
    console.error("Arcjet error:", err.message);
    next(); // fail open (don't block requests if Arcjet fails)
  }
};

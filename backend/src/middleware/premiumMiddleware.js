// This middleware checks if the authenticated user has a premium subscription.
export const requirePremium = (req, res, next) => {
  if (
    req.user &&
    req.user.subscription &&
    req.user.subscription.tier === "premium"
  ) {
    next();
  } else {
    res.status(403).json({
      message:
        "Forbidden. This feature is available for premium subscribers only.",
    });
  }
};

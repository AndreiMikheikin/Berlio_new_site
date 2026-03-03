export const requireMailRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.mailUser) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!allowedRoles.includes(req.mailUser.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
};

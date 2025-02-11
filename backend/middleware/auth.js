const jwt=require('jsonwebtoken');
const JWT_SECRET=process.env.JWT_SECRET;
const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ msg: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Invalid or expired token" });
    }
};

module.exports=authenticateUser;
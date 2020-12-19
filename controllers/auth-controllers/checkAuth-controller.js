const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        // const decoded = jwt.verify(token, process.env.JWT_KEY);
        const decoded = jwt.verify(token, "secretkeyIslem");
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};

// token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbGFtb29vY2hpY0BnbWFpbC5jb20iLCJ1c2VySWQiOiI1ZmRlNmMyMjVkOTVlMzFlMTE0MGFjMTAiLCJpYXQiOjE2MDg0MTIyMzgsImV4cCI6MTYwODQxNTgzOH0.mu6lGOpnmMq4fCdhzR2e1suIYWJXpea-ubRnLRTmz54

const jwt = require("jsonwebtoken")

const jwtManager = (user) => {
    const authToken = jwt.sign({
        name: user?.name,
        id: user?._id
    }, process.env.SECRET_KEY); 

    return authToken;
}

module.exports = jwtManager;
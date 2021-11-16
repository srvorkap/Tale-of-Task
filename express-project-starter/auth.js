const loginUser = (req, res, user) => {
    req.session.auth = {
        userId: user.Id,
    }
};

module.exports = {
    loginUser,
}

export const sendjwtToken = (user, statusCode, res, message) => {
    const token = user.getJWTToken();
    const refreshToken = user.getRefreshToken();
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        http: true,
    };
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
        message,
    })

}
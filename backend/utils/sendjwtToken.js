export const sendjwtToken = (user, statusCode, res, message, accessToken) => {
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 ),
        httpOnly: true,
    };

    res.status(statusCode)
        .cookie("token", accessToken, options)
        .json({
            success: true,
            user,
            accessToken,
            message,
        });
};

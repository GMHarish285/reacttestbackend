const getUserHomePage = (req, res) => {
    const user = req.user;
    const token = req.cookies?.access_token;
    return res.send(
        `Your name is: ${user.name}<br>Your email is: ${user.email}<br>Your token is: ${token}<br><br><a href="/auth/logout">Logout</a>`,
    );
};

const getProfileLogPage = (req, res) => {
    const user = req.user;
    const token = req.cookies?.access_token;
    return res.send(
        `Your name is: ${user.name}<br>Your email is: ${user.email}<br>Your token is: ${token}<br><br><a href="/auth/logout">Logout</a>`,
    );
}

export { getUserHomePage, getProfileLogPage };

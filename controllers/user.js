const viewRegister = (req, res) => {
    return res.render("register")
}

const viewLogin = (req, res) => {
    return res.render("login")
}

module.exports = {viewRegister, viewLogin}


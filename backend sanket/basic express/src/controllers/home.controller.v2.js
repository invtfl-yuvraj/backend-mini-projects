

export const homePingController = (req, res) => {
    res.status(200).json({
        message: "Welcome to the Home Page v2"
    });
}

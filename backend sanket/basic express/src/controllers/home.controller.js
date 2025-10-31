// this layer collect the request and send it to service layer and then send the response back to the client

export const homePingController = (req, res) => {
    res.status(200).json({
        message: "Welcome to the Home Page"
    });
}


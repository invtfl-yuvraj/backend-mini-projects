
export const todoCreateValidator = (req, res, next) => {
    const {text} = req.body;
    if(!text || typeof text !== 'string' || text.trim().length === 0) {
        return res.status(400).json({
            message: "Invalid todo text"
        });
    }
    next();
}
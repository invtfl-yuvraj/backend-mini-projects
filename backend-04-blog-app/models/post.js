const mongoose = require("mongoose");

let postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    date: {
        type: Date,
        default: Date.now,
    },

    title : {
        type: String,
        required: true,
    },
    
    content: {
        type: String,
        required: true,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    ],
});

// Convert UTC to IST on retrieval
postSchema.methods.toIST = function () {
    return this.date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
};

module.exports = mongoose.model("post", postSchema);

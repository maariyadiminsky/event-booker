const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // ie. the events this user created
    events: [
        {
            type: Schema.Types.ObjectId,
            ref: "Event"
        }
    ]
});

module.exports = mongoose.model("User", userSchema);
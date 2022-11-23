const mongoose = require("mongoose")

const MessageSchema = mongoose.Schema({
    chatUsers: Array,
    senderId: {
        type: mongoose.SchemaTypes.ObjectId
    },
    message: String 
})

const Message = mongoose.model("Message", MessageSchema)
module.exports = Message
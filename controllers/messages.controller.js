const Message = require("../models/Message.model");

module.exports.messageController = {
  addMessage: async (req, res) => {
    const { from, to, message } = req.body;
    try {
      const newMessage = await Message.create({
        message,
        chatUsers: [from, to],
        senderId: from,
      });
      res.json(newMessage);
    } catch (error) {
      res.json({ error: error.message });
    }
  },

  getMessagesByUser: async (req, res) => {
    const from = req.params.fromId;
    const to = req.params.toId;
    try {
      const messageByUser = await Message.find({
        chatUsers: {
          $all: [from, to],
        },
      }).sort({ updateAt: 1 });

      const allMessages = messageByUser.map((item) => {
        return {
          myself: item.senderId.toString() === from,
          message: item.message,
        };
      });
      res.json(allMessages);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
};

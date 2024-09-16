import { Schema, models, model } from "mongoose";

const chatSchema = new Schema(
  {
    chats: [
      {
        me: [
         {
            chat: { type: String },
            time: { type: Date },
            seen: {
              type: Boolean,
              default: false,
            },
            read: {
              type: Boolean,
              default: false,
            },
          },
        ],
     
        youId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        lastChatAt: { type: Date },
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Chat = models.Chat || model("Chat", chatSchema);
export default Chat;

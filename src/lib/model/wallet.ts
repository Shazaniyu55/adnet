import { Schema, model, models } from "mongoose";

const walletSchema = new Schema(
  {

    balance: { type: Number, default: 0 },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    pop: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Wallet = models.Wallet || model("Wallet", walletSchema);
export default Wallet;

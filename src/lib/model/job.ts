import { Schema, model, models } from "mongoose";

const jobSchema = new Schema(
  {
    jobDetails: {
      title: {
        type: String,
        trim: true,
        lowercase: true,
      },
      type: {
        type: String,
        lowercase: true,
      },
      category: {
        type: String,
        lowercase: true,
      },
      state: { type: String },
      lga: { type: String },
      address: { type: String },
      description: {
        type: String,
        trim: true,
        max: 200,
      },
      budget: {
        type: Number,
      },
      startDate: { type: Date },

      endDate: { type: Date },
      agreeToTerms: { type: Boolean, default: false },
    },
    approved: { type: Boolean, default: false },
    proposalAccepted: { type: Boolean, default: false },
    swPaid: { type: Boolean, default: false },
    clientRated: { type: Boolean, default: false },
    swRated: { type: Boolean, default: false },
    popConfirmed: { type: Boolean, default: false },
    
    swId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    complaints: [
      {
        complaint: { type: String, required: true },
        subject: { type: String, required: true },
        seen: { type: String, default: false },
        read: {
          type: Boolean,
          default: false,
        },
        file: {
          name: String,
        },
        date: { type: Date, default: new Date() },
      },
    ],

    proposals: [
      {
        content: { type: String, required: true },
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },

        accepted: {
          type: Boolean,
          default: false,
        },
        rejected: {
          type: Boolean,
          default: false,
        },
        file: {
          name: String,contentType:String
        },
        date: { type: Date, default: new Date() },
      },
    ], started: {
      type: Boolean,
      default: false,
    },
    reports: [
      {
        report: { type: String, required: true },
        subject: { type: String, required: true },
        read: {
          type: Boolean,
          default: false,
        },
        file: {
          name: String,contentType:String
        },
        date: { type: Date, default: new Date() },
        correction: {
          correction: { type: String },
          subject: { type: String },
          read: {
            type: Boolean,
            default: false,
          },
          date: { type: Date },
        },
      },
    ],
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

const Job = models.Job || model("Job", jobSchema);
export default Job;

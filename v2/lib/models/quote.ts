import { Schema, model, models } from "mongoose";

const quoteSchema = new Schema({
  text: { type: String, required: true },
  author: { type: String, required: true },
});

const Quote = models.Quote || model("Quote", quoteSchema);

export default Quote;

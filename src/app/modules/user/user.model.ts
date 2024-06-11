import { Schema, model } from "mongoose";

const studentSchema = new Schema<{ name: string }>({
  name: { type: String, required: true },
});

export const Student = model<{ name: string }>("Student", studentSchema);

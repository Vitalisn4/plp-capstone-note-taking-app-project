import mongoose from "mongoose";

// 1 - Define the Note schema
// 2 - Create the Note model

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    // date: {
    //     type: Date,
    //     default: Date.now
    // }
},
    {
        timestamps: true // Automatically adds createdAt and updatedAt fields
    }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
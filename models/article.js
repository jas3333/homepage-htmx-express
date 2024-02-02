import mongoose from 'mongoose';

const articleSchema = mongoose.Schema(
    {
        title: String,
        summary: String,
        content: String,
        category: String,
        slug: String,
    },
    { timestamps: true },
);

export default mongoose.model('article', articleSchema);

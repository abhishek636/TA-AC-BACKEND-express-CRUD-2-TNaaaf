var monsooge = require('mongoose');
var Schema = monsooge.Schema;

var bookSchema = new Schema(
  {
    title: { type: String },
    summery: String,
    pages: Number,
    publication: String,
    cover_image: String,
    category: [String],
    articleId: { type: Schema.Types.ObjectId, ref: 'Author' },
  },
  { timestamps: true }
);

var Book = monsooge.model('Book', bookSchema);
module.exports = Book;
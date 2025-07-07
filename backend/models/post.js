const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  URL: {
    type: String
  },
  postImage: {

  type: String


  },
  title: {
    type: String,
    required: true
  },
  description: { 
    type: String
  },

  userId: {

    type : mongoose.Schema.Types.ObjectId,
    
  }

  ,location: { 
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: { 
      type: [Number],
      required: true
    }
  }
}, { timestamps: true }); 

PostSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Post', PostSchema);

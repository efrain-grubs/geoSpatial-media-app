const express = require('express')
const Post = require('../models/post')

const createPost = async(req,res) => { 

try { 

    const {title,description,location,postImage} = req.body
const userId = req.userId

console.log("userId: ",userId)
    const userLocation = JSON.parse(location)
if(req.file) { 

    const URL = req.file.path
}

   

if(!title || !location || !userLocation.coordinates) { 
    return res.status(400).json({message: "fill in title, and provide location"})
}

const newPost = new Post({URL,title,description,userId,postImage,location: { type: 'Point',coordinates: userLocation.coordinates} })


await newPost.save()


return res.status(201).json({message: "post created",newPost})

}catch(err) { 

console.log("error: ",err)

return res.status(500).json({message: "something went wrong with upload"})


}
}

const getPost = async(req,res) => { 

const userId = req.userId

try { 

const findUser = await Post.find({userId})

if(!findUser || findUser.length === 0) { 

return res.status(400).json({message: "no posts found"})

}


return res.status(200).json({message: "post retrieved",findUser})


}catch(err) { 

    console.log("error: ",err)

    return res.status(500).json({message: "unabel to retrieve posts"})
}


}



const deletePost = async(req,res) => { 

    const postId = req.params.id

    if(!postId) { 

        return res.status(400).json({message: "unable to delete"})
    }

try { 

const findPost = await Post.findByIdAndDelete(postId)




return res.status(200).json({message: "deletion successful"})

}catch(err) {

    console.log("error: ",err)

    return res.status(500).json({message: "unable to delete item"})
}

}

const allPost = async(req,res) => { 

try { 

const allPosts = await Post.find()

if(!allPosts) { 

    return res.status(400).json({message: "unable to retrieve posts"})
}
return res.status(200).json({message: "user posts",allPosts})

}catch(err) { 
console.log("error: ",err)
    return res.status(500).json({message: "unable to get nearby post"})
}



}


module.exports = {createPost,getPost,deletePost,allPost}
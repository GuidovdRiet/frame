const mongoose = require("mongoose");
const Post = mongoose.model("Post");

exports.homePage = async (req, res) => {
  const posts = await Post.find();
  res.render('index', { title: 'index', posts })
};

exports.addPost = (req, res) => {
  res.render("add_post", { title: "Add an post" });
};

exports.createPost = async (req, res) => {
  await new Post(req.body).save();
  res.redirect("/");
};

exports.editPost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  res.render('edit_post', { title: `${post.title}`, post})
}

exports.updatePost = async (req, res) => {
  const post = await Post.findOneAndUpdate({ _id: req.params.id }, req.body, { 
    new: true,
    runValidators: true
  }).exec();
  res.redirect('back');
}

exports.deletePost = async (req, res) => {
  const post = await Post.findOneAndRemove({ _id: req.params.id });
  res.redirect('back');
}

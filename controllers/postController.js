const prisma = require("../prisma/index.js");

//creating a new post
exports.createPost = async (req, res, next) => {
    try {
        const { slug, title, body, authorId } = req.body;
        const post = await prisma.post.create({
            data: {
                slug,
                title,
                body,
                author: { connect: { id: authorId } }

            }
        })
        res.json(post);
    } catch (error) {
        throw new Error(error);
    }
}

//get all posts
exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await prisma.post.findMany();
        res.json(posts);
    } catch (error) {
        throw new Error(error);
    }
}

//get posts by id
exports.getPost = async (req, res, next) => {
    const { id } = req.params;
    try {
        const post = await prisma.post.findUnique({
            where: { id: id }
        })
        res.json(post);
    } catch (error) {
        throw new Error(error);
    }
}

//update Post
exports.updatePost = async (req, res, next) => {
    const { id } = req.params;
    const { title, body } = req.body;
    try {
        const updatedPost = await prisma.post.update({
            where: { id: id },
            data: {
                title: title,
                body: body
            }
        })
        res.json(updatedPost);
    } catch (error) {
        throw new Error(error);
    }
}

//delete Post
exports.deletePost = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedPost = await prisma.post.delete({
            where: { id: id }
        })
        res.json(deletedPost);
    } catch (error) {
        throw new Error(error);
    }
}
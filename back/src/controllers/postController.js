const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getPosts = async function (req, res) {
  const posts = await prisma.post.findMany({
    select: {
      content: true,
      images: true,
      id: true,
      createdAt: true,
      author: { select: { email: true, profilPicture: true } },
      LikedUsers: { select: { email: true } },
    },
  });
  res.send(posts);
};
exports.createPost = async function (req, res) {
  try {
    await prisma.post.create({
      data: {
        content: req.body.content,
        images: JSON.stringify(req.body.images),
        author: {
          connect: { email: req.email },
        },
      },
    });
    res.send({ message: "Post crée" });
  } catch (error) {
    res.send({ message: "Une erreur est survenue" });
    console.error(error);
  }
};

exports.updatePost = async function (req, res) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(req.body.id) },
      select: { author: { select: { email: true } } },
    });
    if (post.author.email != req.email && !req.isAdmin)
      return res.send({
        message: "Vous n'avez pas le droit de modifier ce post",
      });
      
    await prisma.post.update({
      where: { id: Number(req.body.id) },
      data: {
        content: req.body.content,
        ...(req.body.images.length != 0 && {
          images: JSON.stringify(req.body.images),
        }),
      },
    });
    res.send({ message: "Post modifié" });
  } catch (error) {
    res.send({ message: "Une erreur est survenue" });
    console.error(error);
  }
};
// Like post
exports.likePost = async function (req, res) {
  try {
    // If the user is in likes list, remove it
    const post = await prisma.post.findUnique({
      where: { id: Number(req.body.id) },
      select: { LikedUsers: { select: { email: true } } },
    });
    const isLiked = post.LikedUsers.find((user) => user.email == req.email);
    if (isLiked) {
      await prisma.post.update({
        where: { id: Number(req.body.id) },
        data: {
          LikedUsers: {
            disconnect: { email: req.email },
          },
        },
      });
      return res.send({ message: "Post disliké" });
    }
    await prisma.post.update({
      where: { id: Number(req.body.id) },
      data: {
        LikedUsers: {
          connect: { email: req.email },
        },
      },
    });
    res.send({ message: "Post liké" });
  } catch (error) {
    res.send({ message: "Une erreur est survenue" });
    console.error(error);
  }
};

exports.deletePost = async function (req, res) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(req.body.id) },
      select: { author: { select: { email: true } } },
    });
    if (post.author.email != req.email && !req.isAdmin)
      return res.send({
        message: "Vous n'avez pas le droit de modifier ce post",
      });
    await prisma.post.delete({ where: { id: req.body.id } });
    res.send({ message: "Post supprimer" });
  } catch (error) {
    res.send({ message: "Une erreur est survenue" });
    console.error(error);
  }
};

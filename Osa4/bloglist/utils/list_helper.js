const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (mostLiked, blog) => {
    return blog.likes > mostLiked ? blog : mostLiked;
  };
  return blogs.reduce(reducer);
};

const mostBlogs = (blogs) => {
  const author_blogs = _.groupBy(blogs, "author");
  const blog_amount = _.values(author_blogs).map((max) => ({
    author: max[0].author,
    blogs: max.length,
  }));
  return blog_amount.reduce(
    (max, obj) => (obj.blogs > max.blogs ? obj : max),
    blog_amount[0]
  );
};

const mostLikes = (blogs) => {
  const likesByAuthor = _.mapValues(_.groupBy(blogs, "author"), (blogs) =>
    _.sumBy(blogs, "likes")
  );

  const authorWithMostLikes = _.maxBy(
    _.entries(likesByAuthor),
    ([, likes]) => likes
  );

  return {
    author: authorWithMostLikes[0],
    likes: authorWithMostLikes[1],
  };
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};

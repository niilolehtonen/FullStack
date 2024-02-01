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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};

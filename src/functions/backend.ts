const backendURL = "http://localhost:3003";

const usersURL = `${backendURL}/api/users`;

const blogsURL = `${backendURL}/api/blogs`;

const likesURL = `${backendURL}/api/likes`;

const followURL = `${backendURL}/api/requests`;

const cloudinaryImagesURL =
  "https://res.cloudinary.com/dwyeologv/image/upload/blog_app/images";
const cloudinary_profilePicURL = `${cloudinaryImagesURL}/profile_pics`;
export {
  backendURL,
  usersURL,
  blogsURL,
  likesURL,
  followURL,
  cloudinary_profilePicURL,
};

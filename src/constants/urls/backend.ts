const backendURL = import.meta.env.VITE_API_URL;

const usersURL = `${backendURL}/api/users`;

const blogsURL = `${backendURL}/api/blogs`;

const likesURL = `${backendURL}/api/likes`;

const followURL = `${backendURL}/api/requests`;

const userSettingsURL = `${backendURL}/api/settings/users`;

const searchURL = `${backendURL}/api/search`;

export {
  backendURL,
  usersURL,
  blogsURL,
  likesURL,
  followURL,
  userSettingsURL,
  searchURL,
};

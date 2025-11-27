const cloudinary_profilePic = (userId: string, version: string) => {
  return `https://res.cloudinary.com/dwyeologv/image/upload/${version}/blog_app/images/profile_pics/${userId}.png`;
};

const cloudinary_thumbnail = (userId: string, version: string) => {
  return `https://res.cloudinary.com/dwyeologv/image/upload/${version}/blog_app/images/profile_thumbnails/${userId}.png`;
};
const cloudinary_image_thumbnail = (
  userId: string,
  blogId: string,
  version: string
) => {
  return `https://res.cloudinary.com/dwyeologv/image/upload/${version}/blog_app/images/blog_thumbnails/${userId}/${blogId}.png`;
};

export {
  cloudinary_profilePic,
  cloudinary_thumbnail,
  cloudinary_image_thumbnail,
};

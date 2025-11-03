import bgLogin from "../assets/images/bg-login.jpg";
import bgHome from "../assets/images/bg-home.jpg";
import forDashboard from "../assets/images/bg-dashboard.jpg";
const _default = {
  profilePic:
    "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
};

const images = {
  bgLogin: {
    src: bgLogin,
    credits: {
      platform: {
        name: "Unsplash",
        href: "",
      },
      creator: {
        name: "Ales Crivec",
        href: "https://unsplash.com/@aleskrivec",
      },
    },
  },
  bgHome: {
    src: bgHome,
    url: "https://unsplash.com/photos/body-of-water-surrounded-by-trees-NRQV-hBF10M?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink",
    credits: {
      platform: {
        name: "Unsplash",
        href: "",
      },
      creator: {
        name: "Bailey Zindel",
        href: "https://unsplash.com/@baileyzindel",
      },
    },
  },
  forDashboard: {
    src: forDashboard,
    credits: {
      platform: {
        name: "Freepik",
        href: "www.freepik.com",
      },
    },
  },
};

export { _default, images };

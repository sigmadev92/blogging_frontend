import bgLogin from "../assets/images/bg-login.jpg";
import bgHome from "../assets/images/bg-home.jpg";
import forDashboard from "../assets/images/bg-dashboard.jpg";
const _default = {
  profilePic: {
    M: "https://img.freepik.com/free-vector/smiling-redhaired-boy-illustration_1308-176664.jpg",
    F: "https://img.freepik.com/free-vector/smiling-woman-with-braided-hair_1308-175650.jpg",
    O: "https://img.freepik.com/premium-vector/vector-flat-illustration-suitable-social-media-profiles-icons-screensavers-as-templatex9-avatar-user-profile-person-icon-profile-picture_719432-1733.jpg",
    NS: "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1745180411.jpg",
  },
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

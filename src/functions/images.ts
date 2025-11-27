import bgLogin from "../assets/images/bg-login.jpg";
import bgHome from "../assets/images/home-2.png";
import forDashboard from "../assets/images/bg-dashboard.jpg";
import blogLogo from "../assets/images/blog-logo.png";
import girlReadingBook from "../assets/images/girl-reading-book.png";
import nightScene from "../assets/images/night-scene.jpg";
import girlHoldingBook from "../assets/images/girl-holding-book.png";
const bgHome2 =
  "https://img.freepik.com/premium-photo/golden-sun-rays-illuminate-mountain-peaks-dawn-with-sky-pastel-hues-creating-tranquil-inspiring-scene-generative-ai_262708-31603.jpg?";
const _default = {
  profilePic: {
    M: "https://img.freepik.com/free-vector/smiling-redhaired-boy-illustration_1308-176664.jpg",
    F: "https://img.freepik.com/free-vector/smiling-woman-with-braided-hair_1308-175650.jpg",
    O: "https://img.freepik.com/premium-vector/vector-flat-illustration-suitable-social-media-profiles-icons-screensavers-as-templatex9-avatar-user-profile-person-icon-profile-picture_719432-1733.jpg",
    NS: "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1745180411.jpg",
  },
  profileThumbnail: ["https://wallpapercave.com/wp/wp8948495.jpg"],
  thumbnail: [
    "https://images.squarespace-cdn.com/content/v1/649087af1b2b0e356cbd5516/1687193634202-J7IC7003UGR4EF0T0E3V/blank-thumbnail.jpg",
    "https://img.freepik.com/premium-photo/golden-sun-rays-illuminate-mountain-peaks-dawn-with-sky-pastel-hues-creating-tranquil-inspiring-scene-generative-ai_262708-31603.jpg?semt=ais_hybrid&w=740&q=80",
  ],
};

const images = {
  girlHoldingBook: {
    src: girlHoldingBook,
    credits: {},
  },
  nightScene: {
    src: nightScene,
    credits: {
      platform: "Freepik.com",
      href: "freepik.com",
    },
  },
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
  blogLogo: {
    src: blogLogo,
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
  girlReadingBook: {
    src: girlReadingBook,
    credit: {
      platform: {
        name: "Clean Png",
        href: "https://www.cleanpng.com",
      },
    },
  },
  bgHome2: {
    src: bgHome2,
  },
};

export { _default, images };

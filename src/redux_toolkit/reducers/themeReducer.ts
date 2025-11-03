import { createSlice } from "@reduxjs/toolkit";

const initialState: { theme: string } = {
  theme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      const savedTheme = action.payload;
      state.theme = savedTheme;
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    },
    toggleTheme: (state) => {
      const currTheme = state.theme;
      const newTheme = currTheme === "light" ? "dark" : "light";
      state.theme = newTheme;
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      localStorage.setItem("blogsEra_theme", newTheme);
    },
  },
});

const ThemeRducer = themeSlice.reducer;
const ThemeActions = themeSlice.actions;

export { ThemeActions, ThemeRducer };

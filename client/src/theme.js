import { createTheme } from "@mui/material/styles";

const green = {
  100: "#D5F5E7",
  500: "#4F8E77",
  600: "#36735B",
  700: "#1D5940",
  800: "#004027",
  900: "#00200C",
};
const yellow = { 300: "#FFBC36", 400: "#F5A601", 600: "#AA6B00" };
const navy = { 300: "#A4C0D6", 900: "#041C2C" };
const grey = {
  50: "#F7F7F7",
  200: "#D8D8DA",
  400: "#9E9EA0",
  500: "#818183",
  600: "#636365",
};
const red = { 600: "#D32F2F" };

// Elevation — same as the Figma effect styles (navy-tinted, not black)
const elevation1 = "0 1px 3px rgba(4, 28, 44, 0.12)";
const elevation2 = "0 4px 12px rgba(4, 28, 44, 0.12)";

// Font stacks — Samoln for screen titles (falls back to Manrope if not loaded)
const samoln = '"Samoln", "Manrope", sans-serif';
const manrope = '"Manrope", sans-serif';

// ─────────────────────────────────────────────
// THEME
// ─────────────────────────────────────────────
const theme = createTheme({
  // TOKENS — same names as the Figma "Tokens" collection
  palette: {
    primary: {
      main: green[800],
      light: green[600],
      dark: green[900],
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: yellow[400],
      light: yellow[300],
      dark: yellow[600],
      contrastText: navy[900],
    },
    tertiary: {
      main: green[500],
      light: green[100],
      dark: green[700],
      contrastText: "#FFFFFF",
    },
    error: { main: red[600] },
    text: {
      primary: navy[900],
      secondary: grey[600],
      disabled: grey[400],
    },
    background: {
      default: grey[50],
      paper: "#FFFFFF",
    },
    divider: grey[200],
  },

  typography: {
    fontFamily: manrope,

    // Samoln — screen titles
    h1: {
      fontFamily: samoln,
      fontWeight: 400,
      fontSize: "48px",
      lineHeight: "56px",
    },
    h2: {
      fontFamily: samoln,
      fontWeight: 400,
      fontSize: "40px",
      lineHeight: "48px",
    },
    h3: {
      fontFamily: samoln,
      fontWeight: 400,
      fontSize: "32px",
      lineHeight: "40px",
    },
    h4: {
      fontFamily: samoln,
      fontWeight: 400,
      fontSize: "24px",
      lineHeight: "32px",
    },

    // Manrope — everything else
    h5: { fontWeight: 700, fontSize: "20px", lineHeight: "28px" },
    h6: { fontWeight: 700, fontSize: "18px", lineHeight: "24px" },
    subtitle1: { fontWeight: 500, fontSize: "16px", lineHeight: "24px" },
    subtitle2: { fontWeight: 500, fontSize: "14px", lineHeight: "20px" },
    body1: { fontWeight: 400, fontSize: "16px", lineHeight: "24px" },
    body2: { fontWeight: 400, fontSize: "14px", lineHeight: "20px" },
    button: {
      fontWeight: 600,
      fontSize: "14px",
      lineHeight: "20px",
      textTransform: "none",
    },
    caption: { fontWeight: 400, fontSize: "12px", lineHeight: "16px" },
    overline: {
      fontWeight: 600,
      fontSize: "12px",
      lineHeight: "16px",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
    },
  },
  // Default corner radius — Figma radius/md
  shape: { borderRadius: 8 },

  components: {
    // BUTTON — 44px tall, flat, Figma padding
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { minHeight: 44, padding: "12px 24px", borderRadius: 8 },
        outlined: { borderWidth: "1.5px", "&:hover": { borderWidth: "1.5px" } },
      },
    },

    // CARD — radius/lg + elevation/1
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 16, boxShadow: elevation1 },
      },
    },

    // CHIP — pill, 36px, lowercase, Medium weight, mint by default
    MuiChip: {
      styleOverrides: {
        root: {
          height: 36,
          borderRadius: 999,
          fontSize: "14px",
          fontWeight: 500,
          textTransform: "lowercase",
          backgroundColor: green[100],
          color: green[700],
        },
        label: { paddingLeft: 12, paddingRight: 12 },
        colorPrimary: { backgroundColor: green[800], color: "#FFFFFF" },
      },
    },

    // TOP APP BAR — navy, flat
    MuiAppBar: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { backgroundColor: navy[900], color: "#FFFFFF" },
      },
    },
    // BOTTOM NAV — navy bar, yellow active tab (Figma Navbar)
    MuiBottomNavigation: {
      styleOverrides: {
        root: { backgroundColor: navy[900], height: 64 },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: navy[300],
          "&.Mui-selected": { color: yellow[400] },
        },
      },
    },
    // FLOATING BUTTON — elevation/2
    MuiFab: {
      styleOverrides: { root: { boxShadow: elevation2 } },
    },

    // TEXT FIELD — grey/500 border (3:1 contrast), radius/md
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 8 },
        notchedOutline: { borderColor: grey[500] },
      },
    },

    // STEP INDICATOR — 4px rounded bar
    MuiLinearProgress: {
      styleOverrides: {
        root: { height: 4, borderRadius: 999, backgroundColor: grey[200] },
        bar: { borderRadius: 999 },
      },
    },
  },
});

export default theme;

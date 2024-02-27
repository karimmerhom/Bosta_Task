

const lightModeColors = {
  primary: {
    100: "#FFFFFF",
    
  },
  border: {
    100: "#ebebeb",
    80: "#e30613",
  },
  icon: {
    100: "#000000",
    80: "#e30613",
    60: "#5cb85c"
  },
  text: {
    100: "#000000",
    80: "#e30613",
    60: "#667085",
  },
  button: {
    100: "#e30613",
  },
}

const colors =  lightModeColors;
const theme = {
  colors,
  styles: {
    global: {
      body: {
        bg: "primary.100",
        fontFamily: "Cairo, sans-serif" ,
      },
      html: {
        fontFamily: "Cairo, sans-serif" ,
      },
      a: {
        color: "text.100",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
  components: {
    baseStyle: {
      Text: {
        primaryFontColor: "text.100",
        secondaryFontColor: "text.80",
      },
    },
  },
};

export { theme };

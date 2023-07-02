export const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? "#008300" : "#0a4a40",
    boxShadow: state.isFocused ? "#008300" : "#008300",
    "&:hover": {
      borderColor: "#0a4a40",
    },
  }),
};

export const SearchStyle = {
  control: (provided, state) => ({
    ...provided,
    minWidth: "250px",
    minHeight: "40px",
    borderColor: state.isFocused ? "red" : "red",
    boxShadow: state.isFocused ? "red" : "red",
    border: "10px",

    "&:hover": {
      borderColor: "#0a4a40",
    },
    borderColor: "#0a4a40",
  }),
  option: (provided, state) => ({
    ...provided,
    ["@media(max-width:600px)"]: {
      borderRadius: "0px 0px 0px 0px",
    },
  }),
};

import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { popularStocks } from "../utils/fetchOptions";
import { v4 as uuidv4 } from "uuid";

export default function SelectGroup({ setContent }) {
  const [group, setGroup] = React.useState("popularStocks");

  const handleChange = (event) => {
    const type = event.target.value;
    setGroup(type);
    switch (type) {
      case "popularStocks":
        setContent({ list: popularStocks });
        break;
      case "dayGainers":
        setContent({ type: "dayGainers" });
        break;
      case "dayLosers":
        setContent({ type: "dayLosers" });
        break;
      case "techGrowth":
        setContent({ type: "techGrowth" });
        break;
      case "undervaluedGrowth":
        setContent({ type: "undervaluedGrowth" });
        break;
      case "undervaluedLargeCap":
        setContent({ type: "undervaluedLargeCap" });
        break;
      default:
        break;
    }
  };

  return (
    <FormControl fullWidth>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={group}
        label={"Group"}
        onChange={handleChange}
        sx={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#2b2d3e",
          ".MuiSelect-select.MuiSelect-outlined.MuiOutlinedInput-input.MuiInputBase-input":
            {
              padding: "0.5rem 3rem",
            },
          " .Mui-focused, .MuiOutlinedInput-notchedOutline ": {
            border: "none",
          },
        }}
      >
        {[
          { value: "popularStocks", text: "Popular Stocks" },
          { value: "dayGainers", text: "Day Gainers" },
          { value: "dayLosers", text: "Day Loserss" },
          { value: "techGrowth", text: "Technology & Growth" },
          { value: "undervaluedGrowth", text: "Undervalued & Growth" },
          { value: "undervaluedLargeCap", text: "Undervalued & LargeCap" },
        ].map((item) => {
          return (
            <MenuItem
              value={item.value}
              sx={{
                padding: "0.2rem 1rem",
                fontSize: "1.7rem",
                fontFamily: "Cabin",
                color: "black",
                minHeight: "30px",
              }}
              key={uuidv4()}
            >
              {item.text}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

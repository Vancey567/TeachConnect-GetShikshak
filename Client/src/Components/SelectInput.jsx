import { nanoid } from "nanoid";
function SelectInput(props) {
  let options = props.optionArray.map((value) => {
    return (
      <option
        className="border-r-[1px] border-black"
        key={nanoid()}
        value={`${value}`}
      >
        {value}
      </option>
    );
  });
  return (
    <select 
    className="p-2 rounded-l border-r-[1px] border-black cursor-pointer bg-white"
    onChange={props.handleChange}
    value={props.value}
    >
      {options}
    </select>
  );
}

export default SelectInput;

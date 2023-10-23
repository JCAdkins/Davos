import { Label, Select } from "flowbite-react";

export default function SelectInput({
  options,
  value,
  text,
  onChange,
  onKeyDown,
}) {
  const list = options.map((option) => <option>{option}</option>);

  return (
    <div className="max-w-fit" id="select">
      <div className="block">
        <Label htmlFor="states" value={text} />
      </div>
      <Select
        id="states"
        onKeyDown={onKeyDown}
        onChange={onChange}
        value={value}
      >
        {...list}
      </Select>
    </div>
  );
}

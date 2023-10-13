import { Label, Textarea } from "flowbite-react";

const TextArea = ({ htmlFor, value, id, placeholder }) => {
  return (
    <div className="max-w-md" id="textarea">
      <div className="mb-2 block">
        <Label htmlFor={htmlFor} value={value} />
      </div>
      <Textarea id={id} placeholder={placeholder} required rows={4} />
    </div>
  );
};

export default TextArea;

import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { EDUCATION } from "../../assets/EDUCATION";
import SelectInput from "../Input/SelectInput";

const EducationForm = ({ onSubmit, currentInfo }) => {
  const [degree, setDegree] = useState(currentInfo.degree);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      school: event.target.school.value,
      degree: degree,
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div className="flex flex-col w-full gap-2">
        <div className="flex w-full gap-2">
          <div className="w-full">
            <Label htmlFor="school" value="School:" />
            <TextInput id="school" defaultValue={currentInfo.school} />
          </div>
          <div className="w-full">
            <Label htmlFor="degree" value="Degree:" />
            <SelectInput
              id="degree"
              shadow
              value={degree}
              onChange={(event) => setDegree(event.target.value)}
              options={EDUCATION}
            />
          </div>
        </div>
        <div className="w-full">
          <Button type="submit" className="w-full bg-app_accent-900 mt-4">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EducationForm;

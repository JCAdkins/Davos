import { Button, Label, TextInput, Textarea } from "flowbite-react";

const OccupationForm = ({ onSubmit, currentInfo }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      occupation: event.target.occupation.value,
      industry: event.target.industry.value,
      organization: event.target.company.value,
      company_url: event.target.company_url.value,
      number_employees: event.target.number_employees.value,
      experience: event.target.experience.value,
      email: event.target.email.value,
      responsibilities: event.target.responsibilities.value,
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div className="flex flex-col gap-2">
        <div className="flex w-full gap-2">
          <div className="w-full">
            <Label htmlFor="occupation" value="Occupation" />
            <TextInput id="occupation" defaultValue={currentInfo.occupation} />
          </div>
          <div className="w-full">
            <Label htmlFor="industry" value="Industry" />
            <TextInput id="industry" defaultValue={currentInfo.industry} />
          </div>
        </div>
        <div className="flex w-full gap-2">
          <div className="w-full">
            <Label htmlFor="company" value="Company" />
            <TextInput id="company" defaultValue={currentInfo.organization} />
          </div>
          <div className="w-full">
            <Label htmlFor="company_url" value="Company URL" />
            <TextInput
              id="company_url"
              defaultValue={currentInfo.company_url}
            />
          </div>
        </div>
        <div className="flex w-full gap-2">
          <div className="flex flex-col w-1/3">
            <Label htmlFor="number_employees" value="# of Employees" />
            <input
              className="rounded-lg text-black"
              defaultValue={currentInfo.number_employees}
              id="number_employees"
              type="number"
              min="0"
              max="100"
            />
          </div>
          <div className="flex flex-col w-1/3">
            <Label htmlFor="experience" value="Experience" />
            <input
              className="rounded-lg text-black"
              defaultValue={currentInfo.experience}
              id="experience"
              type="number"
              min="0"
              max="50"
            />
          </div>
          <div className="flex flex-col w-full">
            <Label htmlFor="email" value="Email" />
            <TextInput id="email" defaultValue={currentInfo.email} />
          </div>
        </div>
        <div>
          <Label htmlFor="responsibilities" value="Responsiblities: " />
          <Textarea
            id="responsibilities"
            placeholder="Responsiblities..."
            defaultValue={currentInfo.responsibilities}
            rows={7}
          />
        </div>
        <div className="w-full mt-4">
          <Button type="submit" className="bg-app_accent-900 w-full">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default OccupationForm;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ResumeFormProps {
  data: any;
  onUpdate: (data: any) => void;
}

const ResumeForm = ({ data, onUpdate }: ResumeFormProps) => {
  const [experienceLevel, setExperienceLevel] = useState("experienced");

  const updateField = (section: string, field: string, value: string) => {
    onUpdate({
      ...data,
      [section]: {
        ...data[section],
        [field]: value,
      },
    });
  };

  const addExperience = () => {
    onUpdate({
      ...data,
      experience: [
        ...data.experience,
        { company: "", position: "", duration: "", description: "" },
      ],
    });
  };

  return (
    <div className="form-section">
      <div className="mb-6">
        <Label>Experience Level</Label>
        <Select
          value={experienceLevel}
          onValueChange={(value) => setExperienceLevel(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select experience level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fresher">Fresher</SelectItem>
            <SelectItem value="experienced">Experienced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="grid gap-4">
            <div>
              <Label>Full Name</Label>
              <Input
                value={data.personalInfo.name}
                onChange={(e) =>
                  updateField("personalInfo", "name", e.target.value)
                }
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                value={data.personalInfo.email}
                onChange={(e) =>
                  updateField("personalInfo", "email", e.target.value)
                }
                type="email"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={data.personalInfo.phone}
                onChange={(e) =>
                  updateField("personalInfo", "phone", e.target.value)
                }
                placeholder="+1 234 567 890"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Professional Summary</h3>
          <Textarea
            value={data.summary}
            onChange={(e) =>
              onUpdate({ ...data, summary: e.target.value })
            }
            placeholder="Brief overview of your professional background and career goals"
            className="h-32"
          />
        </div>

        {experienceLevel === "experienced" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Work Experience</h3>
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="space-y-4 mb-4 p-4 border rounded">
                <Input
                  value={exp.company}
                  onChange={(e) => {
                    const newExp = [...data.experience];
                    newExp[index].company = e.target.value;
                    onUpdate({ ...data, experience: newExp });
                  }}
                  placeholder="Company Name"
                />
                <Input
                  value={exp.position}
                  onChange={(e) => {
                    const newExp = [...data.experience];
                    newExp[index].position = e.target.value;
                    onUpdate({ ...data, experience: newExp });
                  }}
                  placeholder="Position"
                />
                <Textarea
                  value={exp.description}
                  onChange={(e) => {
                    const newExp = [...data.experience];
                    newExp[index].description = e.target.value;
                    onUpdate({ ...data, experience: newExp });
                  }}
                  placeholder="Job Description"
                />
              </div>
            ))}
            <Button onClick={addExperience} variant="outline" className="w-full">
              Add Experience
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeForm;
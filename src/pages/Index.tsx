import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import JobAnalysis from "@/components/JobAnalysis";

const Index = () => {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
  });
  
  const { toast } = useToast();

  const handleResumeUpdate = (newData: any) => {
    setResumeData(newData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto py-8 px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-2">ATS-Friendly Resume Builder</h1>
          <p className="text-muted-foreground">Create a professional resume that stands out and passes ATS systems</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <ResumeForm 
              data={resumeData} 
              onUpdate={handleResumeUpdate}
            />
            <JobAnalysis 
              onSkillsUpdate={(skills) => {
                setResumeData(prev => ({
                  ...prev,
                  skills: [...prev.skills, ...skills]
                }));
              }}
            />
          </div>
          <div className="sticky top-8">
            <ResumePreview data={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
import { Button } from "@/components/ui/button";
import html2pdf from "html2pdf.js";

interface ResumePreviewProps {
  data: any;
}

const ResumePreview = ({ data }: ResumePreviewProps) => {
  const downloadPDF = () => {
    const element = document.getElementById("resume-preview");
    const opt = {
      margin: 1,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="space-y-4">
      <Button onClick={downloadPDF} className="w-full mb-4">
        Download PDF
      </Button>
      
      <div id="resume-preview" className="resume-section">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">{data.personalInfo.name}</h1>
          <div className="text-sm text-gray-600">
            <p>{data.personalInfo.email}</p>
            <p>{data.personalInfo.phone}</p>
            <p>{data.personalInfo.location}</p>
          </div>
        </div>

        {data.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Professional Summary</h2>
            <p className="text-gray-700">{data.summary}</p>
          </div>
        )}

        {data.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Work Experience</h2>
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="mb-4">
                <h3 className="font-medium">{exp.position}</h3>
                <p className="text-gray-600">{exp.company}</p>
                <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {data.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
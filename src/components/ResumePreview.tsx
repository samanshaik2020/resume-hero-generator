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
      
      <div 
        id="resume-preview" 
        className="resume-section text-left"
        style={{ fontFamily: 'Arial, sans-serif' }}
      >
        {/* Contact Information Section */}
        <div className="border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold text-center mb-4">{data.personalInfo.name}</h1>
          <div className="text-sm flex justify-center gap-4 flex-wrap">
            {data.personalInfo.email && (
              <span>Email: {data.personalInfo.email}</span>
            )}
            {data.personalInfo.phone && (
              <span>Phone: {data.personalInfo.phone}</span>
            )}
            {data.personalInfo.location && (
              <span>Location: {data.personalInfo.location}</span>
            )}
          </div>
        </div>

        {/* Professional Summary Section */}
        {data.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase mb-3 border-b pb-2">Professional Summary</h2>
            <p className="text-sm leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Work Experience Section */}
        {data.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase mb-3 border-b pb-2">Professional Experience</h2>
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-md">{exp.position}</h3>
                  {exp.duration && <span className="text-sm text-gray-600">{exp.duration}</span>}
                </div>
                <p className="text-md font-semibold text-gray-700 mb-1">{exp.company}</p>
                <ul className="list-disc ml-4 text-sm space-y-1">
                  {exp.description.split('\n').map((desc: string, i: number) => (
                    <li key={i} className="text-gray-600">{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Education Section */}
        {data.education && data.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase mb-3 border-b pb-2">Education</h2>
            {data.education.map((edu: any, index: number) => (
              <div key={index} className="mb-2">
                <h3 className="font-bold">{edu.degree}</h3>
                <p className="text-sm text-gray-600">{edu.institution} - {edu.year}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills Section */}
        {data.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase mb-3 border-b pb-2">Technical Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {data.projects && data.projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase mb-3 border-b pb-2">Projects</h2>
            {data.projects.map((project: any, index: number) => (
              <div key={index} className="mb-3">
                <h3 className="font-bold">{project.name}</h3>
                <p className="text-sm text-gray-600">{project.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface JobAnalysisProps {
  onSkillsUpdate: (skills: string[]) => void;
}

const JobAnalysis = ({ onSkillsUpdate }: JobAnalysisProps) => {
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const analyzeJobDescription = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("OPENAI_API_KEY")}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "Extract key skills and requirements from the job description. Return them as a comma-separated list.",
            },
            {
              role: "user",
              content: jobDescription,
            },
          ],
        }),
      });

      const data = await response.json();
      const skills = data.choices[0].message.content.split(",").map((s: string) => s.trim());
      onSkillsUpdate(skills);
      
      toast({
        title: "Analysis Complete",
        description: "Relevant skills have been added to your resume",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze job description. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="form-section">
      <h3 className="text-lg font-semibold mb-4">Job Description Analysis</h3>
      <div className="space-y-4">
        <Textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here for AI analysis..."
          className="h-48"
        />
        <Button 
          onClick={analyzeJobDescription} 
          disabled={!jobDescription || isAnalyzing}
          className="w-full"
        >
          {isAnalyzing ? "Analyzing..." : "Analyze Job Description"}
        </Button>
      </div>
    </div>
  );
};

export default JobAnalysis;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { History, LogOut } from "lucide-react";
import { MoodInputs } from "@/components/MoodInputs";
import { MealOutput } from "@/components/MealOutput";
import { getRecommendation, type UserInputs } from "@/utils/recommendation";
import { useToast } from "@/hooks/use-toast";


const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [view, setView] = useState<"input" | "output">("input");
  const [recommendation, setRecommendation] = useState<{
    meal: string;
    category: string;
    reason: string;
    matchScore: number;
  } | null>(null);

  const handleInputsComplete = (inputs: UserInputs) => {
    try {
      const result = getRecommendation(inputs);
      setRecommendation(result);
      setView("output");
      
      toast({
        title: "Recommendation Generated!",
        description: `Found the perfect meal for your ${inputs.mood} mood.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate recommendation. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    setView("input");
    setRecommendation(null);
  };

  const handleTryAgain = () => {
    setView("input");
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-warm bg-clip-text text-transparent">
            MoodMeal
          </h1>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={() => navigate("/history")}>
              <History className="w-4 h-4 mr-2" />
              History
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {view === "input" ? (
          <MoodInputs onComplete={handleInputsComplete} />
        ) : recommendation ? (
          <MealOutput
            meal={recommendation.meal}
            category={recommendation.category}
            reason={recommendation.reason}
            matchScore={recommendation.matchScore}
            onReset={handleReset}
            onTryAgain={handleTryAgain}
          />
        ) : null}
      </main>
    </div>
  );
};

export default Dashboard;

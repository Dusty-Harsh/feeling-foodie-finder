import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar } from "lucide-react";

// Mock history data
const historyData = [
  { date: "2025-11-05", mood: "Happy", emoji: "😊", meal: "🍕 Pizza Party" },
  { date: "2025-11-04", mood: "Excited", emoji: "😂", meal: "🌮 Spicy Tacos" },
  { date: "2025-11-03", mood: "Neutral", emoji: "😐", meal: "🥗 Fresh Garden Salad" },
  { date: "2025-11-02", mood: "Sad", emoji: "😢", meal: "🍜 Warm Ramen Bowl" },
  { date: "2025-11-01", mood: "Loving", emoji: "❤️", meal: "🍫 Chocolate Fondue" },
];

const History = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl font-bold mb-2">Your Mood & Meal History</h1>
            <p className="text-muted-foreground text-lg">
              Track your emotional eating journey
            </p>
          </div>

          <div className="space-y-4 animate-fade-in">
            {historyData.map((entry, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all hover:scale-[1.02] border-2"
              >
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="text-5xl">{entry.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <p className="font-semibold text-lg mb-1">
                      Mood: <span className="text-primary">{entry.mood}</span>
                    </p>
                    <p className="text-xl font-bold">{entry.meal}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {historyData.length === 0 && (
            <Card className="text-center p-12">
              <p className="text-muted-foreground text-lg">
                No history yet. Start by selecting your mood!
              </p>
              <Button variant="hero" className="mt-4" onClick={() => navigate("/dashboard")}>
                Get Started
              </Button>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default History;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Smile, Frown, Meh, Laugh, Angry, Heart, History, LogOut } from "lucide-react";

const moods = [
  { emoji: "😊", label: "Happy", icon: Smile, color: "bg-yellow-100 hover:bg-yellow-200 border-yellow-300" },
  { emoji: "😢", label: "Sad", icon: Frown, color: "bg-blue-100 hover:bg-blue-200 border-blue-300" },
  { emoji: "😐", label: "Neutral", icon: Meh, color: "bg-gray-100 hover:bg-gray-200 border-gray-300" },
  { emoji: "😂", label: "Excited", icon: Laugh, color: "bg-orange-100 hover:bg-orange-200 border-orange-300" },
  { emoji: "😠", label: "Angry", icon: Angry, color: "bg-red-100 hover:bg-red-200 border-red-300" },
  { emoji: "❤️", label: "Loving", icon: Heart, color: "bg-pink-100 hover:bg-pink-200 border-pink-300" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [mealSuggestion, setMealSuggestion] = useState<string | null>(null);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    // TODO: Call backend API to get meal suggestion
    // Mock suggestion for now
    const suggestions: Record<string, string> = {
      Happy: "🍕 Pizza Party! Share a delicious margherita with friends.",
      Sad: "🍜 Warm Ramen Bowl. Comfort food to lift your spirits.",
      Neutral: "🥗 Fresh Garden Salad. Keep it light and balanced.",
      Excited: "🌮 Spicy Tacos! Match your energy with bold flavors.",
      Angry: "🍔 Juicy Burger. Let off some steam with a satisfying bite.",
      Loving: "🍫 Chocolate Fondue. Sweet treats for sweet moments.",
    };
    setMealSuggestion(suggestions[mood] || "🍽️ Chef's Special");
  };

  const handleLogout = () => {
    // TODO: Implement actual logout logic
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
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center animate-fade-in">
            <h2 className="text-4xl font-bold mb-2">How are you feeling today?</h2>
            <p className="text-muted-foreground text-lg">
              Select your mood and we'll suggest the perfect meal
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-fade-in">
            {moods.map((mood) => (
              <Card
                key={mood.label}
                className={`cursor-pointer transition-all hover:scale-105 hover:shadow-xl border-2 ${
                  selectedMood === mood.label ? "ring-4 ring-primary scale-105" : ""
                } ${mood.color}`}
                onClick={() => handleMoodSelect(mood.label)}
              >
                <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
                  <span className="text-5xl">{mood.emoji}</span>
                  <p className="font-semibold text-lg">{mood.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {mealSuggestion && (
            <Card className="animate-fade-in shadow-2xl border-2 bg-gradient-to-br from-card to-muted/20">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Your Perfect Meal</CardTitle>
                <CardDescription className="text-center text-base">
                  Based on your {selectedMood} mood
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-3xl font-bold mb-4">{mealSuggestion}</p>
                <div className="flex gap-3 justify-center">
                  <Button variant="hero">Order Now</Button>
                  <Button variant="outline" onClick={() => handleMoodSelect(selectedMood!)}>
                    Try Another
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

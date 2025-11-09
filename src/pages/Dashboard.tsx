import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Smile, Frown, Meh, Laugh, Angry, Heart, History, LogOut, ArrowLeft } from "lucide-react";

const moodData = {
  "😊 Happy": {
    emoji: "😊",
    label: "Happy",
    icon: Smile,
    color: "bg-yellow-100 hover:bg-yellow-200 border-yellow-300",
    submoods: {
      Cheerful: ["Fruit smoothie bowl", "Veggie tacos", "Honey-glazed paneer bites"],
      Content: ["Dal khichdi", "Veg pulao", "Garlic butter toast"],
      Joyful: ["Margherita pizza", "Chole bhature", "Chocolate brownies"],
      Playful: ["Nachos with salsa", "Fries + cheese dip", "Mini burgers"],
    },
  },
  "😢 Sad": {
    emoji: "😢",
    label: "Sad",
    icon: Frown,
    color: "bg-blue-100 hover:bg-blue-200 border-blue-300",
    submoods: {
      Lonely: ["Tomato basil soup", "Mashed potatoes", "Mac and cheese"],
      Heartbroken: ["Dark chocolate sundae", "Hot chocolate", "Cheesecake slice"],
      Melancholic: ["Lemon rice", "Veg ramen", "Grilled cheese sandwich"],
      Overwhelmed: ["Clear veg soup", "Steamed dumplings", "Curd rice"],
    },
  },
  "😐 Neutral": {
    emoji: "😐",
    label: "Neutral",
    icon: Meh,
    color: "bg-gray-100 hover:bg-gray-200 border-gray-300",
    submoods: {
      Calm: ["Green salad", "Veg sushi", "Hummus with pita"],
      Relaxed: ["Iced coffee", "Avocado toast", "Pasta alfredo"],
      Indifferent: ["Veg sandwich", "Idli sambhar", "Garlic noodles"],
      Thoughtful: ["Herbal tea", "Buddha bowl", "Stir-fried veggies"],
    },
  },
  "😡 Angry": {
    emoji: "😡",
    label: "Angry",
    icon: Angry,
    color: "bg-red-100 hover:bg-red-200 border-red-300",
    submoods: {
      Frustrated: ["Spicy ramen", "Schezwan noodles", "Chilli paneer"],
      Annoyed: ["Veg burger", "Loaded fries", "Grilled panini"],
      Stressed: ["Peanut butter smoothie", "Oats + fruits", "Banana pancakes"],
      Irritated: ["Lemon ice tea", "Wraps (veg/chicken)", "Teriyaki rice bowl"],
    },
  },
  "🤩 Excited": {
    emoji: "🤩",
    label: "Excited",
    icon: Laugh,
    color: "bg-orange-100 hover:bg-orange-200 border-orange-300",
    submoods: {
      Thrilled: ["Loaded nachos", "Peri-peri pizza", "Nutella waffles"],
      Curious: ["Korean bibimbap", "Sushi platter", "Thai green curry"],
      Motivated: ["Protein salad", "Quinoa bowl", "Paneer steak"],
      Adventurous: ["Burrito bowl", "Ramen with toppings", "Falafel wrap"],
    },
  },
  "💗 Lovable": {
    emoji: "💗",
    label: "Lovable",
    icon: Heart,
    color: "bg-pink-100 hover:bg-pink-200 border-pink-300",
    submoods: {
      Romantic: ["Heart-shaped pancakes", "Strawberry mousse", "Red pasta"],
      Affectionate: ["Hot chocolate with marshmallows", "Soft cookies", "Stuffed paratha"],
      Flirty: ["Bubble tea", "Cheese fondue", "Fruit platter with dips"],
      Dreamy: ["Blueberry cheesecake", "Rose milk", "Belgian waffles"],
    },
  },
};

const moods = Object.keys(moodData).map((key) => ({
  key,
  ...moodData[key as keyof typeof moodData],
}));

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedSubmood, setSelectedSubmood] = useState<string | null>(null);
  const [mealSuggestions, setMealSuggestions] = useState<string[]>([]);

  const handleMoodSelect = (moodKey: string) => {
    setSelectedMood(moodKey);
    setSelectedSubmood(null);
    setMealSuggestions([]);
  };

  const handleSubmoodSelect = (submood: string) => {
    setSelectedSubmood(submood);
    if (selectedMood) {
      const mood = moodData[selectedMood as keyof typeof moodData];
      setMealSuggestions(mood.submoods[submood as keyof typeof mood.submoods]);
    }
  };

  const handleReset = () => {
    setSelectedMood(null);
    setSelectedSubmood(null);
    setMealSuggestions([]);
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
            <h2 className="text-4xl font-bold mb-2">
              {!selectedMood && "How are you feeling today?"}
              {selectedMood && !selectedSubmood && "Tell us more..."}
              {selectedSubmood && "Your Perfect Meals"}
            </h2>
            <p className="text-muted-foreground text-lg">
              {!selectedMood && "Select your mood and we'll suggest the perfect meal"}
              {selectedMood && !selectedSubmood && "Choose what describes your mood best"}
              {selectedSubmood && `Based on your ${selectedSubmood} mood`}
            </p>
          </div>

          {!selectedMood && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-fade-in">
              {moods.map((mood) => (
                <Card
                  key={mood.key}
                  className={`cursor-pointer transition-all hover:scale-105 hover:shadow-xl border-2 ${mood.color}`}
                  onClick={() => handleMoodSelect(mood.key)}
                >
                  <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
                    <span className="text-5xl">{mood.emoji}</span>
                    <p className="font-semibold text-lg">{mood.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {selectedMood && !selectedSubmood && (
            <div className="space-y-4 animate-fade-in">
              <Button variant="ghost" onClick={handleReset} className="mb-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Moods
              </Button>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                {Object.keys(moodData[selectedMood as keyof typeof moodData].submoods).map((submood) => (
                  <Card
                    key={submood}
                    className={`cursor-pointer transition-all hover:scale-105 hover:shadow-xl border-2 ${
                      moodData[selectedMood as keyof typeof moodData].color
                    }`}
                    onClick={() => handleSubmoodSelect(submood)}
                  >
                    <CardContent className="flex items-center justify-center p-6">
                      <p className="font-semibold text-xl">{submood}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {mealSuggestions.length > 0 && (
            <div className="space-y-4 animate-fade-in">
              <Button variant="ghost" onClick={() => setSelectedSubmood(null)} className="mb-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Submoods
              </Button>
              <Card className="shadow-2xl border-2 bg-gradient-to-br from-card to-muted/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Your Perfect Meals</CardTitle>
                  <CardDescription className="text-center text-base">
                    Recommended for your {selectedSubmood} mood
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {mealSuggestions.map((meal, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg bg-muted/50 border border-border hover:bg-muted transition-colors"
                      >
                        <p className="text-lg font-medium text-center">🍽️ {meal}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3 justify-center flex-wrap">
                    <Button variant="hero">Order Now</Button>
                    <Button variant="outline" onClick={() => setSelectedSubmood(null)}>
                      Try Another Submood
                    </Button>
                    <Button variant="outline" onClick={handleReset}>
                      Change Mood
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

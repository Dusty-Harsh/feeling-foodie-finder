import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Smile, Frown, Meh, Angry, Laugh, Heart, Sun, Cloud, CloudRain, Snowflake, Activity, Coffee, Moon, Sunrise } from "lucide-react";
import gsap from "gsap";

interface MoodInputsProps {
  onComplete: (inputs: any) => void;
}

const moods = [
  { value: "happy", label: "Happy", icon: Smile, color: "bg-yellow-100 hover:bg-yellow-200 border-yellow-300 text-yellow-700" },
  { value: "sad", label: "Sad", icon: Frown, color: "bg-blue-100 hover:bg-blue-200 border-blue-300 text-blue-700" },
  { value: "neutral", label: "Neutral", icon: Meh, color: "bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-700" },
  { value: "angry", label: "Angry", icon: Angry, color: "bg-red-100 hover:bg-red-200 border-red-300 text-red-700" },
  { value: "excited", label: "Excited", icon: Laugh, color: "bg-orange-100 hover:bg-orange-200 border-orange-300 text-orange-700" },
  { value: "lovable", label: "Lovable", icon: Heart, color: "bg-pink-100 hover:bg-pink-200 border-pink-300 text-pink-700" },
];

const cravings = [
  { value: "spicy", label: "🌶️ Spicy" },
  { value: "sweet", label: "🍰 Sweet" },
  { value: "savory", label: "🍜 Savory" },
  { value: "crunchy", label: "🥨 Crunchy" },
  { value: "comfort", label: "🛋️ Comfort" },
  { value: "healthy", label: "🥗 Healthy" },
];

const times = [
  { value: "morning", label: "Morning", icon: Sunrise },
  { value: "afternoon", label: "Afternoon", icon: Sun },
  { value: "evening", label: "Evening", icon: Cloud },
  { value: "night", label: "Night", icon: Moon },
];

const diets = [
  { value: "veg", label: "Vegetarian" },
  { value: "non-veg", label: "Non-Veg" },
  { value: "vegan", label: "Vegan" },
  { value: "egg", label: "Egg" },
];

const restrictionOptions = [
  { value: "none", label: "None" },
  { value: "gluten-free", label: "Gluten-Free" },
  { value: "nut-free", label: "Nut-Free" },
  { value: "lactose-free", label: "Lactose-Free" },
  { value: "low-sugar", label: "Low Sugar" },
];

const budgets = [
  { value: "low", label: "💵 Low" },
  { value: "medium", label: "💵💵 Medium" },
  { value: "high", label: "💵💵💵 High" },
];

const weathers = [
  { value: "hot", label: "Hot", icon: Sun },
  { value: "cold", label: "Cold", icon: Snowflake },
  { value: "rainy", label: "Rainy", icon: CloudRain },
];

const activities = [
  { value: "resting", label: "Resting" },
  { value: "normal", label: "Normal" },
  { value: "active", label: "Active" },
  { value: "post-workout", label: "Post-Workout" },
];

export const MoodInputs = ({ onComplete }: MoodInputsProps) => {
  const [mood, setMood] = useState("");
  const [hunger, setHunger] = useState([50]);
  const [craving, setCraving] = useState("");
  const [time, setTime] = useState("");
  const [diet, setDiet] = useState("");
  const [restrictions, setRestrictions] = useState("none");
  const [budget, setBudget] = useState("medium");
  const [weather, setWeather] = useState("");
  const [activity, setActivity] = useState("normal");
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  const getHungerLabel = (value: number) => {
    if (value < 33) return "low";
    if (value < 66) return "medium";
    return "high";
  };

  const handleSubmit = () => {
    const inputs = {
      mood,
      hunger: getHungerLabel(hunger[0]),
      craving,
      time,
      diet,
      restrictions,
      budget,
      weather,
      activity,
    };
    onComplete(inputs);
  };

  const isComplete = mood && craving && time && diet && weather;

  return (
    <div ref={containerRef} className="space-y-6 max-w-4xl mx-auto">
      {/* Primary Inputs */}
      <Card className="border-2 border-primary/20 shadow-xl">
        <CardContent className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold bg-gradient-warm bg-clip-text text-transparent">
              How are you feeling?
            </h2>
            <p className="text-muted-foreground">Tell us more about your current state</p>
          </div>

          {/* Mood Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Current Mood *</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {moods.map((m) => {
                const Icon = m.icon;
                return (
                  <Card
                    key={m.value}
                    className={`cursor-pointer transition-all hover:scale-105 border-2 ${
                      mood === m.value ? m.color + " ring-2 ring-primary" : "hover:border-primary/50"
                    }`}
                    onClick={() => setMood(m.value)}
                  >
                    <CardContent className="flex flex-col items-center justify-center p-4 space-y-2">
                      <Icon className="w-8 h-8" />
                      <p className="font-semibold text-sm">{m.label}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Hunger Level */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">
              Hunger Level: <span className="text-primary">{getHungerLabel(hunger[0]).toUpperCase()}</span>
            </label>
            <Slider
              value={hunger}
              onValueChange={setHunger}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          {/* Craving Type */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Craving Type *</label>
            <div className="flex flex-wrap gap-2">
              {cravings.map((c) => (
                <Badge
                  key={c.value}
                  variant={craving === c.value ? "default" : "outline"}
                  className={`cursor-pointer text-sm py-2 px-4 transition-all hover:scale-105 ${
                    craving === c.value ? "shadow-lg" : ""
                  }`}
                  onClick={() => setCraving(c.value)}
                >
                  {c.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Time of Day */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Time of Day *</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {times.map((t) => {
                const Icon = t.icon;
                return (
                  <Card
                    key={t.value}
                    className={`cursor-pointer transition-all hover:scale-105 border-2 ${
                      time === t.value ? "border-primary bg-primary/10" : "hover:border-primary/50"
                    }`}
                    onClick={() => setTime(t.value)}
                  >
                    <CardContent className="flex flex-col items-center justify-center p-3 space-y-1">
                      <Icon className="w-6 h-6" />
                      <p className="font-medium text-xs">{t.label}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Secondary Inputs */}
      <Card className="border-2 border-muted shadow-lg">
        <CardContent className="p-6 space-y-6">
          <h3 className="text-lg font-bold text-foreground">Additional Preferences</h3>

          {/* Diet Preference */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Diet Preference *</label>
            <div className="flex flex-wrap gap-2">
              {diets.map((d) => (
                <Badge
                  key={d.value}
                  variant={diet === d.value ? "default" : "outline"}
                  className={`cursor-pointer text-sm py-2 px-4 transition-all hover:scale-105 ${
                    diet === d.value ? "shadow-lg" : ""
                  }`}
                  onClick={() => setDiet(d.value)}
                >
                  {d.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Food Restrictions */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Food Restrictions</label>
            <div className="flex flex-wrap gap-2">
              {restrictionOptions.map((r) => (
                <Badge
                  key={r.value}
                  variant={restrictions === r.value ? "default" : "outline"}
                  className={`cursor-pointer text-sm py-2 px-4 transition-all hover:scale-105 ${
                    restrictions === r.value ? "shadow-lg" : ""
                  }`}
                  onClick={() => setRestrictions(r.value)}
                >
                  {r.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Budget</label>
            <div className="flex flex-wrap gap-2">
              {budgets.map((b) => (
                <Badge
                  key={b.value}
                  variant={budget === b.value ? "default" : "outline"}
                  className={`cursor-pointer text-sm py-2 px-4 transition-all hover:scale-105 ${
                    budget === b.value ? "shadow-lg" : ""
                  }`}
                  onClick={() => setBudget(b.value)}
                >
                  {b.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Weather */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Weather *</label>
            <div className="grid grid-cols-3 gap-3">
              {weathers.map((w) => {
                const Icon = w.icon;
                return (
                  <Card
                    key={w.value}
                    className={`cursor-pointer transition-all hover:scale-105 border-2 ${
                      weather === w.value ? "border-primary bg-primary/10" : "hover:border-primary/50"
                    }`}
                    onClick={() => setWeather(w.value)}
                  >
                    <CardContent className="flex flex-col items-center justify-center p-3 space-y-1">
                      <Icon className="w-6 h-6" />
                      <p className="font-medium text-xs">{w.label}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Activity Level */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Activity Level</label>
            <div className="flex flex-wrap gap-2">
              {activities.map((a) => (
                <Badge
                  key={a.value}
                  variant={activity === a.value ? "default" : "outline"}
                  className={`cursor-pointer text-sm py-2 px-4 transition-all hover:scale-105 ${
                    activity === a.value ? "shadow-lg" : ""
                  }`}
                  onClick={() => setActivity(a.value)}
                >
                  {a.label}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button
          onClick={handleSubmit}
          disabled={!isComplete}
          size="lg"
          className="text-lg px-8 shadow-xl hover:shadow-2xl transition-all"
        >
          Get My Meal Suggestion 🍽️
        </Button>
      </div>
    </div>
  );
};

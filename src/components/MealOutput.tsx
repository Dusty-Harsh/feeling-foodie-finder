import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, RefreshCw, ArrowLeft } from "lucide-react";
import gsap from "gsap";

interface MealOutputProps {
  meal: string;
  category: string;
  reason: string;
  matchScore: number;
  onReset: () => void;
  onTryAgain: () => void;
}

export const MealOutput = ({ meal, category, reason, matchScore, onReset, onTryAgain }: MealOutputProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { scale: 0.8, opacity: 0, rotateY: -180 },
        { scale: 1, opacity: 1, rotateY: 0, duration: 0.8, ease: "back.out(1.7)" }
      );
    }

    if (sparklesRef.current) {
      gsap.to(sparklesRef.current, {
        rotation: 360,
        duration: 3,
        repeat: -1,
        ease: "linear"
      });
    }
  }, []);

  const getMatchQuality = (score: number) => {
    if (score >= 20) return { label: "Perfect Match!", color: "bg-green-500" };
    if (score >= 15) return { label: "Great Match!", color: "bg-blue-500" };
    if (score >= 10) return { label: "Good Match", color: "bg-yellow-500" };
    return { label: "Suggested", color: "bg-gray-500" };
  };

  const matchQuality = getMatchQuality(matchScore);

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center">
        <div ref={sparklesRef} className="inline-block mb-4">
          <Sparkles className="w-16 h-16 text-primary" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Your Perfect Meal!</h2>
        <Badge className={`${matchQuality.color} text-white`}>{matchQuality.label}</Badge>
      </div>

      <Card ref={cardRef} className="border-2 border-primary shadow-2xl bg-gradient-to-br from-card to-muted/20">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-4xl font-bold text-primary">{meal}</CardTitle>
          <Badge variant="outline" className="mx-auto mt-2 text-sm">
            {category}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-muted/50 rounded-lg border border-border">
            <p className="text-lg font-medium text-foreground mb-2">Why this meal?</p>
            <p className="text-muted-foreground">{reason}</p>
          </div>

          <div className="flex gap-3 justify-center flex-wrap">
            <Button variant="hero" size="lg" className="shadow-lg">
              Order Now 🍽️
            </Button>
            <Button variant="outline" size="lg" onClick={onTryAgain}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button variant="outline" size="lg" onClick={onReset}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              New Search
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Match Score: {matchScore}/28 points</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

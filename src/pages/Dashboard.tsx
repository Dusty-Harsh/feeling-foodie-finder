import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { History, LogOut, ShoppingCart } from "lucide-react";
import { MoodInputs } from "@/components/MoodInputs";
import { MealOutput } from "@/components/MealOutput";
import { Cart } from "@/components/Cart";
import { getRecommendation, type UserInputs } from "@/utils/recommendation";
import { useToast } from "@/hooks/use-toast";

export interface CartItem {
  id: string;
  meal: string;
  category: string;
  price: number;
  timestamp: Date;
}


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
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

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

  const handleAddToCart = (meal: string, category: string) => {
    const price = generatePrice(category, meal);
    const newItem: CartItem = {
      id: Date.now().toString(),
      meal,
      category,
      price,
      timestamp: new Date(),
    };
    
    setCart([...cart, newItem]);
    setCartOpen(true);
    
    toast({
      title: "Added to Cart! 🛒",
      description: `${meal} - ₹${price}`,
    });
  };

  const generatePrice = (category: string, meal: string): number => {
    const basePrice: Record<string, [number, number]> = {
      breakfast: [80, 150],
      "main course": [150, 300],
      snack: [50, 120],
      dessert: [60, 180],
      drink: [40, 100],
    };

    const [min, max] = basePrice[category.toLowerCase()] || [100, 200];
    const isPremium = meal.toLowerCase().includes("special") || 
                      meal.toLowerCase().includes("deluxe") ||
                      meal.toLowerCase().includes("premium");
    
    const multiplier = isPremium ? 1.3 : 1;
    return Math.round((Math.random() * (max - min) + min) * multiplier);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-warm bg-clip-text text-transparent">
            MoodMeal
          </h1>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={() => setCartOpen(true)} className="relative">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Button>
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
            onAddToCart={handleAddToCart}
          />
        ) : null}
      </main>

      <Cart 
        open={cartOpen}
        onOpenChange={setCartOpen}
        items={cart}
        onRemoveItem={handleRemoveFromCart}
      />
    </div>
  );
};

export default Dashboard;

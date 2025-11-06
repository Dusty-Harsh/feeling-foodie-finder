import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Utensils, Sparkles, TrendingUp, Users } from "lucide-react";
import heroImage from "@/assets/hero-food.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90 z-0"></div>
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15,
          }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="inline-block animate-float mb-4">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-2xl">
                <Utensils className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
              Eat What You
              <span className="block bg-white/10 backdrop-blur-sm px-6 py-2 rounded-2xl mt-2 inline-block">
                Feel
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              MoodMeal matches your emotions with the perfect meal. Because food tastes better when it fits your vibe.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="text-lg h-14 px-8" variant="hero">
                <Link to="/signup">Get Started Free</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg h-14 px-8 bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white hover:text-primary">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why <span className="bg-gradient-warm bg-clip-text text-transparent">MoodMeal</span>?
            </h2>
            <p className="text-xl text-muted-foreground">
              Smart meal suggestions based on science and your emotions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center space-y-4 p-8 rounded-2xl bg-card border-2 hover:shadow-xl transition-all hover:scale-105">
              <div className="w-16 h-16 bg-gradient-warm rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Mood-Based AI</h3>
              <p className="text-muted-foreground">
                Advanced algorithms match your feelings with the perfect comfort food
              </p>
            </div>

            <div className="text-center space-y-4 p-8 rounded-2xl bg-card border-2 hover:shadow-xl transition-all hover:scale-105">
              <div className="w-16 h-16 bg-gradient-warm rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Track Progress</h3>
              <p className="text-muted-foreground">
                See your emotional eating patterns and discover what works best
              </p>
            </div>

            <div className="text-center space-y-4 p-8 rounded-2xl bg-card border-2 hover:shadow-xl transition-all hover:scale-105">
              <div className="w-16 h-16 bg-gradient-warm rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Community Favorites</h3>
              <p className="text-muted-foreground">
                Discover what thousands of users eat when they're feeling like you
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-warm relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to eat smarter?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of happy eaters who've discovered their perfect mood-meal match
          </p>
          <Button asChild size="lg" className="text-lg h-14 px-8 bg-white text-primary hover:bg-white/90 shadow-2xl">
            <Link to="/signup">Start Your Journey</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t bg-card/50">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 MoodMeal. Eat with emotion, live with passion.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

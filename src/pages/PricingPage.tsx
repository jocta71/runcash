
import React from "react";
import { Link } from "react-router-dom";
import { Check, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container max-w-6xl px-4 py-16 mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select the perfect plan for your needs and start winning with our powerful roulette analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Start Plan */}
          <Card className="border border-border hover:border-vegas-green transition-all duration-300">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">Start</CardTitle>
              <CardDescription>For beginners</CardDescription>
              <div className="mt-4 flex justify-center">
                <span className="text-4xl font-bold">Free</span>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="text-vegas-green mr-2 h-5 w-5 mt-0.5" />
                  <span>Basic roulette statistics</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-vegas-green mr-2 h-5 w-5 mt-0.5" />
                  <span>Access to 5 public roulettes</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-vegas-green mr-2 h-5 w-5 mt-0.5" />
                  <span>Limited historical data</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Separator className="my-4" />
              <Button className="w-full" variant="outline">
                <Link to="/auth">Get Started</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Basic Plan */}
          <Card className="border border-border hover:border-vegas-green transition-all duration-300">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">Basic</CardTitle>
              <CardDescription>For casual players</CardDescription>
              <div className="mt-4 flex justify-center">
                <span className="text-4xl font-bold">$19</span>
                <span className="text-muted-foreground ml-1 self-end">/month</span>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="text-vegas-green mr-2 h-5 w-5 mt-0.5" />
                  <span>Advanced statistics & analysis</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-vegas-green mr-2 h-5 w-5 mt-0.5" />
                  <span>Access to 20 roulettes</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-vegas-green mr-2 h-5 w-5 mt-0.5" />
                  <span>30-day historical data</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-vegas-green mr-2 h-5 w-5 mt-0.5" />
                  <span>Basic winning predictions</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-vegas-green mr-2 h-5 w-5 mt-0.5" />
                  <span>Email support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Separator className="my-4" />
              <Button className="w-full">
                <Link to="/auth" className="text-black">Subscribe Now</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="border-2 border-vegas-green shadow-[0_0_15px_rgba(0,255,0,0.3)] relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-vegas-green text-black px-4 py-1 rounded-full text-sm font-bold flex items-center">
              <Star className="w-4 h-4 mr-1" />
              Most Popular
            </div>
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">Pro</CardTitle>
              <CardDescription>For serious players</CardDescription>
              <div className="mt-4 flex justify-center">
                <span className="text-4xl font-bold">$49</span>
                <span className="text-muted-foreground ml-1 self-end">/month</span>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="text-vegas-green mr-2 h-5 w-5 mt-0.5" />
                  <span>Premium statistics & real-time analytics</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-vegas-green mr-2 h-5 w-5 mt-0.5" />
                  <span>Unlimited access to all roulettes</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-vegas-green mr-2 h-5 w-5 mt-0.5" />
                  <span>Full historical data access</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-vegas-green mr-2 h-5 w-5 mt-0.5" />
                  <span>Advanced AI predictions & strategies</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-vegas-green mr-2 h-5 w-5 mt-0.5" />
                  <span>Custom betting patterns</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-vegas-green mr-2 h-5 w-5 mt-0.5" />
                  <span>Priority 24/7 support</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-vegas-green mr-2 h-5 w-5 mt-0.5" />
                  <span>Monthly strategy consultation</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Separator className="my-4" />
              <Button className="w-full bg-vegas-green hover:bg-vegas-green/80 text-black font-bold">
                <Link to="/auth">Go Pro</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Need a custom solution?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Contact us for enterprise plans or custom solutions tailored to your specific needs.
          </p>
          <Button variant="outline" className="neon-border-green">
            Contact Sales
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;

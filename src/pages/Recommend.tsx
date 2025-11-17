// ▼▼▼ PASTE THIS ENTIRE CODE INTO YOUR BLANK 'Recommend.tsx' FILE ▼▼▼

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RecommendationData {
  crop: string;
  score: number;
  timestamp: string;
  inputs: {
    ph: number;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    temp: number; // This one is 'temp'
    humidity: number;
    rainfall: number;
  };
}

const Recommend = () => {
  const [formData, setFormData] = useState({
    ph: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "", // This one is 'temperature'
    humidity: "",
    rainfall: "",
  });

  const [recommendation, setRecommendation] = useState<RecommendationData | null>(null);
  const [history, setHistory] = useState<RecommendationData[]>([]);

  // ★★★ THIS IS YOUR NEW, UPGRADED FUNCTION ★★★
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Get the "order" from the form
    const inputs = {
      ph: parseFloat(formData.ph),
      nitrogen: parseFloat(formData.nitrogen),
      phosphorus: parseFloat(formData.phosphorus),
      potassium: parseFloat(formData.potassium),
      temperature: parseFloat(formData.temperature), // Reads from the form
      humidity: parseFloat(formData.humidity),
      rainfall: parseFloat(formData.rainfall),
    };

    // 2. Send the "order" to your NEW Google Colab "Kitchen"
    // ★★★ YOUR URL IS PASTED HERE! ★★★
    const API_ENDPOINT_URL = "https://lemonlike-wilhemina-unacrimoniously.ngrok-free.dev/recommend";

    try {
      // Show a loading message
      setRecommendation(null); // Clear old results
      alert("Sending data to the 'Kitchen'... Please wait.");

      const response = await fetch(API_ENDPOINT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });

      const result = await response.json(); // Get the answer, e.g., { crop: "Rice", score: 95.0 }

      if (result.error) {
        throw new Error(result.error);
      }
      
      // 3. Create the new recommendation
      const newRecommendation: RecommendationData = {
        crop: result.crop,
        score: result.score,
        timestamp: new Date().toLocaleString(),
        inputs: { // ★★★ I fixed the 'temp' vs 'temperature' bug here ★★★
          ph: inputs.ph,
          nitrogen: inputs.nitrogen,
          phosphorus: inputs.phosphorus,
          potassium: inputs.potassium,
          temp: inputs.temperature, // This matches your interface
          humidity: inputs.humidity,
          rainfall: inputs.rainfall,
        },
      };

      // 4. Update your page (same as before!)
      setRecommendation(newRecommendation);
      setHistory([newRecommendation, ...history]);

    } catch (error) {
      console.error("Error calling the 'Kitchen' (API):", error);
      alert("Sorry, something went wrong with the recommendation. Check the console for errors.");
    }
  };
  // ★★★ END OF YOUR NEW FUNCTION ★★★


  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ★★★ I ALSO FIXED YOUR FORM HTML - YOUR OLD ONE HAD TWO <form> TAGS ★★★
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navigation />
      
      <div className="container py-8">
        {/* The <form> tag now wraps BOTH cards and the button */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Form Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Soil Data Card */}
            <Card className="border-2">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
                <CardTitle className="text-3xl font-bold">Enter Your Soil Data</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="ph">Soil pH Level</Label>
                      <Input
                        id="ph"
                        type="number"
                        step="0.1"
                        min="0"
                        max="14"
                        placeholder="e.g., 6.5"
                        value={formData.ph}
                        onChange={(e) => handleInputChange("ph", e.target.value)}
                        className="border-2"
                        required
                      />
                      <p className="text-xs text-muted-foreground">Enter pH value between 0-14 (neutral: 7)</p>
                    </div>
                    
                    {/* Soil Nutrients */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                      <div className="space-y-2">
                        <Label htmlFor="nitrogen">Nitrogen (N)</Label>
                        <Input
                          id="nitrogen"
                          type="number"
                          min="0"
                          required
                          value={formData.nitrogen}
                          onChange={(e) => handleInputChange("nitrogen", e.target.value)}
                          className="border-2"
                          placeholder="0-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phosphorus">Phosphorus (P)</Label>
                        <Input
                          id="phosphorus"
                          type="number"
                          min="0"
                          required
                          value={formData.phosphorus}
                          onChange={(e) => handleInputChange("phosphorus", e.target.value)}
                          className="border-2"
                          placeholder="0-100"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="potassium">Potassium (K)</Label>
                        <Input
                          id="potassium"
                          type="number"
                          min="0"
                          required
                          value={formData.potassium}
                          onChange={(e) => handleInputChange("potassium", e.target.value)}
                          className="border-2"
                          placeholder="0-100"
                        />
                      </div>
                    </div>
                  </div>
              </CardContent>
            </Card>

            {/* Weather Data Card */}
            <Card className="border-2">
              <CardHeader className="bg-gradient-to-r from-secondary/10 to-primary/10">
                <CardTitle className="text-3xl font-bold">Enter Weather Data</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="temperature">Temperature (°C)</Label>
                        <Input
                          id="temperature"
                          type="number"
                          required
                          value={formData.temperature}
                          onChange={(e) => handleInputChange("temperature", e.target.value)}
                          className="border-2"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="humidity">Humidity (%)</Label>
                        <Input
                          id="humidity"
                          type="number"
                          min="0"
                          max="100"
                          required
                          value={formData.humidity}
                          onChange={(e) => handleInputChange("humidity", e.target.value)}
                          className="border-2"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rainfall">Rainfall (mm)</Label>
                        <Input
                          id="rainfall"
                          type="number"
                          min="0"
                          required
                          value={formData.rainfall}
                          onChange={(e) => handleInputChange("rainfall", e.target.value)}
                          className="border-2"
                        />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full text-lg h-14 mt-6">
                    Get Crop Recommendation
                  </Button>
              </CardContent>
            </Card>

            {/* Recommendation Output */}
            {recommendation && (
              <Card className="border-2 border-accent bg-gradient-to-br from-accent/5 to-secondary/5 animate-fade-in">
                <CardContent className="pt-6 space-y-4">
                  <h3 className="text-2xl font-bold text-center">Recommended Crop</h3>
                  <div className="text-center space-y-2">
                    <p className="text-5xl font-bold text-primary">{recommendation.crop}</p>
                    <p className="text-xl text-muted-foreground">
                      Match Score: <span className="font-semibold text-accent">{recommendation.score}%</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* History Column */}
          <div className="lg:col-span-1">
            <Card className="border-2 sticky top-20">
              <CardHeader className="bg-gradient-to-r from-secondary/10 to-primary/10">
                <CardTitle>Your Past Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ScrollArea className="h-[600px] pr-4">
                  {history.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No history yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {history.map((item, index) => (
                        <Card key={index} className="border bg-card/50">
                          <CardContent className="pt-4 space-y-2">
                            <div className="flex justify-between items-start">
                              <p className="font-bold text-lg text-primary">{item.crop}</p>
                              <p className="text-sm text-accent font-semibold">{item.score}%</p>
                            </div>
                            <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
          
        </form> {/* The </form> tag now ends here, wrapping everything */}
      </div>
    </div>
  );
};

export default Recommend;

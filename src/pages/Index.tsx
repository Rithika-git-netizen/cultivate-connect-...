import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sprout } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  nitrogen: z.coerce.number().min(0, "Must be at least 0"),
  phosphorus: z.coerce.number().min(0, "Must be at least 0"),
  potassium: z.coerce.number().min(0, "Must be at least 0"),
  temperature: z.coerce.number(),
  humidity: z.coerce.number(),
  ph: z.coerce.number().min(0, "pH must be at least 0").max(14, "pH cannot exceed 14"),
  rainfall: z.coerce.number(),
});

type FormValues = z.infer<typeof formSchema>;

interface Recommendation {
  crop: string;
  score: number;
  timestamp: Date;
  data: FormValues;
}

const Index = () => {
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [history, setHistory] = useState<Recommendation[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nitrogen: 0,
      phosphorus: 0,
      potassium: 0,
      temperature: 0,
      humidity: 0,
      ph: 7,
      rainfall: 0,
    },
  });

  const onSubmit = (values: FormValues) => {
    // Mock recommendation logic
    const crops = ["Rice", "Wheat", "Cotton", "Maize", "Sugarcane", "Coffee", "Tea"];
    const randomCrop = crops[Math.floor(Math.random() * crops.length)];
    const matchScore = Math.floor(Math.random() * 30) + 70; // 70-100%

    const newRecommendation: Recommendation = {
      crop: randomCrop,
      score: matchScore,
      timestamp: new Date(),
      data: values,
    };

    setRecommendation(newRecommendation);
    setHistory([newRecommendation, ...history]);

    toast({
      title: "Recommendation Generated",
      description: `${randomCrop} is recommended for your soil conditions.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Header */}
      <div className="bg-primary/10 border-b border-primary/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="p-3 bg-primary/20 rounded-2xl">
              <Sprout className="h-10 w-10 md:h-12 md:w-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Cultivate Connect
            </h1>
          </div>
          <p className="text-center text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            AI-powered crop recommendations based on your soil and weather conditions
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg border-primary/20 overflow-hidden">
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 px-6 py-4 border-b border-primary/20">
                <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  Enter Soil & Weather Data
                </CardTitle>
              </div>
              <CardContent className="pt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Soil Nutrients */}
                    <div className="space-y-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                      <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                        <div className="w-1 h-6 bg-primary rounded-full"></div>
                        Soil Nutrients
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name="nitrogen"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nitrogen (N)</FormLabel>
                              <FormControl>
                                <Input type="number" step="0.01" placeholder="0" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phosphorus"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phosphorus (P)</FormLabel>
                              <FormControl>
                                <Input type="number" step="0.01" placeholder="0" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="potassium"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Potassium (K)</FormLabel>
                              <FormControl>
                                <Input type="number" step="0.01" placeholder="0" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Atmospheric Conditions */}
                    <div className="space-y-4 p-4 rounded-xl bg-accent/5 border border-accent/10">
                      <h3 className="text-lg font-bold text-accent-foreground flex items-center gap-2">
                        <div className="w-1 h-6 bg-accent rounded-full"></div>
                        Atmospheric Conditions
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <FormField
                          control={form.control}
                          name="temperature"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Temperature (°C)</FormLabel>
                              <FormControl>
                                <Input type="number" step="0.1" placeholder="0" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="humidity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Humidity (%)</FormLabel>
                              <FormControl>
                                <Input type="number" step="0.1" placeholder="0" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="ph"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Soil pH</FormLabel>
                              <FormControl>
                                <Input type="number" step="0.1" placeholder="7" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="rainfall"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Rainfall (mm)</FormLabel>
                              <FormControl>
                                <Input type="number" step="0.1" placeholder="0" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full shadow-lg hover:shadow-xl transition-all" size="lg">
                      <Sprout className="mr-2 h-5 w-5" />
                      Get Crop Recommendation
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Recommendation Output */}
            {recommendation && (
              <Card className="bg-gradient-to-br from-warning-light to-accent/10 border-warning/50 shadow-xl animate-scale-in">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <div className="p-2 bg-warning/20 rounded-lg">
                      <Sprout className="h-6 w-6 text-warning" />
                    </div>
                    Recommended Crop
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-card/50 rounded-xl border border-primary/20">
                    <div className="text-sm font-medium text-muted-foreground mb-1">Best Match</div>
                    <div className="text-4xl md:text-5xl font-bold text-primary">{recommendation.crop}</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-success/10 rounded-xl border border-success/20">
                    <span className="text-lg font-semibold text-foreground">Match Score</span>
                    <span className="text-3xl font-bold text-success">{recommendation.score}%</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - History */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 shadow-lg border-primary/20">
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 px-6 py-4 border-b border-primary/20">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                  Past Recommendations
                </CardTitle>
              </div>
              <CardContent className="pt-4">
                <ScrollArea className="h-[500px] pr-4">
                  {history.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                        <Sprout className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground font-medium">No history yet</p>
                      <p className="text-sm text-muted-foreground mt-1">Your recommendations will appear here</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {history.map((item, index) => (
                        <Card key={index} className="bg-gradient-to-br from-success-light to-primary/5 border-primary/30 hover:shadow-md transition-all">
                          <CardContent className="p-4 space-y-2">
                            <div className="flex justify-between items-start">
                              <span className="font-bold text-lg text-primary">{item.crop}</span>
                              <div className="px-2 py-1 bg-success/20 rounded-lg">
                                <span className="text-sm font-bold text-success">{item.score}%</span>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {item.timestamp.toLocaleString()}
                            </p>
                            <div className="text-xs text-muted-foreground pt-2 grid grid-cols-2 gap-2 border-t border-primary/10 pt-2">
                              <div className="flex items-center gap-1">
                                <span className="font-semibold">N:</span> {item.data.nitrogen}
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="font-semibold">P:</span> {item.data.phosphorus}
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="font-semibold">K:</span> {item.data.potassium}
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="font-semibold">pH:</span> {item.data.ph}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

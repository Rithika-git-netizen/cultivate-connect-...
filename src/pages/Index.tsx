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
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <Sprout className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold text-foreground">Cultivate Connect 🌱</h1>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Enter Soil & Weather Data</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Soil Nutrients */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">Soil Nutrients</h3>
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
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">Atmospheric Conditions</h3>
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

                    <Button type="submit" className="w-full" size="lg">
                      Get Crop Recommendation
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Recommendation Output */}
            {recommendation && (
              <Card className="bg-warning-light border-warning">
                <CardHeader>
                  <CardTitle className="text-2xl">Recommended Crop:</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-semibold">Crop:</span>
                    <span className="text-3xl font-bold text-primary">{recommendation.crop}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-semibold">Match Score:</span>
                    <span className="text-2xl font-bold text-success">{recommendation.score}%</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - History */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl">Your Past Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  {history.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No history yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {history.map((item, index) => (
                        <Card key={index} className="bg-success-light border-primary/20">
                          <CardContent className="p-4 space-y-1">
                            <div className="flex justify-between items-start">
                              <span className="font-bold text-primary">{item.crop}</span>
                              <span className="text-sm font-semibold text-success">{item.score}%</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {item.timestamp.toLocaleString()}
                            </p>
                            <div className="text-xs text-muted-foreground pt-2 grid grid-cols-2 gap-1">
                              <span>N: {item.data.nitrogen}</span>
                              <span>P: {item.data.phosphorus}</span>
                              <span>K: {item.data.potassium}</span>
                              <span>pH: {item.data.ph}</span>
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

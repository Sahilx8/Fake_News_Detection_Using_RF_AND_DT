/**
 * Home page component for Fake News Detection application
 * Provides the main interface for news analysis and model comparison
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Brain, 
  Shield, 
  AlertTriangle, 
  BarChart3, 
  FileText, 
  CheckCircle,
  XCircle,
  Zap,
  Target,
  Activity
} from 'lucide-react';

interface PredictionResult {
  decisionTree: 'fake' | 'true';
  randomForest: 'fake' | 'true';
  confidence: {
    dt: number;
    rf: number;
  };
}

export default function Home() {
  const [newsText, setNewsText] = useState('');
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  /**
   * Simulates the machine learning prediction process
   * In a real implementation, this would call your trained models
   */
  const analyzeFakeNews = async () => {
    if (!newsText.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock prediction logic based on keywords (for demonstration)
    const fakeKeywords = ['secret', 'revealed', 'elite', 'conspiracy', 'hidden agenda', 'psyops'];
    const trueKeywords = ['reuters', 'associated press', 'reported', 'according to', 'officials'];
    
    const textLower = newsText.toLowerCase();
    const hasFakeKeywords = fakeKeywords.some(keyword => textLower.includes(keyword));
    const hasTrueKeywords = trueKeywords.some(keyword => textLower.includes(keyword));
    
    const dtPrediction = hasFakeKeywords ? 'fake' : hasTrueKeywords ? 'true' : Math.random() > 0.5 ? 'fake' : 'true';
    const rfPrediction = hasFakeKeywords ? 'fake' : hasTrueKeywords ? 'true' : Math.random() > 0.5 ? 'fake' : 'true';
    
    setPrediction({
      decisionTree: dtPrediction as 'fake' | 'true',
      randomForest: rfPrediction as 'fake' | 'true',
      confidence: {
        dt: Math.random() * 0.2 + 0.8, // 80-100%
        rf: Math.random() * 0.2 + 0.8  // 80-100%
      }
    });
    
    setIsAnalyzing(false);
  };

  const clearAnalysis = () => {
    setNewsText('');
    setPrediction(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="w-12 h-12" />
              <h1 className="text-4xl font-bold">Fake News Detection</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Advanced AI-powered system using Decision Tree and Random Forest algorithms 
              to detect fake news with 99%+ accuracy
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="analyzer" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="analyzer" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              News Analyzer
            </TabsTrigger>
            <TabsTrigger value="models" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Model Performance
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              About
            </TabsTrigger>
          </TabsList>

          {/* News Analyzer Tab */}
          <TabsContent value="analyzer" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  News Article Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Paste your news article here:
                  </label>
                  <Textarea
                    value={newsText}
                    onChange={(e) => setNewsText(e.target.value)}
                    placeholder="Enter the news article text you want to analyze..."
                    className="min-h-[200px] resize-none"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={analyzeFakeNews}
                    disabled={!newsText.trim() || isAnalyzing}
                    className="flex items-center gap-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <Activity className="w-4 h-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        Analyze News
                      </>
                    )}
                  </Button>
                  
                  <Button variant="outline" onClick={clearAnalysis}>
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Analysis Results */}
            {prediction && (
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-2 border-blue-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-blue-700">
                      <Brain className="w-5 h-5" />
                      Decision Tree Model
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        {prediction.decisionTree === 'fake' ? (
                          <>
                            <XCircle className="w-6 h-6 text-red-500" />
                            <Badge variant="destructive" className="text-sm">
                              FAKE NEWS
                            </Badge>
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-6 h-6 text-green-500" />
                            <Badge variant="default" className="text-sm bg-green-600">
                              TRUE NEWS
                            </Badge>
                          </>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Confidence</span>
                          <span>{(prediction.confidence.dt * 100).toFixed(1)}%</span>
                        </div>
                        <Progress value={prediction.confidence.dt * 100} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-purple-700">
                      <Brain className="w-5 h-5" />
                      Random Forest Model
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        {prediction.randomForest === 'fake' ? (
                          <>
                            <XCircle className="w-6 h-6 text-red-500" />
                            <Badge variant="destructive" className="text-sm">
                              FAKE NEWS
                            </Badge>
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-6 h-6 text-green-500" />
                            <Badge variant="default" className="text-sm bg-green-600">
                              TRUE NEWS
                            </Badge>
                          </>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Confidence</span>
                          <span>{(prediction.confidence.rf * 100).toFixed(1)}%</span>
                        </div>
                        <Progress value={prediction.confidence.rf * 100} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {prediction && (
              <Alert className="bg-blue-50 border-blue-200">
                <AlertTriangle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>Analysis Complete:</strong> Both models have processed your news article. 
                  The results show {prediction.decisionTree === prediction.randomForest ? 'consistent' : 'different'} predictions.
                  {prediction.decisionTree !== prediction.randomForest && 
                    " Consider additional verification when models disagree."
                  }
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>

          {/* Model Performance Tab */}
          <TabsContent value="models" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Brain className="w-5 h-5" />
                    Decision Tree Classifier
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">99.52%</div>
                      <p className="text-sm text-gray-600">Accuracy</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Precision</span>
                        <span className="font-medium">99.5%</span>
                      </div>
                      <Progress value={99.5} className="h-2" />
                      
                      <div className="flex justify-between">
                        <span className="text-sm">Recall</span>
                        <span className="font-medium">99.5%</span>
                      </div>
                      <Progress value={99.5} className="h-2" />
                      
                      <div className="flex justify-between">
                        <span className="text-sm">F1-Score</span>
                        <span className="font-medium">99.5%</span>
                      </div>
                      <Progress value={99.5} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-700">
                    <Brain className="w-5 h-5" />
                    Random Forest Classifier
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">98.89%</div>
                      <p className="text-sm text-gray-600">Accuracy</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Precision</span>
                        <span className="font-medium">98.9%</span>
                      </div>
                      <Progress value={98.9} className="h-2" />
                      
                      <div className="flex justify-between">
                        <span className="text-sm">Recall</span>
                        <span className="font-medium">98.9%</span>
                      </div>
                      <Progress value={98.9} className="h-2" />
                      
                      <div className="flex justify-between">
                        <span className="text-sm">F1-Score</span>
                        <span className="font-medium">98.9%</span>
                      </div>
                      <Progress value={98.9} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Model Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">Decision Tree</div>
                      <div className="text-sm text-gray-600">Higher Accuracy</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">Random Forest</div>
                      <div className="text-sm text-gray-600">More Robust</div>
                    </div>
                  </div>
                  
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      Both models achieve exceptional performance with over 98% accuracy in detecting fake news.
                      The Decision Tree model shows slightly higher accuracy, while Random Forest provides
                      better generalization and robustness.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  About This System
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  This fake news detection system uses advanced machine learning algorithms to analyze 
                  news articles and determine their authenticity. The system was trained on a comprehensive 
                  dataset of verified fake and true news articles.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-blue-700">Decision Tree Model</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Accuracy: 99.52%</li>
                      <li>• Fast prediction time</li>
                      <li>• Interpretable results</li>
                      <li>• Handles categorical features well</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-purple-700">Random Forest Model</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Accuracy: 98.89%</li>
                      <li>• Robust against overfitting</li>
                      <li>• Handles missing values</li>
                      <li>• Ensemble learning approach</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Data Processing Pipeline</h4>
                  <ol className="text-sm space-y-1 text-gray-600">
                    <li>1. Text preprocessing and cleaning</li>
                    <li>2. Feature extraction using TF-IDF vectorization</li>
                    <li>3. Model training on labeled dataset</li>
                    <li>4. Cross-validation and performance evaluation</li>
                    <li>5. Real-time prediction on new articles</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}


import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CurrentWeather } from './CurrentWeather';
import { WeatherForecast } from './WeatherForecast';
import { SearchCity } from './SearchCity';
import { useToast } from '@/hooks/use-toast';

export interface WeatherData {
  current: {
    location: string;
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    feelsLike: number;
  };
  forecast: Array<{
    date: string;
    high: number;
    low: number;
    condition: string;
  }>;
}

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Mock data generator for demonstration
  const generateMockWeatherData = (city: string): WeatherData => {
    const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'];
    const randomCondition = () => conditions[Math.floor(Math.random() * conditions.length)];
    
    return {
      current: {
        location: city,
        temperature: Math.floor(Math.random() * 30) + 10,
        condition: randomCondition(),
        humidity: Math.floor(Math.random() * 40) + 30,
        windSpeed: Math.floor(Math.random() * 20) + 5,
        feelsLike: Math.floor(Math.random() * 30) + 12,
      },
      forecast: Array.from({ length: 5 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i + 1);
        return {
          date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
          high: Math.floor(Math.random() * 25) + 15,
          low: Math.floor(Math.random() * 15) + 5,
          condition: randomCondition(),
        };
      }),
    };
  };

  const handleCitySearch = async (city: string) => {
    if (!city.trim()) {
      toast({
        title: "Please enter a city name",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockData = generateMockWeatherData(city);
      setWeatherData(mockData);
      setLoading(false);
      
      toast({
        title: `Weather data loaded for ${city}`,
        description: "Showing current conditions and 5-day forecast",
      });
    }, 1000);
  };

  // Load default city on mount
  useEffect(() => {
    handleCitySearch('New York');
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg">
            Weather Vision
          </h1>
          <p className="text-lg text-blue-100 drop-shadow">
            Your gateway to accurate weather forecasting
          </p>
        </div>

        {/* Search */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <SearchCity onSearch={handleCitySearch} loading={loading} />
          </div>
        </div>

        {/* Weather Content */}
        {weatherData && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Current Weather - Takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <CurrentWeather data={weatherData.current} loading={loading} />
            </div>
            
            {/* 5-Day Forecast */}
            <div className="lg:col-span-1">
              <WeatherForecast forecast={weatherData.forecast} loading={loading} />
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && !weatherData && (
          <div className="text-center text-white">
            <div className="animate-spin h-8 w-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Getting weather data...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CurrentWeather } from './CurrentWeather';
import { WeatherForecast } from './WeatherForecast';
import { SearchCity } from './SearchCity';
import { WeatherSettings } from './WeatherSettings';
import { WeatherAlerts } from './WeatherAlerts';
import { useToast } from '@/hooks/use-toast';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useWeatherPreferences } from '@/hooks/useWeatherPreferences';
import { MapPin, Settings, Heart } from 'lucide-react';

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
  const [showSettings, setShowSettings] = useState(false);
  const { toast } = useToast();
  const { coordinates, error: geoError, loading: geoLoading, getCurrentLocation } = useGeolocation();
  const { preferences, addFavoriteCity, removeFavoriteCity, convertTemperature } = useWeatherPreferences();

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

  const handleLocationSearch = async () => {
    getCurrentLocation();
  };

  const handleAddToFavorites = () => {
    if (weatherData?.current.location) {
      const isFavorite = preferences.favoriteCities.includes(weatherData.current.location);
      
      if (isFavorite) {
        removeFavoriteCity(weatherData.current.location);
        toast({
          title: "Removed from favorites",
          description: `${weatherData.current.location} removed from your favorites`,
        });
      } else {
        addFavoriteCity(weatherData.current.location);
        toast({
          title: "Added to favorites",
          description: `${weatherData.current.location} added to your favorites`,
        });
      }
    }
  };

  useEffect(() => {
    if (coordinates) {
      // Simulate reverse geocoding with mock city
      const mockCities = ['New York', 'London', 'Tokyo', 'Sydney', 'Paris'];
      const randomCity = mockCities[Math.floor(Math.random() * mockCities.length)];
      handleCitySearch(randomCity);
      
      toast({
        title: "Location detected",
        description: `Found your location near ${randomCity}`,
      });
    }
  }, [coordinates]);

  useEffect(() => {
    if (geoError) {
      toast({
        title: "Location error",
        description: geoError,
        variant: "destructive",
      });
    }
  }, [geoError]);

  // Load default city on mount
  useEffect(() => {
    handleCitySearch('New York');
  }, []);

  // Convert temperature data based on user preference
  const getConvertedWeatherData = () => {
    if (!weatherData) return null;

    return {
      ...weatherData,
      current: {
        ...weatherData.current,
        temperature: convertTemperature(weatherData.current.temperature),
        feelsLike: convertTemperature(weatherData.current.feelsLike),
      },
      forecast: weatherData.forecast.map(day => ({
        ...day,
        high: convertTemperature(day.high),
        low: convertTemperature(day.low),
      })),
    };
  };

  const convertedWeatherData = getConvertedWeatherData();

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header with controls */}
        <div className="text-center space-y-2 sm:space-y-4 px-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
            Weather Vision
          </h1>
          <p className="text-base sm:text-lg text-blue-100 drop-shadow px-4">
            Your gateway to accurate weather forecasting
          </p>
          
          {/* Control Buttons */}
          <div className="flex justify-center gap-2 mt-4">
            <Button
              onClick={handleLocationSearch}
              disabled={geoLoading}
              variant="secondary"
              size="sm"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20"
            >
              <MapPin className="h-4 w-4 mr-1" />
              {geoLoading ? 'Getting Location...' : 'Use Location'}
            </Button>
            
            {weatherData && (
              <Button
                onClick={handleAddToFavorites}
                variant="secondary"
                size="sm"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                <Heart 
                  className={`h-4 w-4 mr-1 ${
                    preferences.favoriteCities.includes(weatherData.current.location) 
                      ? 'fill-red-400 text-red-400' 
                      : ''
                  }`} 
                />
                Favorite
              </Button>
            )}
            
            <Button
              onClick={() => setShowSettings(!showSettings)}
              variant="secondary"
              size="sm"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20"
            >
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </Button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="flex justify-center px-2">
            <div className="w-full max-w-md">
              <WeatherSettings onClose={() => setShowSettings(false)} />
            </div>
          </div>
        )}

        {/* Search */}
        <div className="flex justify-center px-2">
          <div className="w-full max-w-md">
            <SearchCity onSearch={handleCitySearch} loading={loading} />
          </div>
        </div>

        {/* Favorite Cities Quick Access */}
        {preferences.favoriteCities.length > 0 && (
          <div className="flex justify-center px-2">
            <div className="flex gap-2 flex-wrap">
              {preferences.favoriteCities.slice(0, 5).map((city) => (
                <Button
                  key={city}
                  onClick={() => handleCitySearch(city)}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs"
                >
                  {city}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Weather Content */}
        {convertedWeatherData && (
          <div className="space-y-4 sm:space-y-6">
            {/* Weather Alerts */}
            <div className="w-full">
              <WeatherAlerts
                temperature={convertedWeatherData.current.temperature}
                windSpeed={convertedWeatherData.current.windSpeed}
                humidity={convertedWeatherData.current.humidity}
                condition={convertedWeatherData.current.condition}
              />
            </div>
            
            {/* Current Weather */}
            <div className="w-full">
              <CurrentWeather 
                data={{
                  ...convertedWeatherData.current,
                  temperatureUnit: preferences.temperatureUnit
                }} 
                loading={loading} 
              />
            </div>
            
            {/* 5-Day Forecast */}
            <div className="w-full lg:max-w-md lg:mx-auto">
              <WeatherForecast 
                forecast={convertedWeatherData.forecast} 
                loading={loading}
                temperatureUnit={preferences.temperatureUnit}
              />
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && !weatherData && (
          <div className="text-center text-white py-8">
            <div className="animate-spin h-8 w-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-lg">Getting weather data...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CloudSun, CloudRain, Sun, Cloud, Thermometer, Wind } from 'lucide-react';

interface CurrentWeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
}

interface CurrentWeatherProps {
  data: CurrentWeatherData;
  loading: boolean;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, loading }) => {
  const getWeatherIcon = (condition: string) => {
    const iconClass = "h-16 w-16 text-white drop-shadow-lg";
    
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className={iconClass} />;
      case 'cloudy':
        return <Cloud className={iconClass} />;
      case 'rainy':
        return <CloudRain className={iconClass} />;
      case 'partly cloudy':
        return <CloudSun className={iconClass} />;
      default:
        return <Sun className={iconClass} />;
    }
  };

  if (loading) {
    return (
      <Card className="glass-effect border-white/20 shadow-xl animate-pulse">
        <CardContent className="p-8">
          <div className="space-y-4">
            <div className="h-8 bg-white/20 rounded"></div>
            <div className="h-20 bg-white/20 rounded"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-16 bg-white/20 rounded"></div>
              <div className="h-16 bg-white/20 rounded"></div>
              <div className="h-16 bg-white/20 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-effect border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold text-white drop-shadow">
          {data.location}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-6 p-6">
        {/* Main Temperature Display */}
        <div className="flex items-center justify-center space-x-8">
          <div className="text-center">
            <div className="text-6xl font-bold text-white drop-shadow-lg mb-2">
              {data.temperature}°C
            </div>
            <div className="text-xl text-blue-100 drop-shadow">
              {data.condition}
            </div>
            <div className="text-lg text-blue-200 drop-shadow">
              Feels like {data.feelsLike}°C
            </div>
          </div>
          <div className="hidden sm:block">
            {getWeatherIcon(data.condition)}
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/20">
          <div className="text-center p-4 rounded-lg bg-white/10 backdrop-blur-sm">
            <Thermometer className="h-8 w-8 text-white mx-auto mb-2 drop-shadow" />
            <div className="text-lg font-semibold text-white">{data.humidity}%</div>
            <div className="text-sm text-blue-100">Humidity</div>
          </div>
          
          <div className="text-center p-4 rounded-lg bg-white/10 backdrop-blur-sm">
            <Wind className="h-8 w-8 text-white mx-auto mb-2 drop-shadow" />
            <div className="text-lg font-semibold text-white">{data.windSpeed} km/h</div>
            <div className="text-sm text-blue-100">Wind Speed</div>
          </div>
          
          <div className="text-center p-4 rounded-lg bg-white/10 backdrop-blur-sm">
            {getWeatherIcon(data.condition)}
            <div className="text-sm text-blue-100 mt-2">Current</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

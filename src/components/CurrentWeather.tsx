
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CloudSun, CloudRain, Sun, Cloud, Thermometer, Wind, Droplets } from 'lucide-react';

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
    const iconClass = "h-12 w-12 sm:h-16 sm:w-16 text-white drop-shadow-lg";
    
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
        <CardContent className="p-4 sm:p-6 lg:p-8">
          <div className="space-y-4">
            <div className="h-6 sm:h-8 bg-white/20 rounded"></div>
            <div className="h-16 sm:h-20 bg-white/20 rounded"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="h-12 sm:h-16 bg-white/20 rounded"></div>
              <div className="h-12 sm:h-16 bg-white/20 rounded"></div>
              <div className="h-12 sm:h-16 bg-white/20 rounded col-span-2 sm:col-span-1"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-effect border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader className="text-center pb-2 px-4 sm:px-6">
        <CardTitle className="text-xl sm:text-2xl font-bold text-white drop-shadow truncate">
          {data.location}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4 sm:space-y-6 p-4 sm:p-6">
        {/* Main Temperature Display - Responsive layout */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
          <div className="text-center order-2 sm:order-1">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg mb-2">
              {data.temperature}°C
            </div>
            <div className="text-lg sm:text-xl text-blue-100 drop-shadow">
              {data.condition}
            </div>
            <div className="text-base sm:text-lg text-blue-200 drop-shadow mt-1">
              Feels like {data.feelsLike}°C
            </div>
          </div>
          <div className="order-1 sm:order-2">
            {getWeatherIcon(data.condition)}
          </div>
        </div>

        {/* Weather Details - Responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-white/20">
          <div className="text-center p-3 sm:p-4 rounded-lg bg-white/10 backdrop-blur-sm touch-manipulation">
            <Droplets className="h-6 w-6 sm:h-8 sm:w-8 text-white mx-auto mb-2 drop-shadow" />
            <div className="text-base sm:text-lg font-semibold text-white">{data.humidity}%</div>
            <div className="text-xs sm:text-sm text-blue-100">Humidity</div>
          </div>
          
          <div className="text-center p-3 sm:p-4 rounded-lg bg-white/10 backdrop-blur-sm touch-manipulation">
            <Wind className="h-6 w-6 sm:h-8 sm:w-8 text-white mx-auto mb-2 drop-shadow" />
            <div className="text-base sm:text-lg font-semibold text-white">{data.windSpeed} km/h</div>
            <div className="text-xs sm:text-sm text-blue-100">Wind Speed</div>
          </div>
          
          <div className="text-center p-3 sm:p-4 rounded-lg bg-white/10 backdrop-blur-sm touch-manipulation col-span-2 sm:col-span-1">
            <Thermometer className="h-6 w-6 sm:h-8 sm:w-8 text-white mx-auto mb-2 drop-shadow" />
            <div className="text-base sm:text-lg font-semibold text-white">{data.feelsLike}°C</div>
            <div className="text-xs sm:text-sm text-blue-100">Feels Like</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

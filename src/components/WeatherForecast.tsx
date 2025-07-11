
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CloudSun, CloudRain, Sun, Cloud } from 'lucide-react';

interface ForecastDay {
  date: string;
  high: number;
  low: number;
  condition: string;
}

interface WeatherForecastProps {
  forecast: ForecastDay[];
  loading: boolean;
  temperatureUnit?: 'celsius' | 'fahrenheit';
}

export const WeatherForecast: React.FC<WeatherForecastProps> = ({ 
  forecast, 
  loading, 
  temperatureUnit = 'celsius' 
}) => {
  const getWeatherIcon = (condition: string) => {
    const iconClass = "h-6 w-6 sm:h-8 sm:w-8 text-white drop-shadow";
    
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

  const getTemperatureUnit = () => {
    return temperatureUnit === 'fahrenheit' ? '°F' : '°C';
  };

  if (loading) {
    return (
      <Card className="glass-effect border-white/20 shadow-xl animate-pulse">
        <CardHeader className="pb-2">
          <div className="h-6 bg-white/20 rounded"></div>
        </CardHeader>
        <CardContent className="space-y-3 p-4 sm:p-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 sm:h-16 bg-white/20 rounded"></div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-effect border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 h-fit">
      <CardHeader className="pb-2 px-4 sm:px-6">
        <CardTitle className="text-lg sm:text-xl font-bold text-white drop-shadow text-center">
          5-Day Forecast
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 sm:space-y-3 p-4 sm:p-6">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-200 touch-manipulation"
          >
            <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
              {getWeatherIcon(day.condition)}
              <div className="min-w-0 flex-1">
                <div className="font-medium text-white drop-shadow text-sm sm:text-base truncate">
                  {day.date}
                </div>
                <div className="text-xs sm:text-sm text-blue-100 truncate">
                  {day.condition}
                </div>
              </div>
            </div>
            
            <div className="text-right ml-2 flex-shrink-0">
              <div className="font-bold text-white drop-shadow text-sm sm:text-base">
                {day.high}{getTemperatureUnit()}
              </div>
              <div className="text-xs sm:text-sm text-blue-200">
                {day.low}{getTemperatureUnit()}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

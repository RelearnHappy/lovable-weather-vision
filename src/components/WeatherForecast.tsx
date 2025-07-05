
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
}

export const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast, loading }) => {
  const getWeatherIcon = (condition: string) => {
    const iconClass = "h-8 w-8 text-white drop-shadow";
    
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
        <CardHeader>
          <div className="h-6 bg-white/20 rounded"></div>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 bg-white/20 rounded"></div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-effect border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 h-fit">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white drop-shadow text-center">
          5-Day Forecast
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 p-6">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              {getWeatherIcon(day.condition)}
              <div>
                <div className="font-medium text-white drop-shadow">{day.date}</div>
                <div className="text-sm text-blue-100">{day.condition}</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="font-bold text-white drop-shadow">
                {day.high}°
              </div>
              <div className="text-sm text-blue-200">
                {day.low}°
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Settings, Sun, Moon, Thermometer, MapPin } from 'lucide-react';
import { useWeatherPreferences, TemperatureUnit } from '@/hooks/useWeatherPreferences';

interface WeatherSettingsProps {
  onClose: () => void;
}

export const WeatherSettings: React.FC<WeatherSettingsProps> = ({ onClose }) => {
  const { 
    preferences, 
    updateTemperatureUnit, 
    toggleTheme, 
    removeFavoriteCity 
  } = useWeatherPreferences();

  return (
    <Card className="glass-effect border-white/20 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold text-white drop-shadow flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Weather Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Theme Toggle */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            {preferences.theme === 'light' ? (
              <Sun className="h-5 w-5 text-white" />
            ) : (
              <Moon className="h-5 w-5 text-white" />
            )}
            <span className="text-white font-medium">Dark Mode</span>
          </div>
          <Switch
            checked={preferences.theme === 'dark'}
            onCheckedChange={toggleTheme}
          />
        </div>

        {/* Temperature Unit */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-white font-medium">
            <Thermometer className="h-5 w-5" />
            <span>Temperature Unit</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant={preferences.temperatureUnit === 'celsius' ? 'default' : 'secondary'}
              size="sm"
              onClick={() => updateTemperatureUnit('celsius' as TemperatureUnit)}
              className="flex-1"
            >
              °C
            </Button>
            <Button
              variant={preferences.temperatureUnit === 'fahrenheit' ? 'default' : 'secondary'}
              size="sm"
              onClick={() => updateTemperatureUnit('fahrenheit' as TemperatureUnit)}
              className="flex-1"
            >
              °F
            </Button>
          </div>
        </div>

        {/* Favorite Cities */}
        {preferences.favoriteCities.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-medium">
              <MapPin className="h-5 w-5" />
              <span>Favorite Cities</span>
            </div>
            <div className="space-y-2">
              {preferences.favoriteCities.map((city) => (
                <div
                  key={city}
                  className="flex items-center justify-between p-2 rounded bg-white/10 backdrop-blur-sm"
                >
                  <span className="text-white text-sm">{city}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFavoriteCity(city)}
                    className="text-red-300 hover:text-red-100 h-6 w-6 p-0"
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button onClick={onClose} className="w-full">
          Close Settings
        </Button>
      </CardContent>
    </Card>
  );
};

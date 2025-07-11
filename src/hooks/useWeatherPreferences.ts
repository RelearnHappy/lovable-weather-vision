
import { useState, useEffect } from 'react';

export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type Theme = 'light' | 'dark';

interface WeatherPreferences {
  temperatureUnit: TemperatureUnit;
  theme: Theme;
  favoriteCities: string[];
}

const defaultPreferences: WeatherPreferences = {
  temperatureUnit: 'celsius',
  theme: 'light',
  favoriteCities: [],
};

export const useWeatherPreferences = () => {
  const [preferences, setPreferences] = useState<WeatherPreferences>(defaultPreferences);

  useEffect(() => {
    const savedPreferences = localStorage.getItem('weatherPreferences');
    if (savedPreferences) {
      try {
        setPreferences(JSON.parse(savedPreferences));
      } catch (error) {
        console.error('Error loading preferences:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('weatherPreferences', JSON.stringify(preferences));
    
    // Apply theme to document
    if (preferences.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [preferences]);

  const updateTemperatureUnit = (unit: TemperatureUnit) => {
    setPreferences(prev => ({ ...prev, temperatureUnit: unit }));
  };

  const toggleTheme = () => {
    setPreferences(prev => ({ 
      ...prev, 
      theme: prev.theme === 'light' ? 'dark' : 'light' 
    }));
  };

  const addFavoriteCity = (city: string) => {
    setPreferences(prev => ({
      ...prev,
      favoriteCities: [...prev.favoriteCities.filter(c => c !== city), city],
    }));
  };

  const removeFavoriteCity = (city: string) => {
    setPreferences(prev => ({
      ...prev,
      favoriteCities: prev.favoriteCities.filter(c => c !== city),
    }));
  };

  const convertTemperature = (temp: number, fromUnit: TemperatureUnit = 'celsius'): number => {
    if (preferences.temperatureUnit === fromUnit) return temp;
    
    if (fromUnit === 'celsius' && preferences.temperatureUnit === 'fahrenheit') {
      return Math.round((temp * 9/5) + 32);
    } else if (fromUnit === 'fahrenheit' && preferences.temperatureUnit === 'celsius') {
      return Math.round((temp - 32) * 5/9);
    }
    
    return temp;
  };

  return {
    preferences,
    updateTemperatureUnit,
    toggleTheme,
    addFavoriteCity,
    removeFavoriteCity,
    convertTemperature,
  };
};


import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface SearchCityProps {
  onSearch: (city: string) => void;
  loading: boolean;
}

export const SearchCity: React.FC<SearchCityProps> = ({ onSearch, loading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(city);
  };

  return (
    <Card className="glass-effect border-white/20 shadow-lg">
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="bg-white/90 border-white/30 text-gray-800 placeholder:text-gray-500 focus:bg-white focus:border-blue-300"
            disabled={loading}
          />
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 shadow-lg transition-all duration-200"
          >
            {loading ? (
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
            ) : (
              'Search'
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
};

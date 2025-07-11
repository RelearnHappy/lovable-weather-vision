
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search } from 'lucide-react';

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
      <form onSubmit={handleSubmit} className="p-3 sm:p-4">
        <div className="flex gap-2 sm:gap-3">
          <Input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="bg-white/90 border-white/30 text-gray-800 placeholder:text-gray-500 focus:bg-white focus:border-blue-300 h-11 sm:h-10 text-base sm:text-sm"
            disabled={loading}
          />
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 sm:px-6 shadow-lg transition-all duration-200 h-11 sm:h-10 min-w-[80px] sm:min-w-[100px]"
          >
            {loading ? (
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
            ) : (
              <>
                <Search className="h-4 w-4 sm:hidden" />
                <span className="hidden sm:inline">Search</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
};

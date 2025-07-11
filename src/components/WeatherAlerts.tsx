
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Droplets, Wind, Thermometer } from 'lucide-react';

interface WeatherAlert {
  id: string;
  type: 'temperature' | 'wind' | 'humidity' | 'general';
  message: string;
  severity: 'low' | 'medium' | 'high';
}

interface WeatherAlertsProps {
  temperature: number;
  windSpeed: number;
  humidity: number;
  condition: string;
}

export const WeatherAlerts: React.FC<WeatherAlertsProps> = ({
  temperature,
  windSpeed,
  humidity,
  condition,
}) => {
  const generateAlerts = (): WeatherAlert[] => {
    const alerts: WeatherAlert[] = [];

    // Temperature alerts
    if (temperature > 35) {
      alerts.push({
        id: 'temp-high',
        type: 'temperature',
        message: 'Extremely hot weather! Stay hydrated and avoid prolonged sun exposure.',
        severity: 'high',
      });
    } else if (temperature < 0) {
      alerts.push({
        id: 'temp-low',
        type: 'temperature',
        message: 'Freezing temperature! Dress warmly and be careful on roads.',
        severity: 'high',
      });
    }

    // Wind alerts
    if (windSpeed > 25) {
      alerts.push({
        id: 'wind-high',
        type: 'wind',
        message: 'Strong winds expected. Secure loose objects and drive carefully.',
        severity: 'medium',
      });
    }

    // Humidity alerts
    if (humidity > 80) {
      alerts.push({
        id: 'humidity-high',
        type: 'humidity',
        message: 'High humidity levels. Stay cool and drink plenty of water.',
        severity: 'low',
      });
    }

    // Condition-based alerts
    if (condition.toLowerCase().includes('rain')) {
      alerts.push({
        id: 'rain-alert',
        type: 'general',
        message: 'Rain expected. Carry an umbrella and drive safely.',
        severity: 'medium',
      });
    }

    return alerts;
  };

  const alerts = generateAlerts();
  
  if (alerts.length === 0) return null;

  const getAlertIcon = (type: WeatherAlert['type']) => {
    const iconClass = "h-4 w-4";
    switch (type) {
      case 'temperature':
        return <Thermometer className={iconClass} />;
      case 'wind':
        return <Wind className={iconClass} />;
      case 'humidity':
        return <Droplets className={iconClass} />;
      default:
        return <AlertTriangle className={iconClass} />;
    }
  };

  const getSeverityColor = (severity: WeatherAlert['severity']) => {
    switch (severity) {
      case 'high':
        return 'bg-red-500/20 border-red-400/30 text-red-100';
      case 'medium':
        return 'bg-yellow-500/20 border-yellow-400/30 text-yellow-100';
      case 'low':
        return 'bg-blue-500/20 border-blue-400/30 text-blue-100';
    }
  };

  return (
    <Card className="glass-effect border-white/20 shadow-xl">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-2 text-orange-200 font-medium">
          <AlertTriangle className="h-5 w-5" />
          <span>Weather Alerts</span>
        </div>
        
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`flex items-start gap-3 p-3 rounded-lg border ${getSeverityColor(alert.severity)}`}
          >
            {getAlertIcon(alert.type)}
            <p className="text-sm leading-relaxed">{alert.message}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

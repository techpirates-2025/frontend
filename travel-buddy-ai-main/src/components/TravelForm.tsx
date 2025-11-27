import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  MapPin, 
  Globe, 
  Briefcase, 
  GraduationCap, 
  ArrowRight, 
  Plane,
  Users,
  Heart,
  Building
} from 'lucide-react';
import type { TravelType, TravelFormData } from '@/types/travel';
import { countries } from '@/types/travel';

interface TravelFormProps {
  onSubmit: (data: TravelFormData) => void;
}

const travelTypes: { type: TravelType; icon: React.ReactNode; label: string }[] = [
  { type: 'Tourism', icon: <Globe className="w-5 h-5" />, label: 'Tourism' },
  { type: 'Business', icon: <Briefcase className="w-5 h-5" />, label: 'Business' },
  { type: 'Student', icon: <GraduationCap className="w-5 h-5" />, label: 'Student' },
  { type: 'Transit', icon: <Plane className="w-5 h-5" />, label: 'Transit' },
  { type: 'Work', icon: <Building className="w-5 h-5" />, label: 'Work' },
  { type: 'Medical', icon: <Heart className="w-5 h-5" />, label: 'Medical' },
];

export const TravelForm: React.FC<TravelFormProps> = ({ onSubmit }) => {
  const [fromCountry, setFromCountry] = useState('');
  const [toCountry, setToCountry] = useState('');
  const [nationality, setNationality] = useState('');
  const [travelType, setTravelType] = useState<TravelType>('Tourism');
  const [errors, setErrors] = useState<{ fromCountry?: string; toCountry?: string; nationality?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    
    if (!fromCountry) newErrors.fromCountry = 'Please select origin country';
    if (!toCountry) newErrors.toCountry = 'Please select destination country';
    if (!nationality) newErrors.nationality = 'Please select your nationality';
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit({ fromCountry, toCountry, nationality, travelType });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-header text-primary-foreground">
        <div className="max-w-lg mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Travel Visa Advisor</h1>
              <p className="text-sm text-primary-foreground/80">Document & Visa Requirements</p>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-lg mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-1">Plan Your Trip</h2>
          <p className="text-muted-foreground text-sm">Enter your travel details to get visa guidance</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nationality */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Users className="w-4 h-4 text-primary" />
              Your Nationality
            </Label>
            <div className="relative">
              <select
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                className={`select-field w-full pr-10 ${errors.nationality ? 'border-destructive' : ''}`}
              >
                <option value="">Select your nationality</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.nationality && (
              <p className="text-sm text-destructive">{errors.nationality}</p>
            )}
          </div>

          {/* From Country */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              Origin Country
            </Label>
            <div className="relative">
              <select
                value={fromCountry}
                onChange={(e) => setFromCountry(e.target.value)}
                className={`select-field w-full pr-10 ${errors.fromCountry ? 'border-destructive' : ''}`}
              >
                <option value="">Select origin country</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.fromCountry && (
              <p className="text-sm text-destructive">{errors.fromCountry}</p>
            )}
          </div>

          {/* To Country */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <MapPin className="w-4 h-4 text-accent" />
              Destination Country
            </Label>
            <div className="relative">
              <select
                value={toCountry}
                onChange={(e) => setToCountry(e.target.value)}
                className={`select-field w-full pr-10 ${errors.toCountry ? 'border-destructive' : ''}`}
              >
                <option value="">Select destination country</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.toCountry && (
              <p className="text-sm text-destructive">{errors.toCountry}</p>
            )}
          </div>

          {/* Travel Type */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">Travel Purpose</Label>
            <div className="grid grid-cols-3 gap-2">
              {travelTypes.map(({ type, icon, label }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setTravelType(type)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 ${
                    travelType === type
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {icon}
                  <span className="text-xs font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full h-12 text-base font-medium gradient-primary hover:opacity-90 transition-opacity">
            Get Visa Information
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6">
          AI-powered guidance for visa requirements and travel documents
        </p>
      </main>
    </div>
  );
};

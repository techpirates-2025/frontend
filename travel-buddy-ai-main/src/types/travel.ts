export type TravelType = 'Tourism' | 'Business' | 'Student' | 'Transit' | 'Medical' | 'Work';

export interface TravelFormData {
  fromCountry: string;
  toCountry: string;
  nationality: string;
  travelType: TravelType;
}

export interface ChatMessage {
  id: string;
  from: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export const countries = [
  'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria',
  'Bangladesh', 'Belgium', 'Brazil', 'Canada', 'Chile', 'China', 'Colombia',
  'Czech Republic', 'Denmark', 'Egypt', 'Ethiopia', 'Finland', 'France',
  'Germany', 'Ghana', 'Greece', 'Hungary', 'India', 'Indonesia', 'Iran',
  'Iraq', 'Ireland', 'Israel', 'Italy', 'Japan', 'Jordan', 'Kenya',
  'Malaysia', 'Mexico', 'Morocco', 'Nepal', 'Netherlands', 'New Zealand',
  'Nigeria', 'Norway', 'Pakistan', 'Peru', 'Philippines', 'Poland', 'Portugal',
  'Qatar', 'Romania', 'Russia', 'Saudi Arabia', 'Singapore', 'South Africa',
  'South Korea', 'Spain', 'Sri Lanka', 'Sweden', 'Switzerland', 'Taiwan',
  'Thailand', 'Turkey', 'UAE', 'UK', 'Ukraine', 'USA', 'Vietnam'
];

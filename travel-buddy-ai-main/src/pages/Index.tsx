import React, { useState } from 'react';
import { TravelForm } from '@/components/TravelForm';
import { ChatInterface } from '@/components/ChatInterface';
import type { TravelFormData } from '@/types/travel';

const Index: React.FC = () => {
  const [travelData, setTravelData] = useState<TravelFormData | null>(null);

  const handleFormSubmit = (data: TravelFormData) => {
    setTravelData(data);
  };

  const handleBack = () => {
    setTravelData(null);
  };

  if (travelData) {
    return <ChatInterface travelData={travelData} onBack={handleBack} />;
  }

  return <TravelForm onSubmit={handleFormSubmit} />;
};

export default Index;

import React from 'react';
import { TRAINING_CENTRES_28 } from '@/data/trainingCentres28';
import CentreDetailClient from './CentreDetailClient';

export function generateStaticParams() {
  return TRAINING_CENTRES_28.map((centre) => ({
    id: centre.id,
  }));
}

export default function CentreDetailPage({ params }: { params: { id: string } }) {
  return <CentreDetailClient id={params.id} />;
}


import dynamic from 'next/dynamic';

const MapWithMarkers = dynamic(
  () => import('./MapWithMarkers'),
  {
    ssr: false,
  }
);

export default MapWithMarkers;
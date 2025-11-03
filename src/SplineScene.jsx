import { Suspense, lazy, useState } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

export function SplineScene({ scene, className }) {
  const [error, setError] = useState(false);

  const handleLoad = () => {
    console.log('Spline scene loaded successfully');
  };

  const handleError = (err) => {
    console.error('Spline loading error:', err);
    setError(true);
  };

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-2xl">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🤖</div>
          <p className="text-gray-400 text-lg">3D Visualization</p>
          <p className="text-gray-500 text-sm mt-2">Interactive scene loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-gray-900/30">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400 text-sm">Loading 3D Scene...</p>
          </div>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
        onLoad={handleLoad}
        onError={handleError}
      />
    </Suspense>
  );
}

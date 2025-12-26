import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import './src/i18n';

// Lazy load page components for code splitting
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const Insights = lazy(() => import('./pages/Insights'));
const Tariffs = lazy(() => import('./pages/Tariffs'));
const Contact = lazy(() => import('./pages/Contact'));

// Loading component for Suspense fallback
const PageLoader = () => (
 <div className="flex items-center justify-center min-h-screen">
   <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
 </div>
);

function App() {
 return (
   <HelmetProvider>
     <Router>
       <Suspense fallback={<PageLoader />}>
         <Routes>
           <Route path="/" element={<Layout />}>
             <Route index element={<Home />} />
             <Route path="services" element={<Services />} />
             <Route path="about" element={<About />} />
             <Route path="insights" element={<Insights />} />
             <Route path="tariffs" element={<Tariffs />} />
             <Route path="contacts" element={<Contact />} />
           </Route>
         </Routes>
       </Suspense>
     </Router>
   </HelmetProvider>
 );
}

export default App;

"use client";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import Image from "next/image";
import { memo, useMemo, useState, useEffect, useRef } from "react";
const locations = [
  {
    name: "Singapore",
    flag: "/flags/singapore.png",
    cpu: "AMD Ryzen 9 5950X",
    cpuLogo: "/cpu/ryzen9.png",
    lat: -20.3521,
    lng: 103.8198,
  },
  {
    name: "United States",
    flag: "/flags/usa.png",
    cpu: "AMD EPYC 7763",
    cpuLogo: "/cpu/ryzen7.png",
    lat: 30.7128,
    lng: -142.0060,
  },
  {
    name: "Germany ",
    flag: "/flags/germany.png",
    cpu: "AMD Ryzen Threadripper PRO",
    cpuLogo: "/cpu/ryzen9.png",
    lat: 59.1109,
    lng: -8.6821,
  }
];


const LocationItem = memo(({ location, index }: { location: typeof locations[0], index: number }) => (
  <motion.div
    className="flex items-center gap-2 sm:gap-4"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <Image
      src={location.flag}
      alt={`${location.name} flag`}
      width={32}
      height={32}
      className="w-auto h-8"
      loading="lazy"
    />
    <div className="min-w-0">
      <p className="text-sm sm:text-lg text-gray-900 dark:text-white font-medium truncate">
        {location.name}
      </p>
      <div className="flex items-center gap-1.5">
        <Image
          src={location.cpuLogo}
          alt={`${location.cpu} logo`}
          width={16}
          height={16}
          className="w-3 h-3 sm:w-4 sm:h-4 object-contain flex-shrink-0"
          loading="lazy"
        />
        <p className="orbitron-font text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
          {location.cpu}
        </p>
      </div>
    </div>
  </motion.div>
));

LocationItem.displayName = 'LocationItem';


const latLngToSVG = (lat: number, lng: number) => {

  const svgWidth = 1000;
  const svgHeight = 500;


  const x = ((lng + 180) / 360) * svgWidth * 0.98 + 10;
  const y = ((90 - lat) / 180) * svgHeight * 0.85 + 40;

  return { x, y };
};


const Tooltip = memo(({ location, x, y, visible }: {
  location: typeof locations[0],
  x: number,
  y: number,
  visible: boolean
}) => {
  if (!visible) return null;


  const tooltipX = x - 100; 
  const tooltipY = y - 90; 

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      className="absolute pointer-events-none z-50"
      style={{
        left: `${(tooltipX / 1000) * 100}%`,
        top: `${(tooltipY / 500) * 100}%`,
        transform: 'translateX(-50%)', 
      }}
    >
      <div className="backdrop-blur-sm rounded-lg  p-3 min-w-[200px]">
        <div className="flex items-center gap-2 mb-2">
          <Image
            src={location.flag}
            alt={`${location.name} flag`}
            width={20}
            height={20}
            className="w-5 h-5 object-cover rounded-full"
          />
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
            {location.name}
          </h3>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-300">
          {location.cpu}
        </p>
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white/90 dark:bg-white/5 border-r border-b border-gray-200/50 dark:border-white/10 rotate-45"></div>
      </div>
    </motion.div>
  );
});

Tooltip.displayName = 'Tooltip';


const WorldMapSVG = memo(() => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hoveredDot, setHoveredDot] = useState<string | null>(null);


  const locationDots = useMemo(() => {
    return locations.map((location, index) => ({
      ...location,
      ...latLngToSVG(location.lat, location.lng),
      delay: index * 0.1
    }));
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <div className="relative aspect-[2/1] rounded-lg overflow-hidden ">

        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-2 text-gray-400 dark:text-gray-600">
              <span className="text-sm">Loading world map...</span>
            </div>
          </div>
        )}


        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: imageLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-full"
        >
          <Image
            src="/map.png"
            alt="World Map"
            fill
            className="object-contain filter dark:invert opacity-50 dark:hue-rotate-180 dark:brightness-0 dark:contrast-0"
            onLoad={() => setImageLoaded(true)}
            priority
          />




          {imageLoaded && (
            <svg
              viewBox="0 0 1000 500"
              className="absolute inset-0 w-full h-full"
            >
              {locationDots.map((location, index) => (
                <g key={location.name}>
                  <motion.circle
                    cx={location.x}
                    cy={location.y}
                    r={hoveredDot === location.name ? "12" : "10"}
                    fill="currentColor"
                    className="text-blue-400 opacity-60"
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: location.delay
                    }}
                  />

                  <motion.circle
                    cx={location.x}
                    cy={location.y}
                    r={hoveredDot === location.name ? "7" : "5"}
                    fill="currentColor"
                    className="text-blue-400 cursor-pointer"
                    style={{ pointerEvents: 'all' }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.2 }}
                    transition={{
                      duration: 0.5,
                      delay: location.delay + 0.5
                    }}
                    onMouseEnter={() => setHoveredDot(location.name)}
                    onMouseLeave={() => setHoveredDot(null)}
                  />

                </g>
              ))}
            </svg>
          )}

          {imageLoaded && locationDots.map((location) => (
            <Tooltip
              key={`tooltip-${location.name}`}
              location={location}
              x={location.x}
              y={location.y}
              visible={hoveredDot === location.name}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
});

WorldMapSVG.displayName = 'WorldMapSVG';

const useIntersectionObserver = (threshold = 0.1) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect(); 
        }
      },
      { threshold }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [targetRef, isIntersecting] as const;
};

export default function LocationsSection() {
  const [mapRef, isMapVisible] = useIntersectionObserver(0.1);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  }), []);

  const pathVariants = useMemo(() => ({
    hidden: { opacity: 0, pathLength: 0 },
    visible: { opacity: 1, pathLength: 1 }
  }), []);

  return (
    <div className="relative py-16 px-4 sm:px-6 lg:px-8">
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 ">
           Available 
             <span className="text-blue-400"> Locations
            </span>
          </h2>
                              <p className='text-sm text-gray-300 font-medium mt-4'>We kinda have way too many locations</p>

        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 mb-8 max-w-5xl mx-auto px-4"
        >
          <div className="flex flex-col items-center gap-4 sm:gap-8">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 lg:gap-16">
              {locations.slice(0, 3).map((location, index) => (
                <LocationItem key={location.name} location={location} index={index} />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 lg:gap-16">
              {locations.slice(3, 5).map((location, index) => (
                <LocationItem key={location.name} location={location} index={index + 3} />
              ))}
            </div>
          </div>
        </motion.div>
        <div ref={mapRef}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {isMapVisible && <WorldMapSVG />}
          </motion.div>
        </div>


      </div>
    </div>
  );
}

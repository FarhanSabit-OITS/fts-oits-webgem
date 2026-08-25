import React, { useEffect, useRef, useState } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import { 
  Globe, 
  RotateCcw, 
  Play, 
  Pause, 
  Activity,
  MapPin,
  Cpu,
  Database,
  Shield,
  X,
  Server,
  Terminal,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionWrapper } from './SectionWrapper';

export interface ClientLocation {
  id: string;
  city: string;
  country: string;
  longitude: number;
  latitude: number;
  clientName: string;
  projectType: string;
  impactMetrics: string;
  isHq?: boolean;
}

export interface NodeSpec {
  loadBalancer: string;
  computeInstance: string;
  databaseReplicas: string;
  redisCache: string;
  containerRuntime: string;
  securityProtocol: string;
}

export const NODE_SPECS: Record<string, NodeSpec> = {
  dhaka: {
    loadBalancer: 'NGINX Plus Multi-Master Regional Gateway / Route 53',
    computeInstance: 'Bare-Metal KVM Enterprise Clusters / 128 Core Nodes',
    databaseReplicas: 'Firestore Dedicated Command Hub with multi-region backup',
    redisCache: 'Distributed Redis cluster with 120GB RAM memory footprint',
    containerRuntime: 'Docker CE / Bare-Metal Kubernetes Orchestrated Engine',
    securityProtocol: 'Mutual TLS (mTLS) with Hardware Security Module encryption keys'
  },
  nyc: {
    loadBalancer: 'Cloudflare Enterprise Load Balancer with ultra-low latency profiles',
    computeInstance: 'Google Cloud Run Autoscale Instance / Max 800 Concurrent Cores',
    databaseReplicas: 'Cloud SQL PostgreSQL Primary Engine with 3 read replicas',
    redisCache: 'Regional GCP MemoryStore Cache / 32GB RAM instance',
    containerRuntime: 'GCP Google Kubernetes Engine (GKE) Autopilot',
    securityProtocol: 'Zero-Trust Cloudflare Access Tunnel / AES-256 GCM payload encryptor'
  },
  london: {
    loadBalancer: 'AWS Application Load Balancer (ALB) across 3 Availability Zones',
    computeInstance: 'AWS EC2 c6i.4xlarge compute cluster / Autoscaling Group',
    databaseReplicas: 'Amazon Aurora PostgreSQL Serverless v2 cluster',
    redisCache: 'AWS ElastiCache Redis cluster / 16GB Node size',
    containerRuntime: 'AWS Elastic Container Service (ECS) with AWS Fargate serverless server',
    securityProtocol: 'IAM Role boundary verification / End-to-end TLS 1.3 protocol'
  },
  tokyo: {
    loadBalancer: 'Regional Edge Gateway with latency routing policies',
    computeInstance: 'Azure Container Apps / Scale-to-Zero microservices',
    databaseReplicas: 'Azure Cosmos DB global replication with sub-10ms write latency',
    redisCache: 'Azure Cache for Redis Premium tier / 24GB active nodes',
    containerRuntime: 'Azure Kubernetes Service (AKS) cluster',
    securityProtocol: 'VNet isolation protocols / Azure Key Vault state storage integration'
  },
  berlin: {
    loadBalancer: 'NGINX Ingress Controller with custom rate limiting',
    computeInstance: 'DigitalOcean Premium AMD Droplets cluster',
    databaseReplicas: 'DigitalOcean Managed PostgreSQL with localized standbys',
    redisCache: 'Managed Redis database cluster / 8GB instances',
    containerRuntime: 'DigitalOcean Kubernetes (DOKS) managed cluster',
    securityProtocol: 'Strict GDPR compliance isolation / Cryptographic hash verification'
  },
  sydney: {
    loadBalancer: 'Cloudflare Magic Transit DDoS Shielded edge router',
    computeInstance: 'Vultr Cloud Compute AMD High Performance servers',
    databaseReplicas: 'Supabase PostgreSQL Cloud cluster with replication pools',
    redisCache: 'Upstash Serverless Redis caches / Regional clusters',
    containerRuntime: 'Docker Swarm with custom high-availability health checks',
    securityProtocol: 'ISO-27001 compliant networks / Hardware SSH physical keys'
  },
  dubai: {
    loadBalancer: 'F5 BIG-IP Local Traffic Manager virtual appliances',
    computeInstance: 'Private Cloud OpenStack hypervisor arrays',
    databaseReplicas: 'Oracle Real Application Clusters (RAC) high-availability pools',
    redisCache: 'Redis Enterprise Cluster with multi-master setups',
    containerRuntime: 'OpenShift Container Platform Cluster v4.12',
    securityProtocol: 'AEAD AES-256 data volume disk locks / Biometric node guard access'
  },
  singapore: {
    loadBalancer: 'AWS Network Load Balancer (NLB) with static IP allocation',
    computeInstance: 'AWS EC2 Hpc6a compute clusters for cleared settlements',
    databaseReplicas: 'AWS DynamoDB with global tables active-active sync',
    redisCache: 'AWS ElastiCache Redis Multi-AZ cluster / 32GB sizes',
    containerRuntime: 'AWS Elastic Kubernetes Service (EKS) instance',
    securityProtocol: 'PCI-DSS Level 1 audit profiles / AWS KMS key-rotation vaults'
  }
};

const CLIENT_LOCATIONS: ClientLocation[] = [
  {
    id: 'dhaka',
    city: 'Dhaka',
    country: 'Bangladesh',
    longitude: 90.4125,
    latitude: 23.8103,
    clientName: 'OITS Dhaka HQ',
    projectType: 'Engineering Command Hub',
    impactMetrics: 'Central Operations Command / 50+ Certified Architects',
    isHq: true
  },
  {
    id: 'nyc',
    city: 'New York',
    country: 'USA',
    longitude: -74.0060,
    latitude: 40.7128,
    clientName: 'Apex Capital Analytics',
    projectType: 'FinTech Analytics Engine',
    impactMetrics: '< 200ms Processing Latency index fulfilled'
  },
  {
    id: 'london',
    city: 'London',
    country: 'UK',
    longitude: -0.1278,
    latitude: 51.5074,
    clientName: 'SecurePay International',
    projectType: 'Payment Gateway Core',
    impactMetrics: '18% Checkout Conversion multiplier tracked'
  },
  {
    id: 'tokyo',
    city: 'Tokyo',
    country: 'Japan',
    longitude: 139.6503,
    latitude: 35.6762,
    clientName: 'Nippon Freight Systems',
    projectType: 'Logistics Routing Scheduler',
    impactMetrics: '35% ETA Prediction accuracy improvement'
  },
  {
    id: 'berlin',
    city: 'Berlin',
    country: 'Germany',
    longitude: 13.4050,
    latitude: 52.5200,
    clientName: 'EduTrack Europe',
    projectType: 'Distributed LMS Platform',
    impactMetrics: '10k+ Simultaneous Active Peers verified'
  },
  {
    id: 'sydney',
    city: 'Sydney',
    country: 'Australia',
    longitude: 151.2093,
    latitude: -33.8688,
    clientName: 'Luma Healthcare Hub',
    projectType: 'Telemedicine P2P Portals',
    impactMetrics: '50k+ Remote Patient Consultations facilitated'
  },
  {
    id: 'dubai',
    city: 'Dubai',
    country: 'UAE',
    longitude: 55.2708,
    latitude: 25.2048,
    clientName: 'Al-Maktoum Logistics',
    projectType: 'Customs Clearance Engine',
    impactMetrics: '45% Freight turnaround acceleration index'
  },
  {
    id: 'singapore',
    city: 'Singapore',
    country: 'Singapore',
    longitude: 103.8198,
    latitude: 1.3521,
    clientName: 'Apex Asian Clearing House',
    projectType: 'Automated settlement pipeline',
    impactMetrics: '< 50ms clearing confirmation latency rate'
  }
];

export const GlobalReach: React.FC = () => {
  const chartDivRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<am5map.MapChart | null>(null);
  const spinRef = useRef<any>(null);

  const [selectedLocation, setSelectedLocation] = useState<ClientLocation>(CLIENT_LOCATIONS[0]);
  const [hoveredLocation, setHoveredLocation] = useState<ClientLocation | null>(null);
  const [rotationX, setRotationX] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(true);
  
  // Real-time Spec panel and dynamic status cycling states
  const [isSpecOpen, setIsSpecOpen] = useState<boolean>(false);
  const [nodeStatuses, setNodeStatuses] = useState<Record<string, 'Online' | 'Syncing' | 'Degraded'>>({});

  const pinClickRef = useRef<(loc: ClientLocation) => void>(() => {});
  const pinHoverRef = useRef<(loc: ClientLocation) => void>(() => {});

  // Real-time Node Status interval-based state cycling
  useEffect(() => {
    const initialStatuses: Record<string, 'Online' | 'Syncing' | 'Degraded'> = {};
    CLIENT_LOCATIONS.forEach(loc => {
      initialStatuses[loc.id] = loc.id === 'dhaka' ? 'Online' : (Math.random() > 0.4 ? 'Online' : 'Syncing');
    });
    setNodeStatuses(initialStatuses);

    const statusInterval = setInterval(() => {
      setNodeStatuses(prev => {
        const next = { ...prev };
        const ids = CLIENT_LOCATIONS.map(loc => loc.id);
        const randomId = ids[Math.floor(Math.random() * ids.length)];
        
        if (randomId === 'dhaka') {
          next[randomId] = 'Online'; // HQ stays Online
        } else {
          const rand = Math.random();
          next[randomId] = rand > 0.85 ? 'Degraded' : (rand > 0.5 ? 'Syncing' : 'Online');
        }
        return next;
      });
    }, 4500);

    return () => clearInterval(statusInterval);
  }, []);

  // Passive Scroll-linked Parallax Zoom Level for Globe
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (chartDivRef.current && chartRef.current) {
            const rect = chartDivRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            // Check if element is inside viewport bounds
            if (rect.top < viewportHeight && rect.bottom > 0) {
              const totalDist = viewportHeight + rect.height;
              const progress = 1 - (rect.top + rect.height) / totalDist;
              // Safe parallax zoom factor: between 1.0 (minimum) and 1.15 (maximum)
              const zoomFactor = 1.0 + Math.max(0, Math.min(0.15, progress * 0.15));
              chartRef.current.set("zoomLevel", zoomFactor);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keep these handlers current to avoid amCharts capturing stale closures
  useEffect(() => {
    pinClickRef.current = (location: ClientLocation) => {
      setSelectedLocation(location);
      if (chartRef.current) {
        if (spinRef.current) {
          spinRef.current.stop();
          spinRef.current = null;
        }
        setIsSpinning(false);
        chartRef.current.animate({
          key: 'rotationX',
          to: -location.longitude,
          duration: 1000,
          easing: am5.ease.out(am5.ease.cubic)
        });
        chartRef.current.animate({
          key: 'rotationY',
          to: -location.latitude,
          duration: 1000,
          easing: am5.ease.out(am5.ease.cubic)
        });
      }
    };
  }, []);

  useEffect(() => {
    pinHoverRef.current = (location: ClientLocation) => {
      setHoveredLocation(location);
    };
  }, []);

  // Initialize amCharts 5 Globe
  useEffect(() => {
    if (!chartDivRef.current) return;

    // Initialize amCharts 5 Root element
    const root = am5.Root.new(chartDivRef.current);
    root.setThemes([am5themes_Animated.new(root)]);

    // Create MapChart with Orthographic 3D Globe Projection
    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'rotateX',
        panY: 'rotateY',
        projection: am5map.geoOrthographic(),
        paddingBottom: 20, 
        paddingTop: 20, 
        paddingLeft: 20, 
        paddingRight: 20,
        wheelY: 'zoom',
        animationDuration: 800
      })
    );

    chartRef.current = chart;

    // Background Ocean Sphere Polygon Series (Light Gray Ocean Fill)
    const backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
    backgroundSeries.mapPolygons.template.setAll({
      fill: am5.color(0xe8ecef),
      fillOpacity: 1,
      stroke: am5.color(0xcbd5e1),
      strokeOpacity: 0.8,
      strokeWidth: 1
    });
    backgroundSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -90, -180)
    });

    // Graticule Series (Dotted Lat/Long Overlay)
    const graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
    graticuleSeries.mapLines.template.setAll({
      strokeOpacity: 0.25,
      stroke: am5.color(0x64748b)
    });

    // Main Country Polygons Series (Solid Slate Blue Landmass)
    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: '{name}',
      toggleKey: 'active',
      interactive: true,
      fill: am5.color(0x5078c0),
      stroke: am5.color(0xdbe2ed),
      strokeOpacity: 0.7,
      strokeWidth: 0.5
    });

    polygonSeries.mapPolygons.template.states.create('hover', {
      fill: am5.color(0x2563eb),
      fillOpacity: 0.95
    });

    // Point Bullet Series for OITS Client Nodes
    const pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

    CLIENT_LOCATIONS.forEach((location) => {
      pointSeries.pushDataItem({
        geometry: { type: 'Point', coordinates: [location.longitude, location.latitude] },
        title: location.city,
        locationData: location
      } as any);
    });

    pointSeries.bullets.push((bulletRoot, series, dataItem) => {
      const data = (dataItem.dataContext as any)?.locationData as ClientLocation | undefined;
      const isHq = data?.isHq;

      const container = am5.Container.new(bulletRoot, { cursorOverStyle: 'pointer' });

      // Outer Pulse Ring Bullet with custom canvas soft-glow filter properties
      container.children.push(
        am5.Circle.new(bulletRoot, {
          radius: isHq ? 14 : 9,
          fill: am5.color(isHq ? 0x2563eb : 0x38bdf8),
          fillOpacity: 0.35,
          strokeOpacity: 0,
          shadowColor: am5.color(isHq ? 0x2563eb : 0x38bdf8),
          shadowBlur: 14,
          shadowOffsetX: 0,
          shadowOffsetY: 0
        })
      );

      // Inner Core Bullet Node with custom canvas soft-glow filter properties
      container.children.push(
        am5.Circle.new(bulletRoot, {
          radius: isHq ? 7 : 4.5,
          fill: am5.color(isHq ? 0x2563eb : 0x3b82f6),
          stroke: am5.color(0xffffff),
          strokeWidth: 1.5,
          tooltipText: `[bold]${data?.city ?? ''} (${data?.country ?? ''})[/]\n${data?.clientName ?? ''}`,
          shadowColor: am5.color(0x3b82f6),
          shadowBlur: 8,
          shadowOffsetX: 0,
          shadowOffsetY: 0
        })
      );

      container.events.on('click', () => { if (data) pinClickRef.current(data); });
      container.events.on('pointerover', () => { if (data) pinHoverRef.current(data); });
      container.events.on('pointerout', () => { setHoveredLocation(null); });

      return am5.Bullet.new(bulletRoot, { sprite: container });
    });

    // Auto-Rotation Animation Loop (30 seconds per 360° turn)
    const spin = chart.animate({
      key: 'rotationX',
      from: 0,
      to: 360,
      duration: 30000,
      loops: Infinity,
      easing: am5.ease.linear
    });
    spinRef.current = spin;

    // Track Rotation Angle for Slider Synchronization
    chart.events.on('boundschanged', () => {
      const rot = chart.get('rotationX', 0);
      setRotationX(Math.round(((rot % 360) + 360) % 360 - 180));
    });

    // Pause spin rotation on map interaction
    chart.events.on('pointerdown', () => {
      if (spinRef.current) {
        spinRef.current.stop();
        spinRef.current = null;
      }
      setIsSpinning(false);
    });

    // Clean Disposal on Component Unmount
    return () => {
      root.dispose();
    };
  }, []);

  // Slider Control Handler (handleSliderChange)
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setRotationX(val);
    if (chartRef.current) {
      if (spinRef.current) {
        spinRef.current.stop();
        spinRef.current = null;
      }
      setIsSpinning(false);
      chartRef.current.set('rotationX', val);
    }
  };

  // Play/Pause Toggle Handler (toggleSpin)
  const toggleSpin = () => {
    if (!chartRef.current) return;
    if (isSpinning) {
      if (spinRef.current) {
        spinRef.current.stop();
        spinRef.current = null;
      }
      setIsSpinning(false);
    } else {
      const currentRot = chartRef.current.get('rotationX', 0);
      spinRef.current = chartRef.current.animate({
        key: 'rotationX',
        from: currentRot,
        to: currentRot + 360,
        duration: 30000,
        loops: Infinity,
        easing: am5.ease.linear
      });
      setIsSpinning(true);
    }
  };

  // Reset View Handler (resetView)
  const resetView = () => {
    if (chartRef.current) {
      chartRef.current.goHome();
      chartRef.current.set('rotationX', 0);
      chartRef.current.set('rotationY', 0);
      setRotationX(0);
      
      if (spinRef.current) {
        spinRef.current.stop();
        spinRef.current = null;
      }

      spinRef.current = chartRef.current.animate({
        key: 'rotationX',
        from: 0,
        to: 360,
        duration: 30000,
        loops: Infinity,
        easing: am5.ease.linear
      });
      setIsSpinning(true);
    }
  };

  const activeLocation = hoveredLocation || selectedLocation;

  const handlePinClick = (location: ClientLocation) => {
    pinClickRef.current(location);
  };

  return (
    <>
      <SectionWrapper 
        id="global-reach" 
        className="bg-slate-50 dark:bg-slate-950 transition-colors duration-500"
      >
        {/* Top gradient hairline */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
        
        {/* Subtle grid pattern dot overlay */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(currentColor_1.2px,transparent_1.2px)] bg-[size:24px_24px] text-slate-300 dark:text-slate-800 opacity-25 pointer-events-none" 
        />

        <div className="relative z-10">
        
        {/* Header & Metric Badge Rail */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 pb-8 border-b border-slate-200 dark:border-slate-900">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100/60 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 text-[10px] font-mono font-bold uppercase tracking-[0.2em] rounded-full">
              <Globe size={11} className="animate-[spin_12s_linear_infinite]" /> GLOBAL REACH NETWORK
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">
              Global Scale, Local Excellence
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed">
              OITS Dhaka drives robust software, logistics, and medical pipelines deployed on distributed nodes across the world's most dynamic target markets.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 lg:gap-12">
            <div className="space-y-1">
              <span className="font-mono text-[9px] tracking-wider text-slate-400 dark:text-slate-500 uppercase block">ACTIVE CLIENT CLUSTERS</span>
              <span className="text-xl md:text-2xl font-black text-slate-900 dark:text-white font-mono block">9+ Key Hubs</span>
            </div>
            <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 hidden sm:block" />
            <div className="space-y-1">
              <span className="font-mono text-[9px] tracking-wider text-slate-400 dark:text-slate-500 uppercase block">NETWORK PERFORMANCE RATE</span>
              <span className="text-xl md:text-2xl font-black text-blue-600 dark:text-blue-400 font-mono block">99.98% SLA</span>
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Globe Canvas Column */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800/60 rounded-[2rem] p-4 md:p-6 shadow-sm relative flex flex-col justify-between">
            
            {/* Top Controls Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800/60 font-mono text-[10px] text-slate-500 dark:text-slate-400 z-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                <span className="uppercase tracking-widest font-bold text-slate-800 dark:text-slate-200">
                  amCharts 5 • Auto-Rotating 3D Globe
                </span>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleSpin}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  title={isSpinning ? "Pause ambient spin" : "Start ambient spin"}
                >
                  {isSpinning ? <Pause size={12} /> : <Play size={12} />}
                  <span>{isSpinning ? 'PAUSE' : 'SPIN'}</span>
                </button>

                <button
                  onClick={resetView}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  title="Reset projection center"
                >
                  <RotateCcw size={12} />
                  <span>RESET</span>
                </button>
              </div>
            </div>

            {/* amCharts 5 Target Div */}
            <div className="w-full flex justify-center py-6 relative">
              <div 
                ref={chartDivRef} 
                id="chartdiv" 
                className="w-full h-full min-h-[420px] sm:min-h-[480px] md:min-h-[520px] relative drop-shadow-[0_0_24px_rgba(37,99,235,0.04)]" 
              />
            </div>

            {/* Bottom Horizontal Rotation Slider */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-slate-950/60 border border-slate-200/50 dark:border-slate-800/40 rounded-2xl">
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider whitespace-nowrap">
                ROTATE SECTOR (LONGITUDE):
              </span>
              <input 
                type="range" 
                min="-180" 
                max="180" 
                value={rotationX} 
                onChange={handleSliderChange} 
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-400" 
              />
              <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/40 px-2 py-1 rounded border border-blue-100 dark:border-blue-900/30 whitespace-nowrap min-w-[50px] text-center">
                {rotationX}°
              </span>
            </div>

            {/* Interactive Hub Selector Buttons underneath */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {CLIENT_LOCATIONS.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => handlePinClick(loc)}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-mono uppercase tracking-wider transition-all border ${
                    loc.id === selectedLocation.id
                      ? 'bg-blue-600 text-white border-blue-600 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/40 font-bold'
                      : 'bg-white dark:bg-slate-900/50 text-slate-500 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {loc.city}
                </button>
              ))}
            </div>

          </div>

          {/* Telemetry Card Inspector */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800/60 rounded-[2rem] p-6 shadow-sm h-full relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLocation.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 flex flex-col justify-between h-full min-h-[420px]"
              >
                <div className="space-y-6">
                  {/* Status badge */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 dark:text-slate-500 block">
                      NODE TELEMETRY
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-mono text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                        {activeLocation.isHq ? 'HQ GLOBAL GATEWAY' : 'REMOTE NODE VERIFIED'}
                      </span>
                    </div>
                  </div>

                  {/* City & Country & Lat/Long Coordinates */}
                  <div className="space-y-2">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">
                      {activeLocation.city}
                    </h3>
                    <div className="flex items-center justify-between font-mono text-[10px] text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                      <span>{activeLocation.country}</span>
                      <span className="text-blue-600 dark:text-blue-400 font-bold">
                        LAT: {activeLocation.latitude.toFixed(4)}° / LNG: {activeLocation.longitude.toFixed(4)}°
                      </span>
                    </div>
                  </div>

                  {/* Deployment Info Rows */}
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 dark:text-slate-500 block">
                        AUTHORIZED CLIENT CLUSTER
                      </span>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-tight">
                        {activeLocation.clientName}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 dark:text-slate-500 block">
                        DEPLOYMENT ARCHITECTURE
                      </span>
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        {activeLocation.projectType}
                      </p>
                    </div>

                    <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900/40">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 dark:text-slate-500 block">
                        REAL-TIME IMPACT METRICS
                      </span>
                      <p className="text-xs font-mono text-blue-600 dark:text-blue-400 leading-relaxed font-semibold">
                        {activeLocation.impactMetrics}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom status rail */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 mt-auto">
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="uppercase tracking-widest flex items-center gap-1 text-slate-400 dark:text-slate-500">
                      <Activity size={12} className={`animate-pulse ${
                        (nodeStatuses[activeLocation.id] || 'Online') === 'Online' ? 'text-emerald-500' :
                        (nodeStatuses[activeLocation.id] || 'Online') === 'Syncing' ? 'text-amber-500' : 'text-rose-500'
                      }`} /> NODE STATUS
                    </span>
                    <span className={`font-bold uppercase tracking-wider ${
                      (nodeStatuses[activeLocation.id] || 'Online') === 'Online' ? 'text-emerald-600 dark:text-emerald-400' :
                      (nodeStatuses[activeLocation.id] || 'Online') === 'Syncing' ? 'text-amber-500' : 'text-rose-500 animate-pulse'
                    }`}>
                      {nodeStatuses[activeLocation.id] || 'Online'} • SLA VERIFIED
                    </span>
                  </div>

                  {/* Technical Spec Trigger Button */}
                  <div className="mt-4">
                    <button
                      onClick={() => setIsSpecOpen(true)}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-950 dark:bg-blue-600 hover:bg-slate-900 dark:hover:bg-blue-500 text-white font-mono text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                    >
                      <Cpu size={12} />
                      <span>View Detailed Spec</span>
                    </button>
                  </div>
                  
                  {/* Watermark */}
                  <div className="mt-4 flex items-center justify-between text-[8px] font-mono text-slate-300 dark:text-slate-700 uppercase tracking-[0.15em] border-t border-slate-100/50 dark:border-slate-900/50 pt-2.5">
                    <span>SYSTEM: OITS-DAC-GRID</span>
                    <span>VER: 5.2.0-AM</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </SectionWrapper>

    {/* Slide-in Detailed Technical Specifications Side Panel */}
    <AnimatePresence>
      {isSpecOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSpecOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[110]"
          />

          {/* Side Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md sm:max-w-lg bg-white dark:bg-[#0B0F19] shadow-2xl z-[120] border-l border-slate-200 dark:border-slate-900 flex flex-col justify-between"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-900 flex items-center justify-between">
              <div className="space-y-1">
                <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 dark:text-slate-500 block">
                  ACTIVE NODE METADATA SPEC
                </span>
                <h3 className="text-xl font-black text-slate-950 dark:text-white uppercase tracking-tight">
                  {activeLocation.city} Technical Stack
                </h3>
              </div>
              <button
                onClick={() => setIsSpecOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
                aria-label="Close panel"
              >
                <X size={18} />
              </button>
            </div>

            {/* Specs Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
              
              {/* Node Identity Info */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-900/60 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <Server size={18} />
                  </span>
                  <div>
                    <span className="font-mono text-[8px] text-slate-400 block uppercase">NODE ARCHETYPE</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                      {activeLocation.isHq ? 'Central Command Core Hub' : 'Regional Edge Compute Node'}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-100 dark:border-slate-900/50">
                  <div>
                    <span className="font-mono text-[8px] text-slate-400 block uppercase">SLA COMPLIANCE</span>
                    <span className="text-xs font-mono font-bold text-emerald-500">99.997% ACC</span>
                  </div>
                  <div>
                    <span className="font-mono text-[8px] text-slate-400 block uppercase">NODE PEERING</span>
                    <span className="text-xs font-mono font-bold text-blue-500">DIRECT PEER</span>
                  </div>
                </div>
              </div>

              {/* Tech Specs List */}
              <div className="space-y-5">
                <h4 className="font-mono text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">
                  SYSTEM COMPOSITION MATRIX
                </h4>

                {/* Load Balancer */}
                <div className="space-y-1.5 border-l-2 border-blue-500 pl-4">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    <Settings size={12} />
                    <span className="uppercase">Traffic Load Balancing</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                    {NODE_SPECS[activeLocation.id]?.loadBalancer || 'Distributed Cloudflare/AWS Global Load Balancer'}
                  </p>
                </div>

                {/* Compute Instance */}
                <div className="space-y-1.5 border-l-2 border-blue-500 pl-4">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    <Cpu size={12} />
                    <span className="uppercase">High-Performance Compute</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                    {NODE_SPECS[activeLocation.id]?.computeInstance || 'Auto-scaling Microservices Server Pool'}
                  </p>
                </div>

                {/* Container Runtime */}
                <div className="space-y-1.5 border-l-2 border-blue-500 pl-4">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    <Terminal size={12} />
                    <span className="uppercase">Container Engine</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                    {NODE_SPECS[activeLocation.id]?.containerRuntime || 'Docker Orchestration & Cluster Services'}
                  </p>
                </div>

                {/* Database Replicas */}
                <div className="space-y-1.5 border-l-2 border-blue-500 pl-4">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    <Database size={12} />
                    <span className="uppercase">Durable Database Clones</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                    {NODE_SPECS[activeLocation.id]?.databaseReplicas || 'Distributed Relational Replica Sync Engine'}
                  </p>
                </div>

                {/* Redis Cache */}
                <div className="space-y-1.5 border-l-2 border-blue-500 pl-4">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    <Activity size={12} />
                    <span className="uppercase">Memory / Redis Cache</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                    {NODE_SPECS[activeLocation.id]?.redisCache || 'Regional High-Speed Cache Ring'}
                  </p>
                </div>

                {/* Security Protocol */}
                <div className="space-y-1.5 border-l-2 border-blue-500 pl-4">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    <Shield size={12} />
                    <span className="uppercase">Cryptographic Firewall Security</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                    {NODE_SPECS[activeLocation.id]?.securityProtocol || 'Zero-Trust mTLS Network Access Shield'}
                  </p>
                </div>

              </div>

            </div>

            {/* Footer Control */}
            <div className="p-6 border-t border-slate-100 dark:border-slate-900">
              <button
                onClick={() => setIsSpecOpen(false)}
                className="w-full py-3.5 rounded-xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-mono text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all"
              >
                Close Specification
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  </>
);
};

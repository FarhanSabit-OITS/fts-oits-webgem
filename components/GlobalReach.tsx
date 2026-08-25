import React, { useEffect, useRef, useState } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import { 
  Globe as GlobeIcon, 
  Cpu, 
  Database, 
  Shield, 
  Activity, 
  TrendingUp, 
  MapPin, 
  Radio,
  Play,
  Pause,
  Compass
} from 'lucide-react';

interface HubNode {
  id: string;
  name: string;
  country: string;
  coordinates: [number, number]; // [longitude, latitude]
  sla: string;
  clusterType: string;
  architecture: string;
  latency: string;
  bandwidth: string;
  status: 'online' | 'optimizing' | 'maintenance';
}

const HUBS: HubNode[] = [
  {
    id: 'dhaka',
    name: 'Dhaka HQ',
    country: 'Bangladesh',
    coordinates: [90.4125, 23.8103],
    sla: '99.99%',
    clusterType: 'Primary Command Core',
    architecture: 'Multi-Region Edge Gateway',
    latency: '< 1ms',
    bandwidth: '40 Gbps',
    status: 'online'
  },
  {
    id: 'sf',
    name: 'San Francisco',
    country: 'United States',
    coordinates: [-122.4194, 37.7749],
    sla: '99.98%',
    clusterType: 'US-West Cluster',
    architecture: 'Kubernetes Multi-Cloud',
    latency: '142ms',
    bandwidth: '10 Gbps',
    status: 'online'
  },
  {
    id: 'nyc',
    name: 'New York City',
    country: 'United States',
    coordinates: [-74.0060, 40.7128],
    sla: '99.98%',
    clusterType: 'US-East Cluster',
    architecture: 'Hybrid Cloud Bare-Metal',
    latency: '115ms',
    bandwidth: '10 Gbps',
    status: 'online'
  },
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    coordinates: [-0.1276, 51.5074],
    sla: '99.97%',
    clusterType: 'EU-West Cluster',
    architecture: 'Zero-Trust Proxy Gateway',
    latency: '98ms',
    bandwidth: '10 Gbps',
    status: 'online'
  },
  {
    id: 'berlin',
    name: 'Berlin',
    country: 'Germany',
    coordinates: [13.4050, 52.5200],
    sla: '99.99%',
    clusterType: 'EU-Central Cluster',
    architecture: 'Sovereign Node Protocol',
    latency: '108ms',
    bandwidth: '10 Gbps',
    status: 'online'
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    coordinates: [55.2708, 25.2048],
    sla: '99.95%',
    clusterType: 'ME-East Cluster',
    architecture: 'Edge Server Array',
    latency: '45ms',
    bandwidth: '5 Gbps',
    status: 'optimizing'
  },
  {
    id: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    coordinates: [103.8198, 1.3521],
    sla: '99.99%',
    clusterType: 'APAC-South Cluster',
    architecture: 'Subsea Fiber Edge Node',
    latency: '32ms',
    bandwidth: '20 Gbps',
    status: 'online'
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    coordinates: [139.6917, 35.6762],
    sla: '99.98%',
    clusterType: 'APAC-North Cluster',
    architecture: 'Low-Latency Micro-DC',
    latency: '68ms',
    bandwidth: '10 Gbps',
    status: 'online'
  },
  {
    id: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    coordinates: [151.2093, -33.8688],
    sla: '99.96%',
    clusterType: 'OCE-South Cluster',
    architecture: 'Cloud-Native Pop',
    latency: '124ms',
    bandwidth: '5 Gbps',
    status: 'online'
  }
];

export const GlobalReach: React.FC = () => {
  const chartDivRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<am5map.MapChart | null>(null);
  const spinRef = useRef<any>(null);
  const lineSeriesRef = useRef<am5map.MapLineSeries | null>(null);

  const [selectedHub, setSelectedHub] = useState<HubNode>(HUBS[0]);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [horizontalOffset, setHorizontalOffset] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(true);

  // Initialize amCharts 5 Globe
  useEffect(() => {
    if (!chartDivRef.current) return;

    // Create Root element
    const root = am5.Root.new(chartDivRef.current);

    // Apply high-performance transitions theme
    root.setThemes([am5themes_Animated.new(root)]);

    // Create the map chart
    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "rotateY",
        projection: am5map.geoOrthographic(),
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        boxZoom: "shift",
        animationDuration: 800,
        dx: horizontalOffset
      })
    );

    chartRef.current = chart;

    // Create series for ocean background fill
    const backgroundSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {})
    );
    backgroundSeries.mapPolygons.template.setAll({
      fill: am5.color(0xe8ecef), // Light clean gray ocean
      fillOpacity: 1.0,
      strokeOpacity: 0
    });
    backgroundSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -90, -180)
    });

    // Create graticule series for longitude/latitude grid overlay
    const graticuleSeries = chart.series.push(
      am5map.GraticuleSeries.new(root, {})
    );
    graticuleSeries.mapLines.template.setAll({
      strokeOpacity: 0.2,
      stroke: am5.color(0x64748b) // soft slate graticule lines
    });

    // Create main polygon series for detailed country landmasses
    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow
      })
    );

    // Style the country borders & fill
    polygonSeries.mapPolygons.template.setAll({
      fill: am5.color(0x5078c0), // solid medium slate blue
      fillOpacity: 1.0,
      stroke: am5.color(0xdbe2ed), // fine light country border outlines
      strokeWidth: 0.6,
      tooltipText: "[font-mono text-[10px] uppercase tracking-wider]{name}[/]",
      toggleKey: "active",
      interactive: true
    });

    // Custom hover state
    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x3b5fa0), // darker slate blue on hover
      stroke: am5.color(0xdbe2ed),
      strokeWidth: 0.8
    });

    // Trigger state feedback on clicking regions
    polygonSeries.mapPolygons.template.events.on("click", (ev) => {
      const dataContext = ev.target.dataItem?.dataContext as any;
      if (dataContext && dataContext.name) {
        setHoveredCountry(dataContext.name);
      }
    });

    // Create Line Series for flight connection arcs
    const lineSeries = chart.series.push(
      am5map.MapLineSeries.new(root, {})
    );
    lineSeriesRef.current = lineSeries;

    lineSeries.mapLines.template.setAll({
      stroke: am5.color(0x38bdf8),
      strokeWidth: 1.2,
      strokeOpacity: 0.45,
      strokeDasharray: [3, 3]
    });

    // Populate flight lines connecting Dhaka HQ to other nodes
    const dhakaCoords = HUBS[0].coordinates;
    const lineData = HUBS.slice(1).map(hub => {
      return {
        geometry: {
          type: "LineString",
          coordinates: [
            dhakaCoords, // Dhaka origin
            hub.coordinates // Target client node
          ]
        },
        hubId: hub.id
      };
    });
    lineSeries.data.setAll(lineData);

    // Create Point Series for Hub Node Markers
    const pointSeries = chart.series.push(
      am5map.MapPointSeries.new(root, {
        idField: "id"
      })
    );

    // Draw customized nodes with animated radar rings
    pointSeries.bullets.push((root, series, dataItem) => {
      const container = am5.Container.new(root, {
        tooltipText: "[font-mono text-[10px] uppercase tracking-widest]{name}[/]",
        cursorOverStyle: "pointer"
      });

      const isHQ = dataItem.get("id") === "dhaka";

      // Animated pulsating ring
      const pingCircle = container.children.push(
        am5.Circle.new(root, {
          radius: isHQ ? 8 : 6,
          fill: isHQ ? am5.color(0x38bdf8) : am5.color(0x10b981),
          strokeOpacity: 0,
          opacity: 0.6
        })
      );

      pingCircle.animate({
        key: "scale",
        from: 1,
        to: 3.2,
        duration: 1800,
        loops: Infinity
      });

      pingCircle.animate({
        key: "opacity",
        from: 0.8,
        to: 0,
        duration: 1800,
        loops: Infinity
      });

      // Core anchor point
      container.children.push(
        am5.Circle.new(root, {
          radius: isHQ ? 5 : 4,
          fill: isHQ ? am5.color(0x38bdf8) : am5.color(0x10b981),
          stroke: am5.color(0xffffff),
          strokeWidth: 1.5
        })
      );

      // Bind node clicks to details state
      container.events.on("click", () => {
        const hub = HUBS.find(h => h.id === dataItem.get("id"));
        if (hub) {
          handleHubClick(hub);
        }
      });

      return am5.Bullet.new(root, {
        sprite: container
      });
    });

    // Bind Hub items directly
    pointSeries.data.setAll(HUBS.map(hub => ({
      id: hub.id,
      name: hub.name,
      longitude: hub.coordinates[0],
      latitude: hub.coordinates[1]
    })));

    // Continuous auto rotation (completes 1 rotation per 30 seconds)
    const spin = chart.animate({
      key: "rotationX",
      from: 0,
      to: 360,
      duration: 30000,
      loops: Infinity
    });
    spinRef.current = spin;

    // Pause rotation on user pointer down (interaction)
    chart.events.on("pointerdown", () => {
      spin.pause();
      setIsSpinning(false);
    });

    // Zoom controls HUD
    const zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));
    zoomControl.homeButton.set("visible", true);
    zoomControl.homeButton.events.on("click", () => {
      spin.stop();
      setIsSpinning(false);
    });

    // Clean up amCharts root strictly on unmount to prevent double roots
    return () => {
      root.dispose();
    };
  }, []);

  // Highlight active flight path on selected node change
  useEffect(() => {
    if (lineSeriesRef.current) {
      lineSeriesRef.current.mapLines.each((line) => {
        const context = line.dataItem?.dataContext as any;
        if (context && context.hubId === selectedHub.id) {
          line.setAll({
            stroke: am5.color(0x10b981), // emerald green active path highlight
            strokeWidth: 2,
            strokeDasharray: [4, 4],
            strokeOpacity: 0.9
          });
        } else {
          line.setAll({
            stroke: am5.color(0x38bdf8),
            strokeWidth: 1.2,
            strokeDasharray: [3, 3],
            strokeOpacity: 0.45
          });
        }
      });
    }
  }, [selectedHub]);

  // Smoothly align map projection center to a chosen node
  const handleHubClick = (hub: HubNode) => {
    setSelectedHub(hub);
    
    // Pause ambient spin animation on node alignment
    if (spinRef.current) {
      spinRef.current.pause();
      setIsSpinning(false);
    }

    if (chartRef.current) {
      chartRef.current.animate({
        key: "rotationX",
        to: -hub.coordinates[0],
        duration: 1100,
        easing: am5.ease.out(am5.ease.cubic)
      });
      chartRef.current.animate({
        key: "rotationY",
        to: -hub.coordinates[1],
        duration: 1100,
        easing: am5.ease.out(am5.ease.cubic)
      });
    }
  };

  // Toggle ambient continuous spin state manually
  const toggleSpinState = () => {
    if (spinRef.current) {
      if (isSpinning) {
        spinRef.current.pause();
      } else {
        spinRef.current.play();
      }
      setIsSpinning(!isSpinning);
    }
  };

  // Slider change modifies chart's DX property on-the-fly
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setHorizontalOffset(val);
    if (chartRef.current) {
      chartRef.current.set("dx", val);
    }
  };

  return (
    <section 
      id="global-reach" 
      className="py-24 bg-[#05080F] text-slate-100 border-t border-slate-900 transition-colors duration-500 overflow-hidden relative"
    >
      {/* Structural subtle telemetry grid background */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#38BDF8 1px, transparent 1px)`,
          backgroundSize: '36px 36px'
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 pb-8 border-b border-slate-900">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-[#38BDF8] text-[10px] font-mono font-bold tracking-widest uppercase">
              <Radio size={12} className="animate-pulse" /> GLOBAL REACH NETWORK
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-white">
              Interactive 3D Earth projection Engine
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl leading-relaxed">
              Tracking real-time deployment routing nodes, core software distribution, and active server health statistics from Dhaka core HQ out to global client clusters.
            </p>
          </div>

          {/* Quick Metrics Rail */}
          <div className="flex flex-wrap items-center gap-6 lg:gap-12">
            <div className="space-y-1">
              <span className="font-mono text-[10px] tracking-wider text-slate-500 uppercase block">Total Active Nodes</span>
              <span className="text-2xl font-black text-white font-mono block">9+ Key Hubs</span>
            </div>
            <div className="h-8 w-[1px] bg-slate-900 hidden sm:block" />
            <div className="space-y-1">
              <span className="font-mono text-[10px] tracking-wider text-slate-500 uppercase block">Global Average Latency</span>
              <span className="text-2xl font-black text-emerald-400 font-mono block">82.4ms</span>
            </div>
            <div className="h-8 w-[1px] bg-slate-900 hidden sm:block" />
            <div className="space-y-1">
              <span className="font-mono text-[10px] tracking-wider text-slate-500 uppercase block">Network Reliability Index</span>
              <span className="text-2xl font-black text-[#38BDF8] font-mono block">99.98% SLA</span>
            </div>
          </div>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Globe Canvas Column (8 cols) */}
          <div className="lg:col-span-8 flex flex-col items-center justify-center relative">
            
            {/* Control HUD Overlays */}
            <div className="absolute top-4 left-4 z-20 bg-slate-950/80 border border-slate-900 p-4 rounded-2xl backdrop-blur-md max-w-xs space-y-3 font-mono">
              <div className="flex items-center gap-2">
                <GlobeIcon size={14} className="text-[#38BDF8] animate-spin-slow" />
                <span className="text-[10px] font-bold text-white tracking-wider uppercase">Projection System</span>
              </div>
              <div className="space-y-1.5 text-[9px] text-slate-400">
                <p>PROVIDER: <span className="text-[#38BDF8]">AMCHARTS 5 GLOBAL</span></p>
                <p>PROJECTION: <span className="text-emerald-400">ORTHOGRAPHIC 3D</span></p>
                <p>POLYGONS: <span className="text-white">HIGH-FIDELITY WORLD</span></p>
                {hoveredCountry && (
                  <p>LAST SECTOR: <span className="text-amber-400">{hoveredCountry}</span></p>
                )}
              </div>
            </div>

            {/* Rotation Control HUD Overlay */}
            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2.5 bg-slate-950/80 border border-slate-900 p-2.5 rounded-2xl backdrop-blur-md">
              <button 
                onClick={toggleSpinState}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[#38BDF8] hover:bg-slate-800 hover:text-white transition-all"
                title={isSpinning ? "Pause auto rotation" : "Play auto rotation"}
              >
                {isSpinning ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <div className="h-5 w-[1px] bg-slate-900" />
              <span className="font-mono text-[9px] uppercase text-slate-400 flex items-center gap-1">
                <Compass size={12} className={isSpinning ? "animate-spin" : ""} />
                {isSpinning ? "Ambient rotation" : "Rotation paused"}
              </span>
            </div>

            {/* Earth Canvas Container */}
            <div className="w-full flex flex-col items-center justify-center border border-slate-900 rounded-[2rem] bg-slate-950/40 p-6 relative min-h-[500px]">
              
              <div 
                ref={chartDivRef} 
                className="w-full h-[520px] max-w-full drop-shadow-[0_0_40px_rgba(56,189,248,0.06)]"
              />

              {/* Slider for adjusting horizontal offset */}
              <div className="w-full max-w-md mt-4 px-4 py-3 bg-slate-950/80 border border-slate-900 rounded-2xl flex items-center justify-between gap-4 font-mono z-10">
                <span className="text-[9px] text-slate-500 uppercase tracking-wider whitespace-nowrap">SHIFT HORIZONTAL:</span>
                <input 
                  type="range" 
                  min="-150" 
                  max="150" 
                  value={horizontalOffset} 
                  onChange={handleSliderChange}
                  className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-[#38BDF8] border border-slate-800"
                />
                <span className="text-[10px] text-emerald-400 font-bold w-12 text-right">{horizontalOffset}px</span>
              </div>

            </div>

            {/* Interactive Hub selectors */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {HUBS.map((hub) => (
                <button
                  key={hub.id}
                  onClick={() => handleHubClick(hub)}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-mono uppercase tracking-wider transition-all border ${
                    hub.id === selectedHub.id
                      ? 'bg-sky-500/10 text-[#38BDF8] border-[#38BDF8] font-bold'
                      : 'bg-slate-950/50 text-slate-500 border-slate-900 hover:border-slate-800 hover:text-slate-300'
                  }`}
                >
                  {hub.name}
                </button>
              ))}
            </div>

          </div>

          {/* Telemetry Card Inspector (4 cols) */}
          <div className="lg:col-span-4 h-full flex flex-col justify-center">
            
            <div className="bg-slate-950/50 border border-slate-900 rounded-[2rem] p-6 sm:p-8 space-y-6 relative overflow-hidden flex flex-col justify-between h-full min-h-[460px]">
              
              {/* Background abstract overlay grid */}
              <div 
                className="absolute inset-0 opacity-[0.01] pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(#10B981 1px, transparent 1px)`,
                  backgroundSize: '16px 16px'
                }}
              />

              <div className="space-y-6 relative z-10">
                {/* Hub title */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 block">Active Node telemetry</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider ${
                      selectedHub.status === 'online' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                    }`}>
                      {selectedHub.status}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-white leading-tight">
                    {selectedHub.name}
                  </h3>
                  <p className="text-slate-400 text-xs flex items-center gap-1">
                    <MapPin size={12} className="text-sky-400" /> {selectedHub.country}
                  </p>
                </div>

                <hr className="border-slate-900" />

                {/* Coordinates & Location detail */}
                <div className="grid grid-cols-2 gap-4 font-mono text-[10px]">
                  <div className="space-y-1">
                    <span className="text-slate-500 block uppercase tracking-widest">Longitude</span>
                    <span className="text-white font-bold block">{selectedHub.coordinates[0].toFixed(4)}° E</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-500 block uppercase tracking-widest">Latitude</span>
                    <span className="text-white font-bold block">{selectedHub.coordinates[1].toFixed(4)}° N</span>
                  </div>
                </div>

                <hr className="border-slate-900" />

                {/* Telemetry metadata rows */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 mt-0.5">
                      <Cpu size={14} />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 block">Node classification</span>
                      <span className="text-xs text-white font-bold leading-none">{selectedHub.clusterType}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 mt-0.5">
                      <Database size={14} />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 block">Systems deployment</span>
                      <span className="text-xs text-white font-bold leading-none">{selectedHub.architecture}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 mt-0.5">
                      <Shield size={14} />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 block">SLA index</span>
                      <span className="text-xs text-emerald-400 font-bold leading-none">{selectedHub.sla} Guaranteed</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Real-time stats footer block */}
              <div className="pt-6 border-t border-slate-900 font-mono text-[10px] space-y-3 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 uppercase tracking-widest flex items-center gap-1">
                    <Activity size={12} className="text-rose-500 animate-pulse" /> Edge Latency
                  </span>
                  <span className="text-white font-bold">{selectedHub.latency}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 uppercase tracking-widest flex items-center gap-1">
                    <TrendingUp size={12} className="text-sky-500" /> Active Bandwidth
                  </span>
                  <span className="text-white font-bold">{selectedHub.bandwidth}</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

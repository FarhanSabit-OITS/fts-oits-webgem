// Mock Analytics Integration Engine for OITS Dhaka
// Simulates user engagement performance tracking, custom event logging, and session interaction metrics.

export interface AnalyticsEvent {
  event: string;
  timestamp: string;
  properties?: Record<string, any>;
}

const STORAGE_KEY = 'oits_analytics_events';

class AnalyticsTracker {
  private events: AnalyticsEvent[] = [];
  private isInitialized = false;

  public init() {
    if (this.isInitialized || typeof window === 'undefined') return;
    this.isInitialized = true;

    // Load existing events from session storage if available
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.events = JSON.parse(stored);
      }
    } catch {
      this.events = [];
    }

    this.track('page_view', {
      path: window.location.pathname,
      referrer: document.referrer || 'direct',
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      language: navigator.language,
      userAgent: navigator.userAgent,
    });

    this.setupScrollTracking();
    this.setupPerformanceTracking();

    console.info('[Analytics Engine] Initialized mock user engagement tracking.');
  }

  public track(event: string, properties?: Record<string, any>) {
    const payload: AnalyticsEvent = {
      event,
      timestamp: new Date().toISOString(),
      properties,
    };

    this.events.push(payload);

    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this.events.slice(-50)));
    } catch (err) {
      console.warn('[Analytics Engine] Session storage write error:', err);
    }

    console.log(`%c[Analytics] 📊 Event: ${event}`, 'color: #3b82f6; font-weight: bold;', properties || '');
  }

  private setupScrollTracking() {
    let trackedDepths = new Set<number>();

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight <= 0) return;

      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      [25, 50, 75, 100].forEach((threshold) => {
        if (scrollPercent >= threshold && !trackedDepths.has(threshold)) {
          trackedDepths.add(threshold);
          this.track('scroll_depth', { depthPercent: threshold });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle modern page visibility & bfcache lifecycle
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          try {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this.events.slice(-50)));
          } catch {
            // Ignore storage errors on exit
          }
        }
      });
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('pagehide', (e) => {
        try {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this.events.slice(-50)));
        } catch {
          // Ignore
        }
      });
    }
  }

  private setupPerformanceTracking() {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfEntries = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          if (perfEntries) {
            this.track('performance_metrics', {
              dnsLookupMs: Math.round(perfEntries.domainLookupEnd - perfEntries.domainLookupStart),
              responseMs: Math.round(perfEntries.responseEnd - perfEntries.requestStart),
              domInteractiveMs: Math.round(perfEntries.domInteractive),
              domContentLoadedMs: Math.round(perfEntries.domContentLoadedEventEnd),
              loadCompleteMs: Math.round(perfEntries.loadEventEnd),
            });
          }
        }, 1000);
      });
    }
  }

  public getLoggedEvents(): AnalyticsEvent[] {
    return this.events;
  }
}

export const analytics = new AnalyticsTracker();

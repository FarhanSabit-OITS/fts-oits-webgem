import React from 'react';

export interface BrandLogoProps {
  theme?: 'light' | 'dark' | 'auto';
  variant?: 'full' | 'icon';
  className?: string;
  height?: number | string;
  showText?: boolean;
}

/**
 * Official OITS Dhaka Brand Logo Component
 * - Light Mode: Deep Navy Blue (#1D2A68) circular emblem with crisp Black (#0B0F19) wordmark
 * - Dark Mode: Monochrome Pure White (#FFFFFF) emblem and wordmark
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  theme = 'auto',
  variant = 'full',
  className = '',
  height = 36,
  showText = true,
}) => {
  const isFull = variant === 'full' && showText;

  // Render SVG with exact geometrical paths matching the OITS Dhaka original logo
  return (
    <div
      className={`inline-flex items-center select-none transition-colors duration-300 ${className}`}
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
    >
      {isFull ? (
        <svg
          viewBox="0 0 450 190"
          className="h-full w-auto max-w-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="OITS Dhaka Ltd."
          role="img"
        >
          {/* ================= LIGHT MODE LAYER ================= */}
          <g
            className={
              theme === 'light'
                ? 'block'
                : theme === 'dark'
                ? 'hidden'
                : 'block dark:hidden'
            }
          >
            {/* Circular Seal (Navy Blue: #1D2A68) */}
            <g transform="translate(10, 5)">
              {/* Outer Navy Ring */}
              <circle
                cx="90"
                cy="90"
                r="84"
                stroke="#1D2A68"
                strokeWidth="20"
                fill="none"
              />
              {/* Inner Thin Ring */}
              <circle
                cx="90"
                cy="90"
                r="70"
                stroke="#1D2A68"
                strokeWidth="2.5"
                fill="none"
              />

              {/* Inner Outlined 'I' */}
              <rect
                x="56"
                y="52"
                width="24"
                height="76"
                rx="6"
                stroke="#1D2A68"
                strokeWidth="5"
                fill="#FFFFFF"
              />

              {/* Inner Outlined 'T' */}
              <path
                d="M88 52 H136 C138 52 140 54 140 56 V72 C140 74 138 76 136 76 H122 V122 C122 125 120 128 116 128 H108 C104 128 102 125 102 122 V76 H88 C86 76 84 74 84 72 V56 C84 54 86 52 88 52 Z"
                stroke="#1D2A68"
                strokeWidth="5"
                fill="#FFFFFF"
                strokeLinejoin="round"
              />
            </g>

            {/* Wordmark Section (Rich Black: #0A0D14) */}
            {/* 'oits' main logotype */}
            <g fill="#0A0D14">
              {/* 'o' with the distinctive 45° bottom-left teardrop notch */}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M260 52 C278 52 292 66 292 84 C292 102 278 116 260 116 C247.5 116 236.7 109 231.5 98.7 L231 113 L231.5 113.5 C233 115 233 116 232 116.5 C230 117 228 115 228 112 L228 92 C228 69.9 242.3 52 260 52 Z M260 72 C253.4 72 248 77.4 248 84 C248 90.6 253.4 96 260 96 C266.6 96 272 90.6 272 84 C272 77.4 266.6 72 260 72 Z"
              />

              {/* 'i' with angular arrowhead top slash */}
              {/* Dot / Arrowhead */}
              <path d="M303 36 L315 48 H303 V36 Z" />
              {/* Stem */}
              <rect x="303" y="55" width="20" height="61" rx="1" />

              {/* 't' with angled top stroke and curved base */}
              <path d="M331 42 H349 V55 H364 V71 H349 V96 C349 101 352 103 358 103 C361 103 363.5 102 365 101 V115 C362 116 357 116.5 351 116.5 C337 116.5 331 110 331 97 V71 H324 V55 H331 V42 Z" />

              {/* 's' geometric futuristic */}
              <path d="M375 97 C375 108.5 385 116.5 401 116.5 C417 116.5 428 108 428 96 C428 85.5 420 81 405 77.5 C394 75 389 72.5 389 67.5 C389 62.5 393.5 59 401 59 C408.5 59 413.5 62 414.5 67.5 H427 C426 55.5 416 51.5 401 51.5 C386 51.5 376 59 376 70 C376 80.5 384 84.5 399 88 C411 91 415.5 93.5 415.5 99 C415.5 105 409.5 108.5 401 108.5 C392 108.5 386.5 104 386 97 H375 Z" />
            </g>

            {/* 'dhaka ltd' stencil subtitle */}
            <g fill="#0A0D14">
              {/* d */}
              <path d="M233 133 H242 V170 H233 V133 Z M244 148 C248 144 254 144 258 147 C262 150 264 156 264 161 C264 167 261 171 257 173.5 L252 166 C254 164.5 255 162.5 255 160 C255 156.5 252.5 154 249 154 C246 154 244 156 244 158 V148 Z" />
              {/* h */}
              <path d="M272 133 H281 V170 H272 V133 Z M283 154 C287 148 293 148 297 151 C300 154 301 159 301 164 V170 H292 V165 C292 160.5 289.5 158 286 158 C284 158 283 159 283 161 V170 H283 V154 Z" />
              {/* a */}
              <path d="M309 153 C312 147 318 147 323 148 C328 150 330 154 330 159 V170 H322 V166 C320 169 316 171 312 170 C307.5 169 305 165 305 161 C305 156 309 154 316 153.5 L322 153 V152 C322 149.5 320 148 317 148 C314 148 311.5 149.5 311 152 L309 153 Z" />
              {/* k */}
              <path d="M338 133 H347 V170 H338 V133 Z M349 155 L357 147 H367 L357 157 L368 170 H357 L349 160 V155 Z" />
              {/* a */}
              <path d="M375 153 C378 147 384 147 389 148 C394 150 396 154 396 159 V170 H388 V166 C386 169 382 171 378 170 C373.5 169 371 165 371 161 C371 156 375 154 382 153.5 L388 153 V152 C388 149.5 386 148 383 148 C380 148 377.5 149.5 377 152 L375 153 Z" />
              {/* l */}
              <path d="M410 133 H419 V170 H410 V133 Z" />
              {/* t */}
              <path d="M427 137 H435 V146 H444 V154 H435 V166 C435 168 436.5 169 439 169 H443 V170 H437 C430 170 427 167 427 161 V154 H422 V146 H427 V137 Z" />
              {/* d */}
              <path d="M451 133 H460 V170 H451 V133 Z" />
            </g>
          </g>

          {/* ================= DARK MODE LAYER ================= */}
          <g
            className={
              theme === 'dark'
                ? 'block'
                : theme === 'light'
                ? 'hidden'
                : 'hidden dark:block'
            }
          >
            {/* Circular Seal (Pure White: #FFFFFF) */}
            <g transform="translate(10, 5)">
              {/* Outer White Ring */}
              <circle
                cx="90"
                cy="90"
                r="84"
                stroke="#FFFFFF"
                strokeWidth="20"
                fill="none"
              />
              {/* Inner Thin Ring */}
              <circle
                cx="90"
                cy="90"
                r="70"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                fill="none"
              />

              {/* Inner Outlined 'I' */}
              <rect
                x="56"
                y="52"
                width="24"
                height="76"
                rx="6"
                stroke="#FFFFFF"
                strokeWidth="5"
                fill="transparent"
              />

              {/* Inner Outlined 'T' */}
              <path
                d="M88 52 H136 C138 52 140 54 140 56 V72 C140 74 138 76 136 76 H122 V122 C122 125 120 128 116 128 H108 C104 128 102 125 102 122 V76 H88 C86 76 84 74 84 72 V56 C84 54 86 52 88 52 Z"
                stroke="#FFFFFF"
                strokeWidth="5"
                fill="transparent"
                strokeLinejoin="round"
              />
            </g>

            {/* Wordmark Section (Pure White: #FFFFFF) */}
            {/* 'oits' main logotype */}
            <g fill="#FFFFFF">
              {/* 'o' with the distinctive 45° bottom-left teardrop notch */}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M260 52 C278 52 292 66 292 84 C292 102 278 116 260 116 C247.5 116 236.7 109 231.5 98.7 L231 113 L231.5 113.5 C233 115 233 116 232 116.5 C230 117 228 115 228 112 L228 92 C228 69.9 242.3 52 260 52 Z M260 72 C253.4 72 248 77.4 248 84 C248 90.6 253.4 96 260 96 C266.6 96 272 90.6 272 84 C272 77.4 266.6 72 260 72 Z"
              />

              {/* 'i' with angular arrowhead top slash */}
              <path d="M303 36 L315 48 H303 V36 Z" />
              <rect x="303" y="55" width="20" height="61" rx="1" />

              {/* 't' with angled top stroke and curved base */}
              <path d="M331 42 H349 V55 H364 V71 H349 V96 C349 101 352 103 358 103 C361 103 363.5 102 365 101 V115 C362 116 357 116.5 351 116.5 C337 116.5 331 110 331 97 V71 H324 V55 H331 V42 Z" />

              {/* 's' geometric futuristic */}
              <path d="M375 97 C375 108.5 385 116.5 401 116.5 C417 116.5 428 108 428 96 C428 85.5 420 81 405 77.5 C394 75 389 72.5 389 67.5 C389 62.5 393.5 59 401 59 C408.5 59 413.5 62 414.5 67.5 H427 C426 55.5 416 51.5 401 51.5 C386 51.5 376 59 376 70 C376 80.5 384 84.5 399 88 C411 91 415.5 93.5 415.5 99 C415.5 105 409.5 108.5 401 108.5 C392 108.5 386.5 104 386 97 H375 Z" />
            </g>

            {/* 'dhaka ltd' stencil subtitle */}
            <g fill="#FFFFFF">
              {/* d */}
              <path d="M233 133 H242 V170 H233 V133 Z M244 148 C248 144 254 144 258 147 C262 150 264 156 264 161 C264 167 261 171 257 173.5 L252 166 C254 164.5 255 162.5 255 160 C255 156.5 252.5 154 249 154 C246 154 244 156 244 158 V148 Z" />
              {/* h */}
              <path d="M272 133 H281 V170 H272 V133 Z M283 154 C287 148 293 148 297 151 C300 154 301 159 301 164 V170 H292 V165 C292 160.5 289.5 158 286 158 C284 158 283 159 283 161 V170 H283 V154 Z" />
              {/* a */}
              <path d="M309 153 C312 147 318 147 323 148 C328 150 330 154 330 159 V170 H322 V166 C320 169 316 171 312 170 C307.5 169 305 165 305 161 C305 156 309 154 316 153.5 L322 153 V152 C322 149.5 320 148 317 148 C314 148 311.5 149.5 311 152 L309 153 Z" />
              {/* k */}
              <path d="M338 133 H347 V170 H338 V133 Z M349 155 L357 147 H367 L357 157 L368 170 H357 L349 160 V155 Z" />
              {/* a */}
              <path d="M375 153 C378 147 384 147 389 148 C394 150 396 154 396 159 V170 H388 V166 C386 169 382 171 378 170 C373.5 169 371 165 371 161 C371 156 375 154 382 153.5 L388 153 V152 C388 149.5 386 148 383 148 C380 148 377.5 149.5 377 152 L375 153 Z" />
              {/* l */}
              <path d="M410 133 H419 V170 H410 V133 Z" />
              {/* t */}
              <path d="M427 137 H435 V146 H444 V154 H435 V166 C435 168 436.5 169 439 169 H443 V170 H437 C430 170 427 167 427 161 V154 H422 V146 H427 V137 Z" />
              {/* d */}
              <path d="M451 133 H460 V170 H451 V133 Z" />
            </g>
          </g>
        </svg>
      ) : (
        /* Icon-Only Mode (Circular IT seal) */
        <svg
          viewBox="0 0 190 190"
          className="h-full w-auto aspect-square overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="OITS Emblem"
          role="img"
        >
          {/* Light Mode Icon */}
          <g
            className={
              theme === 'light'
                ? 'block'
                : theme === 'dark'
                ? 'hidden'
                : 'block dark:hidden'
            }
          >
            <circle
              cx="95"
              cy="95"
              r="84"
              stroke="#1D2A68"
              strokeWidth="20"
              fill="none"
            />
            <circle
              cx="95"
              cy="95"
              r="70"
              stroke="#1D2A68"
              strokeWidth="2.5"
              fill="none"
            />
            <rect
              x="61"
              y="57"
              width="24"
              height="76"
              rx="6"
              stroke="#1D2A68"
              strokeWidth="5"
              fill="#FFFFFF"
            />
            <path
              d="M93 57 H141 C143 57 145 59 145 61 V77 C145 79 143 81 141 81 H127 V127 C127 130 125 133 121 133 H113 C109 133 107 130 107 127 V81 H93 C91 81 89 79 89 77 V61 C89 59 91 57 93 57 Z"
              stroke="#1D2A68"
              strokeWidth="5"
              fill="#FFFFFF"
              strokeLinejoin="round"
            />
          </g>

          {/* Dark Mode Icon */}
          <g
            className={
              theme === 'dark'
                ? 'block'
                : theme === 'light'
                ? 'hidden'
                : 'hidden dark:block'
            }
          >
            <circle
              cx="95"
              cy="95"
              r="84"
              stroke="#FFFFFF"
              strokeWidth="20"
              fill="none"
            />
            <circle
              cx="95"
              cy="95"
              r="70"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              fill="none"
            />
            <rect
              x="61"
              y="57"
              width="24"
              height="76"
              rx="6"
              stroke="#FFFFFF"
              strokeWidth="5"
              fill="transparent"
            />
            <path
              d="M93 57 H141 C143 57 145 59 145 61 V77 C145 79 143 81 141 81 H127 V127 C127 130 125 133 121 133 H113 C109 133 107 130 107 127 V81 H93 C91 81 89 79 89 77 V61 C89 59 91 57 93 57 Z"
              stroke="#FFFFFF"
              strokeWidth="5"
              fill="transparent"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      )}
    </div>
  );
};

export default BrandLogo;

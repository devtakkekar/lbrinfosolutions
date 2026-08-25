/**
 * Cookie Consent Banner
 * GDPR-style cookie consent with localStorage persistence.
 * Shows on first visit, remembers preference.
 */

const COOKIE_CONSENT_KEY = 'lbr_cookie_consent';

type ConsentLevel = 'all' | 'necessary' | 'rejected';

interface ConsentState {
  level: ConsentLevel;
  timestamp: number;
}

function getConsent(): ConsentState | null {
  try {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as ConsentState;
  } catch {
    return null;
  }
}

function setConsent(level: ConsentLevel): void {
  const state: ConsentState = {
    level,
    timestamp: Date.now(),
  };
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(state));
}

function hideBanner(): void {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;
  banner.classList.add('translate-y-full', 'opacity-0');
  setTimeout(() => { banner.remove(); }, 300);
}

export function initCookieBanner(): void {
  // Skip if consent already given
  if (getConsent()) return;

  // Create and inject banner
  const bannerEl = document.createElement('div');
  bannerEl.id = 'cookie-banner';
  bannerEl.setAttribute('role', 'dialog');
  bannerEl.setAttribute('aria-label', 'Cookie consent');
  bannerEl.className = 'fixed bottom-0 left-0 right-0 z-[var(--z-cookie-banner)] transition-all duration-300 translate-y-full opacity-0';

  bannerEl.innerHTML = `
    <div class="bg-white border-t border-gray-200 shadow-dropdown">
      <div class="container-main py-4 lg:py-5">
        <div class="flex flex-col lg:flex-row items-start lg:items-center gap-4">
          <!-- Text -->
          <div class="flex-1">
            <p class="text-sm text-gray-700 font-medium mb-1">We value your privacy</p>
            <p class="text-xs text-gray-500 leading-relaxed">
              We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
              By clicking "Allow All", you consent to our use of cookies.
              <a href="/src/pages/cookies/index.html" class="text-blue-accent hover:text-blue-light underline">Cookie Policy</a>
            </p>
          </div>
          <!-- Buttons -->
          <div class="flex flex-wrap items-center gap-2">
            <button class="cookie-btn-reject btn text-xs px-4 py-2 bg-transparent text-gray-600 border border-gray-200 hover:border-gray-400">
              Reject Optional
            </button>
            <button class="cookie-btn-necessary btn text-xs px-4 py-2 bg-gray-100 text-navy border border-gray-200 hover:bg-gray-200">
              Necessary Only
            </button>
            <button class="cookie-btn-all btn text-xs px-4 py-2 bg-blue-accent text-white hover:bg-blue-light">
              Allow All
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(bannerEl);

  // Slide up into view on next frame (starts from translate-y-full/opacity-0 above)
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      bannerEl.classList.remove('translate-y-full', 'opacity-0');
    });
  });

  // Event listeners
  const btnAll = bannerEl.querySelector('.cookie-btn-all');
  const btnNecessary = bannerEl.querySelector('.cookie-btn-necessary');
  const btnReject = bannerEl.querySelector('.cookie-btn-reject');

  btnAll?.addEventListener('click', () => { setConsent('all'); hideBanner(); });
  btnNecessary?.addEventListener('click', () => { setConsent('necessary'); hideBanner(); });
  btnReject?.addEventListener('click', () => { setConsent('rejected'); hideBanner(); });
}

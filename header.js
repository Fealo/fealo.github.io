// Shared header component for paed.eu

// Preload the logo image for better performance
function preloadLogo() {
    // Check if preload link already exists
    if (!document.querySelector('link[rel="preload"][href="images/logo.png"]')) {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.href = 'images/logo.png';
        preloadLink.as = 'image';
        document.head.appendChild(preloadLink);
        console.log('Logo preload added');
    }
}

function createHeader(activePage = '') {
    console.log('Creating header for page:', activePage);
    
    // Determine if we're on the home page
    const isHomePage = activePage === '' || activePage === 'home';
    console.log('Is home page:', isHomePage);
    
    // Logo HTML - link only if not on home page
    const logoHTML = isHomePage 
        ? `<img src="images/logo.png" alt="paed.eu" class="header-logo">`
        : `<a href="index.html"><img src="images/logo.png" alt="paed.eu" class="header-logo"></a>`;
    
    const headerHTML = `
        <header class="header">
            <div class="header-content">
                <div class="header-top">
                    <h1 class="header-title">
                        ${logoHTML}
                    </h1>
                    <nav class="header-nav">
                        <a href="rechner.html" class="nav-link ${activePage === 'rechner' ? 'active' : ''}">Rechner</a>
                        <a href="exploring.html" class="nav-link ${activePage === 'exploring' ? 'active' : ''}">Exploring</a>
                        <a href="impressum.html" class="nav-link ${activePage === 'impressum' ? 'active' : ''}">Impressum</a>
                    </nav>
                </div>
            </div>
        </header>
    `;
    
    // Insert header into the page
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        console.log('Inserting header HTML');
        headerContainer.innerHTML = headerHTML;
    } else {
        console.error('Header container not found!');
    }
}

// Auto-load header when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Header.js loaded - DOM ready');
    
    // Preload the logo first
    preloadLogo();
    
    // Get the active page from the body's data attribute
    const activePage = document.body.getAttribute('data-page') || '';
    console.log('Active page:', activePage);
    
    // Check if header container exists
    const headerContainer = document.getElementById('header-container');
    console.log('Header container found:', !!headerContainer);
    
    createHeader(activePage);
});

// Also try to load immediately if DOM is already loaded
if (document.readyState === 'loading') {
    // Do nothing, DOMContentLoaded will fire
} else {
    // DOM is already loaded
    console.log('DOM already loaded, creating header immediately');
    preloadLogo();
    const activePage = document.body.getAttribute('data-page') || '';
    createHeader(activePage);
}

import { useMemo, useState } from "react";
import "./App.css";

type Category = "Browser" | "Developer tool" | "Included";
type Filter = "All" | Category;

type StoreItem = {
  id: string;
  name: string;
  category: Category;
  version: string;
  status: string;
  statusKind: "available" | "library" | "included";
  description: string;
  details: string;
  features: string[];
  projectUrl: string;
  releaseUrl?: string;
  downloadUrl?: string;
};

const storeItems: StoreItem[] = [
  {
    id: "minuan",
    name: "Minuan Browser",
    category: "Browser",
    version: "v1.0.1",
    status: "Windows download available",
    statusKind: "available",
    description: "A browser made for SimVerse, with tabs, approved-site browsing and a built-in place to start exploring.",
    details: "Minuan is the main way into SimVerse. It uses Sunay and Qt WebEngine to show web pages, and includes an early HTML6 opening and conversion feature.",
    features: [
      "Tabbed browsing and address-bar search",
      "HTTPS approved-site list",
      "Built-in SimVerse gateway",
      "Early HTML6 document support"
    ],
    projectUrl: "https://github.com/Minuan-org/Minuan",
    releaseUrl: "https://github.com/Minuan-org/Minuan/releases/tag/v1.0.1",
    downloadUrl: "https://github.com/Minuan-org/Minuan/releases/download/v1.0.1/Minuan-Windows-x64.zip"
  },
  {
    id: "sunay",
    name: "Sunay Rendering Library",
    category: "Developer tool",
    version: "v1.0.1",
    status: "Developer library · no installer",
    statusKind: "library",
    description: "The page-rendering library used inside Minuan. It connects Minuan's page view to Qt WebEngine and Chromium.",
    details: "Sunay is a library for developers, not a separate browser app. Its source code and API notes are available, but there is no ready-to-install app package.",
    features: [
      "HTML rendering through Qt WebEngine",
      "URL navigation and stop controls",
      "Loading progress and completion signals",
      "JavaScript and image-loading options"
    ],
    projectUrl: "https://github.com/Minuan-org/Sunay",
    releaseUrl: "https://github.com/Minuan-org/Sunay/releases/tag/v1.0.1"
  },
  {
    id: "gateway",
    name: "SimVerse Gateway",
    category: "Included",
    version: "Included with Minuan",
    status: "Built into Minuan",
    statusKind: "included",
    description: "The starting page for exploring SimVerse projects, opening a local creation and finding useful destinations.",
    details: "The gateway is part of Minuan, so it is not a separate download. It is the first screen shown when Minuan opens.",
    features: [
      "SimVerse project links",
      "Web search",
      "Local project shortcut",
      "Links to Minuan and Sunay"
    ],
    projectUrl: "https://github.com/Minuan-org/Minuan"
  },
  {
    id: "html6",
    name: "HTML6 Workshop",
    category: "Included",
    version: "Starter feature",
    status: "Early development",
    statusKind: "included",
    description: "Open an HTML6 or HTML file in Minuan and preview the parts of the format that are currently supported.",
    details: "This is an early converter, not the full HTML6, CSS Next or JS-squared system. Those larger parts still need to be built.",
    features: [
      "Open local HTML6 and HTML files",
      "Convert supported HTML6 tags",
      "Preview through Sunay",
      "Keep the document's local resource folder"
    ],
    projectUrl: "https://github.com/Minuan-org/Minuan"
  }
];

const filters: Filter[] = ["All", "Browser", "Developer tool", "Included"];

function StoreCard({ item }: { item: StoreItem }) {
  return (
    <article className="app-card">
      <div className="card-topline">
        <div className={"app-icon app-icon-" + item.statusKind} aria-hidden="true">
          {item.category === "Browser" ? "M" : item.category === "Developer tool" ? "S" : "✦"}
        </div>
        <span className={"status-pill status-" + item.statusKind}>{item.status}</span>
      </div>

      <div className="card-heading">
        <div>
          <p className="category-label">{item.category}</p>
          <h3>{item.name}</h3>
        </div>
        <span className="version-label">{item.version}</span>
      </div>

      <p className="app-description">{item.description}</p>

      <ul className="feature-list">
        {item.features.map((feature) => (
          <li key={feature}>
            <span className="feature-check" aria-hidden="true">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <p className="app-details">{item.details}</p>

      <div className="card-actions">
        {item.downloadUrl ? (
          <a className="primary-action" href={item.downloadUrl}>
            Download for Windows <span aria-hidden="true">↓</span>
          </a>
        ) : (
          <span className="unavailable-action">
            {item.statusKind === "library" ? "No installer yet" : "Included"}
          </span>
        )}
        <a className="secondary-action" href={item.projectUrl} target="_blank" rel="noreferrer">
          Project <span aria-hidden="true">↗</span>
        </a>
        {item.releaseUrl && (
          <a className="release-action" href={item.releaseUrl} target="_blank" rel="noreferrer">
            Release notes
          </a>
        )}
      </div>
    </article>
  );
}

export default function App() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return storeItems.filter((item) => {
      const matchesCategory = activeFilter === "All" || item.category === activeFilter;
      const searchableText = [
        item.name,
        item.category,
        item.description,
        item.details,
        ...item.features
      ].join(" ").toLowerCase();
      return matchesCategory && (!query || searchableText.includes(query));
    });
  }, [search, activeFilter]);

  const downloadCount = storeItems.filter((item) => Boolean(item.downloadUrl)).length;

  return (
    <div className="store-page">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="SimVerse App Store home">
          <span className="brand-mark">S</span>
          <span className="brand-copy">
            <strong>SIMVERSE</strong>
            <small>APP STORE</small>
          </span>
        </a>
        <nav className="header-links" aria-label="Main navigation">
          <a href="#catalogue">Catalogue</a>
          <a href="#about">About</a>
          <a className="github-link" href="https://github.com/Minuan-org/minuan-app-store" target="_blank" rel="noreferrer">
            Source code <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> THE SIMVERSE COLLECTION</p>
            <h1>Find your next<br /><span>great idea.</span></h1>
            <p className="hero-description">
              Explore the tools and projects that help bring SimVerse to life.
              See what is ready to download, what is built in, and what is still being made.
            </p>
            <a className="hero-button" href="#catalogue">
              Explore the catalogue <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />
            <div className="planet planet-main"><span>S</span></div>
            <div className="planet planet-small" />
            <div className="spark spark-one">✦</div>
            <div className="spark spark-two">✧</div>
            <div className="spark spark-three">·</div>
            <div className="orbit-caption">EXPLORE · CREATE · SHARE</div>
          </div>
        </section>

        <section className="quick-facts" aria-label="Catalogue information">
          <div className="fact"><strong>{storeItems.length}</strong><span>Projects listed</span></div>
          <div className="fact"><strong>{downloadCount}</strong><span>Verified download</span></div>
          <div className="fact"><strong>Growing</strong><span>New ideas in progress</span></div>
        </section>

        <section id="catalogue" className="catalogue-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">DISCOVER</p>
              <h2>Explore the catalogue</h2>
              <p className="section-description">Search SimVerse projects or choose a type to narrow the list.</p>
            </div>
            <label className="search-box">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search projects..."
                aria-label="Search projects"
              />
              <kbd>/</kbd>
            </label>
          </div>

          <div className="filter-row" role="group" aria-label="Filter by project type">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={activeFilter === filter ? "filter-chip active" : "filter-chip"}
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter === "All" ? "All projects" : filter}
              </button>
            ))}
            <span className="result-count">
              {filteredItems.length} {filteredItems.length === 1 ? "result" : "results"}
            </span>
          </div>

          {filteredItems.length > 0 ? (
            <div className="app-grid">
              {filteredItems.map((item) => <StoreCard key={item.id} item={item} />)}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon" aria-hidden="true">⌕</div>
              <h3>No projects found</h3>
              <p>Try another search or choose a different filter.</p>
              <button
                type="button"
                className="secondary-button"
                onClick={() => {
                  setSearch("");
                  setActiveFilter("All");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        <section id="about" className="about-section">
          <div className="about-symbol" aria-hidden="true">✦</div>
          <div>
            <p className="eyebrow">A WORLD STILL GROWING</p>
            <h2>SimVerse starts with imagination.</h2>
            <p>
              This catalogue is an early collection. Some projects are ready to explore,
              while others are still being developed. We only show a download when a
              real release file is available.
            </p>
          </div>
          <a className="about-link" href="https://github.com/Minuan-org" target="_blank" rel="noreferrer">
            Explore Minuan organisation <span aria-hidden="true">↗</span>
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <a className="footer-brand" href="#top">SIMVERSE <span>APP STORE</span></a>
        <span>Built for exploring and creating.</span>
        <a href="https://github.com/Minuan-org/minuan-app-store">Open source project</a>
      </footer>
    </div>
  );
}

export const filters = [
  { value: "All", label: "All projects" },
  { value: "Browser", label: "Browser" },
  { value: "Developer tool", label: "Developer tool" },
  { value: "Included", label: "Included" }
];

export const storeItems = [
  {
    id: "minuan",
    name: "Minuan Browser",
    category: "Browser",
    version: "v1.0.1",
    status: "Windows download available",
    statusKind: "available",
    icon: "M",
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
    downloadUrl: "https://github.com/Minuan-org/Minuan/releases/download/v1.0.1/Minuan-Windows-x64.zip",
    downloadLabel: "Download for Windows"
  },
  {
    id: "sunay",
    name: "Sunay Rendering Library",
    category: "Developer tool",
    version: "v1.0.1",
    status: "Developer library · no installer",
    statusKind: "library",
    icon: "S",
    description: "The page-rendering library used inside Minuan. It connects Minuan's page view to Qt WebEngine and Chromium.",
    details: "Sunay is a library for developers, not a separate browser app. Its source code and documentation are available, but there is no ready-to-install app package.",
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
    icon: "✦",
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
    icon: "⌘",
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

export function filterStoreItems(searchText = "", category = "All") {
  const query = String(searchText).trim().toLowerCase();

  return storeItems.filter((item) => {
    const categoryMatches = category === "All" || item.category === category;
    const searchable = [
      item.name,
      item.category,
      item.description,
      item.details,
      ...item.features
    ].join(" ").toLowerCase();

    return categoryMatches && (!query || searchable.includes(query));
  });
}

export function getAvailableDownloads() {
  return storeItems.filter((item) => Boolean(item.downloadUrl));
}

import { filters, filterStoreItems, getAvailableDownloads, storeItems } from "./catalogue.js";

const elements = {
  filterRow: document.querySelector("#filter-row"),
  searchInput: document.querySelector("#project-search"),
  resultCount: document.querySelector("#result-count"),
  appGrid: document.querySelector("#app-grid"),
  emptyState: document.querySelector("#empty-state"),
  clearFilters: document.querySelector("#clear-filters"),
  projectCount: document.querySelector("#project-count"),
  downloadCount: document.querySelector("#download-count")
};

function makeElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function makeExternalLink(url, label, className) {
  const link = makeElement("a", className, label);
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  return link;
}

function createCard(item) {
  const card = makeElement("article", "app-card");

  const topLine = makeElement("div", "card-topline");
  const icon = makeElement("div", "app-icon app-icon-" + item.statusKind, item.icon);
  icon.setAttribute("aria-hidden", "true");
  const status = makeElement("span", "status-pill status-" + item.statusKind, item.status);
  topLine.append(icon, status);

  const heading = makeElement("div", "card-heading");
  const titleBlock = makeElement("div");
  titleBlock.append(
    makeElement("p", "category-label", item.category),
    makeElement("h3", "", item.name)
  );
  heading.append(titleBlock, makeElement("span", "version-label", item.version));

  const description = makeElement("p", "app-description", item.description);

  const featureList = makeElement("ul", "feature-list");
  for (const feature of item.features) {
    const listItem = makeElement("li");
    const check = makeElement("span", "feature-check", "✓");
    check.setAttribute("aria-hidden", "true");
    listItem.append(check, document.createTextNode(feature));
    featureList.append(listItem);
  }

  const details = makeElement("p", "app-details", item.details);
  const actions = makeElement("div", "card-actions");

  if (item.downloadUrl) {
    const download = makeExternalLink(
      item.downloadUrl,
      item.downloadLabel + " ↓",
      "primary-action"
    );
    actions.append(download);
  } else {
    actions.append(makeElement(
      "span",
      "unavailable-action",
      item.statusKind === "library" ? "No installer yet" : "Included"
    ));
  }

  actions.append(makeExternalLink(item.projectUrl, "Project ↗", "secondary-action"));
  if (item.releaseUrl) {
    actions.append(makeExternalLink(item.releaseUrl, "Release notes", "release-action"));
  }

  card.append(topLine, heading, description, featureList, details, actions);
  return card;
}

let activeFilter = "All";

function renderCatalogue() {
  const results = filterStoreItems(elements.searchInput.value, activeFilter);
  elements.appGrid.replaceChildren(...results.map(createCard));
  elements.resultCount.textContent =
    results.length + (results.length === 1 ? " result" : " results");
  elements.emptyState.hidden = results.length !== 0;
}

function createFilterButtons() {
  for (const filter of filters) {
    const button = makeElement(
      "button",
      filter.value === activeFilter ? "filter-chip active" : "filter-chip",
      filter.label
    );
    button.type = "button";
    button.setAttribute("aria-pressed", String(filter.value === activeFilter));
    button.addEventListener("click", () => {
      activeFilter = filter.value;
      for (const candidate of elements.filterRow.querySelectorAll("button")) {
        const selected = candidate.textContent === filter.label;
        candidate.classList.toggle("active", selected);
        candidate.setAttribute("aria-pressed", String(selected));
      }
      renderCatalogue();
    });
    elements.filterRow.append(button);
  }
}

function startStore() {
  const missing = Object.entries(elements)
    .filter(([, element]) => !element)
    .map(([name]) => name);

  if (missing.length > 0) {
    throw new Error("The App Store page is missing: " + missing.join(", "));
  }

  elements.projectCount.textContent = String(storeItems.length);
  elements.downloadCount.textContent = String(getAvailableDownloads().length);

  createFilterButtons();
  elements.searchInput.addEventListener("input", renderCatalogue);
  elements.clearFilters.addEventListener("click", () => {
    elements.searchInput.value = "";
    activeFilter = "All";
    for (const button of elements.filterRow.querySelectorAll("button")) {
      const selected = button.textContent === "All projects";
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    }
    renderCatalogue();
    elements.searchInput.focus();
  });

  renderCatalogue();
}

startStore();

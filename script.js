// =====================================
// PREHISTORIC COLLECTABLES
// MAIN JAVASCRIPT
// =====================================


// =====================================
// DATA
// =====================================

let dinosaurs = [];
let collectibles = [];
let brands = [];


// =====================================
// CURRENT MODE
// =====================================

let currentMode = "dinosaurs";


// =====================================
// SELECTED FILTERS
// =====================================

let selectedTypes = [];
let selectedPeriods = [];
let selectedBrands = [];


// =====================================
// ELEMENTS
// =====================================

const catalog =
  document.getElementById("catalog");

const searchInput =
  document.getElementById("searchInput");

const resultCount =
  document.getElementById("resultCount");


// =====================================
// MODE BUTTONS
// =====================================

const dinosaursMode =
  document.getElementById("dinosaursMode");

const collectiblesMode =
  document.getElementById("collectiblesMode");


// =====================================
// FILTER CONTROLS
// =====================================

const filtersToggle =
  document.getElementById("filtersToggle");

const filtersPanel =
  document.getElementById("filtersPanel");

const typeButton =
  document.getElementById("typeButton");

const periodButton =
  document.getElementById("periodButton");

const brandButton =
  document.getElementById("brandButton");


// =====================================
// FILTER CONTAINERS
// =====================================

const brandFilterContainer =
  document.getElementById(
    "brandFilterContainer"
  );
  const typeFilterContainer =
  document.getElementById(
    "typeFilterContainer"
  );


const periodFilterContainer =
  document.getElementById(
    "periodFilterContainer"
  );


// =====================================
// FILTER MENUS
// =====================================

const typeMenu =
  document.getElementById("typeMenu");

const periodMenu =
  document.getElementById("periodMenu");

const brandMenu =
  document.getElementById("brandMenu");


// =====================================
// LOAD DATA
// =====================================

async function loadData() {

  try {

    // ---------------------------------
    // LOAD DINOSAURS
    // ---------------------------------

    const dinosaursResponse =
      await fetch(
        "data/dinosaurs.json"
      );


    if (!dinosaursResponse.ok) {

      throw new Error(
        "Could not load dinosaurs.json"
      );

    }


    dinosaurs =
      await dinosaursResponse.json();


    // ---------------------------------
    // LOAD COLLECTIBLES
    // ---------------------------------

    try {

      const collectiblesResponse =
        await fetch(
          "data/collectibles.json"
        );


      if (collectiblesResponse.ok) {

        collectibles =
          await collectiblesResponse.json();

      }

      else {

        console.warn(
          "collectibles.json could not be loaded."
        );

        collectibles = [];

      }

    }

    catch (error) {

      console.warn(
        "collectibles.json has a problem:",
        error
      );

      collectibles = [];

    }


    // ---------------------------------
    // LOAD BRANDS
    // ---------------------------------

    try {

      const brandsResponse =
        await fetch(
          "data/brands.json"
        );


      if (brandsResponse.ok) {

        brands =
          await brandsResponse.json();

      }

      else {

        console.warn(
          "brands.json could not be loaded."
        );

        brands = [];

      }

    }

    catch (error) {

      console.warn(
        "brands.json has a problem:",
        error
      );

      brands = [];

    }


    // ---------------------------------
    // CREATE FILTERS
    // ---------------------------------

    createFilters();


    // ---------------------------------
    // SET INITIAL MODE
    // ---------------------------------

    switchMode(
      "dinosaurs"
    );

  }

  catch (error) {

    console.error(
      "Error loading catalog:",
      error
    );


    catalog.innerHTML = `

      <p>
        Could not load dinosaurs.
      </p>

    `;

  }

}


// =====================================
// CREATE FILTERS
// =====================================

function createFilters() {

  createTypeFilters();

  createPeriodFilters();

  createBrandFilters();

}


// =====================================
// TYPE FILTERS
// =====================================

function createTypeFilters() {

  const types = [

    ...new Set(

      [

        ...dinosaurs.map(
          dinosaur =>
            dinosaur.type
        ),

        ...collectibles.map(
          collectible =>
            collectible.type
        )

      ].filter(Boolean)

    )

  ];


  types.forEach(
    type => {

      createCheckbox(
        typeMenu,
        type,
        "type"
      );

    }
  );

}


// =====================================
// PERIOD FILTERS
// =====================================

function createPeriodFilters() {

  const periods = [

    ...new Set(

      [

        ...dinosaurs.map(
          dinosaur =>
            dinosaur.period
        ),

        ...collectibles.map(
          collectible =>
            collectible.period
        )

      ].filter(Boolean)

    )

  ];


  periods.forEach(
    period => {

      createCheckbox(
        periodMenu,
        period,
        "period"
      );

    }
  );

}


// =====================================
// BRAND FILTERS
// =====================================

function createBrandFilters() {

  brands.forEach(
    brand => {

      createCheckbox(
        brandMenu,
        brand,
        "brand"
      );

    }
  );

}


// =====================================
// CREATE CHECKBOX
// =====================================

function createCheckbox(
  menu,
  value,
  category
) {

  const label =
    document.createElement(
      "label"
    );


  label.className =
    "filter-option";


  const checkbox =
    document.createElement(
      "input"
    );


  checkbox.type =
    "checkbox";


  checkbox.value =
    value;


  checkbox.dataset.category =
    category;


  const text =
    document.createElement(
      "span"
    );


  text.textContent =
    value;


  label.appendChild(
    checkbox
  );


  label.appendChild(
    text
  );


  menu.appendChild(
    label
  );


  checkbox.addEventListener(
    "change",
    () => {

      updateSelection(
        category,
        value,
        checkbox.checked
      );

    }
  );

}


// =====================================
// UPDATE FILTER SELECTION
// =====================================

function updateSelection(
  category,
  value,
  checked
) {

  let selection;


  if (
    category === "type"
  ) {

    selection =
      selectedTypes;

  }

  else if (
    category === "period"
  ) {

    selection =
      selectedPeriods;

  }

  else {

    selection =
      selectedBrands;

  }


  if (checked) {

    if (
      !selection.includes(
        value
      )
    ) {

      selection.push(
        value
      );

    }

  }

  else {

    const index =
      selection.indexOf(
        value
      );


    if (
      index !== -1
    ) {

      selection.splice(
        index,
        1
      );

    }

  }


  updateButtonText();

  showCatalog();

}


// =====================================
// UPDATE FILTER BUTTON TEXT
// =====================================

function updateButtonText() {

  typeButton.innerHTML =
    getButtonText(
      selectedTypes,
      "All Types"
    ) +
    ' <span>▼</span>';


  periodButton.innerHTML =
    getButtonText(
      selectedPeriods,
      "All Periods"
    ) +
    ' <span>▼</span>';


  brandButton.innerHTML =
    getButtonText(
      selectedBrands,
      "All Brands"
    ) +
    ' <span>▼</span>';

}


// =====================================
// FILTER BUTTON TEXT
// =====================================

function getButtonText(
  selection,
  defaultText
) {

  if (
    selection.length === 0
  ) {

    return defaultText;

  }


  if (
    selection.length === 1
  ) {

    return selection[0];

  }


  return (
    selection.length +
    " selected"
  );

}


// =====================================
// SHOW CURRENT CATALOG
// =====================================

function showCatalog() {

  if (
    currentMode === "dinosaurs"
  ) {

    showDinosaurs();

  }

  else {

    showCollectibles();

  }

}


// =====================================
// SHOW DINOSAURS
// =====================================

function showDinosaurs() {

  const search =
    searchInput.value
      .toLowerCase()
      .trim();


  const filteredDinosaurs =
    dinosaurs.filter(
      dinosaur => {

        const name =
          dinosaur.name || "";


        const description =
          dinosaur.description || "";


        const matchesSearch =

          name
            .toLowerCase()
            .includes(search)

          ||

          description
            .toLowerCase()
            .includes(search);


        const matchesType =

          selectedTypes.length === 0

          ||

          selectedTypes.includes(
            dinosaur.type
          );


        const matchesPeriod =

          selectedPeriods.length === 0

          ||

          selectedPeriods.includes(
            dinosaur.period
          );


        return (

          matchesSearch
          &&
          matchesType
          &&
          matchesPeriod

        );

      }
    );


  // ---------------------------------
  // RESULT COUNT
  // ---------------------------------

  resultCount.textContent =

    filteredDinosaurs.length +
    " result" +
    (
      filteredDinosaurs.length === 1
        ? ""
        : "s"
    );


  // ---------------------------------
  // CLEAR CATALOG
  // ---------------------------------

  catalog.innerHTML = "";


  // ---------------------------------
  // CREATE CARDS
  // ---------------------------------

  filteredDinosaurs.forEach(
    dinosaur => {

      const card =
        createDinosaurCard(
          dinosaur
        );


      catalog.appendChild(
        card
      );

    }
  );

}


// =====================================
// CREATE DINOSAUR CARD
// =====================================

function createDinosaurCard(
  dinosaur
) {

  const card =
    document.createElement(
      "div"
    );


  card.className =
    "card";


  card.style.cursor =
    "pointer";


  card.addEventListener(
    "click",
    () => {

      window.location.href =
        "dinosaur.html?name=" +
        encodeURIComponent(
          dinosaur.name
        );

    }
  );


  // ---------------------------------
  // IMAGE
  // ---------------------------------

  let imageHTML;


  if (
    dinosaur.image &&
    dinosaur.image !== ""
  ) {

    imageHTML = `

      <img
        src="${dinosaur.image}"
        alt="${dinosaur.name}"
      >

    `;

  }

  else {

    imageHTML = `

      <div class="card-placeholder">
        🦖
      </div>

    `;

  }


  // ---------------------------------
  // CARD CONTENT
  // ---------------------------------

  card.innerHTML = `

    <div class="card-image">

      ${imageHTML}

    </div>


    <div class="card-body">


      <div class="card-meta">

        ${dinosaur.type || ""}

      </div>


      <h3>

        ${dinosaur.name || ""}

      </h3>


      <p>

        ${dinosaur.description || ""}

      </p>


      <div class="tags">


        ${
          dinosaur.period
            ? `
              <span class="tag">
                ${dinosaur.period}
              </span>
            `
            : ""
        }


        ${
          dinosaur.location
            ? `
              <span class="tag">
                ${dinosaur.location}
              </span>
            `
            : ""
        }


      </div>


    </div>

  `;


  return card;

}


// =====================================
// SHOW COLLECTIBLES
// =====================================

function showCollectibles() {

  const search =
    searchInput.value
      .toLowerCase()
      .trim();


  const filteredCollectibles =
    collectibles.filter(
      collectible => {

        const name =
          collectible.name || "";


        const species =
          collectible.species || "";


        const brand =
          collectible.brand || "";


        const description =
          collectible.description || "";


        const matchesSearch =

          name
            .toLowerCase()
            .includes(search)

          ||

          species
            .toLowerCase()
            .includes(search)

          ||

          brand
            .toLowerCase()
            .includes(search)

          ||

          description
            .toLowerCase()
            .includes(search);


        const matchesType =

          selectedTypes.length === 0

          ||

          selectedTypes.includes(
            collectible.type
          );


        const matchesPeriod =

          selectedPeriods.length === 0

          ||

          selectedPeriods.includes(
            collectible.period
          );


        const matchesBrand =

          selectedBrands.length === 0

          ||

          selectedBrands.includes(
            collectible.brand
          );


        return (

          matchesSearch
          &&
          matchesType
          &&
          matchesPeriod
          &&
          matchesBrand

        );

      }
    );


  // ---------------------------------
  // RESULT COUNT
  // ---------------------------------

  resultCount.textContent =

    filteredCollectibles.length +
    " collectible" +
    (
      filteredCollectibles.length === 1
        ? ""
        : "s"
    );


  // ---------------------------------
  // CLEAR CATALOG
  // ---------------------------------

  catalog.innerHTML = "";


  // ---------------------------------
  // CREATE CARDS
  // ---------------------------------

  filteredCollectibles.forEach(
    collectible => {

      const card =
        createCollectibleCard(
          collectible
        );


      catalog.appendChild(
        card
      );

    }
  );

}


// =====================================
// CREATE COLLECTIBLE CARD
// =====================================

function createCollectibleCard(
  collectible
) {

  const card =
    document.createElement(
      "div"
    );


  card.className =
    "card collectible-card";


  // ---------------------------------
  // IMAGE
  // ---------------------------------

  let imageHTML;


  if (
    collectible.image &&
    collectible.image !== ""
  ) {

    imageHTML = `

      <img
        src="${collectible.image}"
        alt="${collectible.name || ""} - ${collectible.brand || ""}"
      >

    `;

  }

  else {

    imageHTML = `

      <div class="card-placeholder">
        🦖
      </div>

    `;

  }


  // ---------------------------------
  // PRODUCT DETAILS
  // ---------------------------------

  let detailsHTML =
    "";


  if (
    collectible.price &&
    collectible.price !== ""
  ) {

    detailsHTML += `

      <span class="product-detail">
        ${collectible.price}
      </span>

    `;

  }


  if (
    collectible.scale &&
    collectible.scale !== ""
  ) {

    detailsHTML += `

      <span class="product-detail">
        ${collectible.scale}
      </span>

    `;

  }


  if (
    collectible.year &&
    collectible.year !== ""
  ) {

    detailsHTML += `

      <span class="product-detail">
        ${collectible.year}
      </span>

    `;

  }


  if (
    collectible.productNumber &&
    collectible.productNumber !== ""
  ) {

    detailsHTML += `

      <span class="product-detail">
        #${collectible.productNumber}
      </span>

    `;

  }


  // ---------------------------------
  // STORE LINKS
  // ---------------------------------

  let storesHTML =
    "";


  (
    collectible.stores || []
  ).forEach(
    store => {

      if (
        store.url &&
        !store.url.startsWith("YOUR_") &&
        !store.url.startsWith("TU_")
      ) {

        storesHTML += `

          <a
            href="${store.url}"
            target="_blank"
            rel="noopener noreferrer"
            onclick="event.stopPropagation()"
          >
            Shop on ${store.store}
          </a>

        `;

      }

    }
  );


  // ---------------------------------
  // NO STORE LINKS
  // ---------------------------------

  if (
    storesHTML === ""
  ) {

    storesHTML = `

      <span class="tag">
        Links coming soon
      </span>

    `;

  }


  // ---------------------------------
  // CARD CONTENT
  // ---------------------------------

  card.innerHTML = `

    <div class="card-image">

      ${imageHTML}

    </div>


    <div class="card-body">


      <div class="card-meta">

        ${collectible.brand || ""}

      </div>


      <h3>

        ${collectible.name || ""}

      </h3>


      <p class="collectible-species">

        ${collectible.species || ""}

      </p>


      ${
        detailsHTML
          ? `
            <div class="product-details">

              ${detailsHTML}

            </div>
          `
          : ""
      }


      ${
        collectible.description
          ? `
            <p>
              ${collectible.description}
            </p>
          `
          : ""
      }


      <div class="product-buttons">

        ${storesHTML}

      </div>


    </div>

  `;


  return card;

}


// =====================================
// SWITCH MODE
// =====================================

function switchMode(
  mode
) {

  currentMode =
    mode;


  if (
    mode === "dinosaurs"
  ) {

    dinosaursMode.classList.add(
      "active"
    );

    collectiblesMode.classList.remove(
      "active"
    );


    // Hide Brands

    brandFilterContainer.style.display =
      "none";
      // Show Type and Period

typeFilterContainer.style.display =
  "block";

periodFilterContainer.style.display =
  "block";


    // Clear brand selections

    selectedBrands = [];


    brandMenu
      .querySelectorAll(
        'input[type="checkbox"]'
      )
      .forEach(
        checkbox => {

          checkbox.checked =
            false;

        }
      );


    updateButtonText();

  }

  else {

    collectiblesMode.classList.add(
      "active"
    );

    dinosaursMode.classList.remove(
      "active"
    );


    // Show Brands

    brandFilterContainer.style.display =
      "block";
      // Hide Type and Period

typeFilterContainer.style.display =
  "none";

periodFilterContainer.style.display =
  "none";

  }


  showCatalog();
  

}



// =====================================
// MODE BUTTONS
// =====================================

dinosaursMode.addEventListener(
  "click",
  () => {

    switchMode(
      "dinosaurs"
    );

  }
);


collectiblesMode.addEventListener(
  "click",
  () => {

    switchMode(
      "collectibles"
    );

  }
);


// =====================================
// FILTER PANEL
// =====================================

filtersToggle.addEventListener(
  "click",
  event => {

    event.stopPropagation();


    const isOpen =
      filtersPanel.classList.toggle(
        "open"
      );


    filtersToggle.innerHTML =
      isOpen
        ? 'Filters <span>▲</span>'
        : 'Filters <span>▼</span>';

  }
);


// =====================================
// CLOSE FILTER MENUS
// =====================================

function closeAllMenus() {

  document
    .querySelectorAll(
      ".multi-filter.open"
    )
    .forEach(
      menu => {

        menu.classList.remove(
          "open"
        );

      }
    );

}


// =====================================
// SETUP FILTER BUTTON
// =====================================

function setupFilterButton(
  button
) {

  button.addEventListener(
    "click",
    event => {

      event.stopPropagation();


      const parent =
        button.parentElement;


      const wasOpen =
        parent.classList.contains(
          "open"
        );


      closeAllMenus();


      if (!wasOpen) {

        parent.classList.add(
          "open"
        );

      }

    }
  );

}


setupFilterButton(
  typeButton
);


setupFilterButton(
  periodButton
);


setupFilterButton(
  brandButton
);


// =====================================
// CLOSE MENUS WHEN CLICKING OUTSIDE
// =====================================

document.addEventListener(
  "click",
  () => {

    closeAllMenus();

  }
);


// =====================================
// ALL FILTER BUTTONS
// =====================================

document
  .querySelectorAll(
    ".filter-all"
  )
  .forEach(
    button => {

      button.addEventListener(
        "click",
        event => {

          event.stopPropagation();


          const category =
            button.dataset.filter;


          let menu;


          if (
            category === "type"
          ) {

            selectedTypes = [];

            menu =
              typeMenu;

          }

          else if (
            category === "period"
          ) {

            selectedPeriods = [];

            menu =
              periodMenu;

          }

          else {

            selectedBrands = [];

            menu =
              brandMenu;

          }


          menu
            .querySelectorAll(
              'input[type="checkbox"]'
            )
            .forEach(
              checkbox => {

                checkbox.checked =
                  false;

              }
            );


          updateButtonText();

          showCatalog();

        }
      );

    }
);


// =====================================
// SEARCH
// =====================================

searchInput.addEventListener(
  "input",
  showCatalog
);


// =====================================
// START
// =====================================

loadData();
/* =====================================
   PREHISTORIC BACKGROUND PARALLAX
   ===================================== */

let ticking = false;

function updateParallax() {

  const scrollY = window.scrollY;

  // El fondo se mueve más lentamente
  // que el contenido de la página.
const parallax = Math.min(
  scrollY * 0.18,
  180
);

  document.body.style.setProperty(
    "--parallax-y",
    `${parallax}px`
  );

  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {

    if (!ticking) {

      window.requestAnimationFrame(
        updateParallax
      );

      ticking = true;
    }

  },
  { passive: true }
);

updateParallax();
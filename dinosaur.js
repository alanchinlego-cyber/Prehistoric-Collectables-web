// =====================================
// PREHISTORIC COLLECTABLES
// DINOSAUR DETAIL PAGE
// =====================================


// =====================================
// PAGE ELEMENT
// =====================================

const page =
  document.getElementById(
    "dinosaurPage"
  );


// =====================================
// GET DINOSAUR NAME FROM URL
// =====================================

const params =
  new URLSearchParams(
    window.location.search
  );

const dinosaurName =
  params.get("name");


// =====================================
// LOAD DATA
// =====================================

async function loadDinosaur() {

  try {

    // =================================
    // LOAD DINOSAURS
    // =================================

    const dinosaursResponse =
      await fetch(
        "data/dinosaurs.json"
      );


    if (!dinosaursResponse.ok) {

      throw new Error(
        "Could not load dinosaurs.json"
      );

    }


    const dinosaurs =
      await dinosaursResponse.json();


    // =================================
    // LOAD COLLECTIBLES
    // =================================

    let collectibles = [];


    try {

      const collectiblesResponse =
        await fetch(
          "data/collectibles.json"
        );


      if (collectiblesResponse.ok) {

        collectibles =
          await collectiblesResponse.json();

      }

    }

    catch (error) {

      console.warn(
        "Could not load collectibles.json:",
        error
      );

    }


    // =================================
    // FIND DINOSAUR
    // =================================

    const dinosaur =
      dinosaurs.find(
        d =>
          d.name === dinosaurName
      );


    // =================================
    // DINOSAUR NOT FOUND
    // =================================

    if (!dinosaur) {

      page.innerHTML = `

        <div class="not-found">

          <h1>
            Dinosaur not found
          </h1>

          <p>
            We couldn't find that
            prehistoric creature.
          </p>

          <a
            href="index.html"
            class="explore-button"
          >
            ← Back to catalog
          </a>

        </div>

      `;

      return;

    }


    // =================================
    // DINOSAUR IMAGE
    // =================================

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

        <div class="detail-placeholder">
          🦖
        </div>

      `;

    }


    // =================================
    // FIND COLLECTIBLES
    // =================================

    const dinosaurCollectibles =
      collectibles.filter(
        collectible =>
          collectible.species ===
          dinosaur.name
      );


    // =================================
    // CREATE COLLECTIBLES
    // =================================

    let collectiblesHTML = "";


    dinosaurCollectibles.forEach(
      collectible => {


        // =============================
        // IMAGE
        // =============================

        let collectibleImageHTML;


        if (
          collectible.image &&
          collectible.image !== ""
        ) {

          collectibleImageHTML = `

            <img
              src="${collectible.image}"
              alt="${collectible.name} - ${collectible.brand}"
            >

          `;

        }

        else {

          collectibleImageHTML = `

            <div class="card-placeholder">
              🦖
            </div>

          `;

        }


        // =============================
        // PRODUCT DETAILS
        // =============================

        let detailsHTML = "";


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


        // =============================
        // STORES
        // =============================

        let storesHTML = "";


        (
          collectible.stores ||
          []
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
                  class="store-button"
                >
                  Shop on ${store.store}
                </a>

              `;

            }

          }
        );


        // =============================
        // NO STORES
        // =============================

        if (
          storesHTML === ""
        ) {

          storesHTML = `

            <p class="no-products">

              Links coming soon.

            </p>

          `;

        }


        // =============================
        // COLLECTIBLE
        // =============================

        collectiblesHTML += `

          <article
            class="detail-collectible"
          >

            <div
              class="detail-collectible-image"
            >

              ${collectibleImageHTML}

            </div>


            <div
              class="detail-collectible-info"
            >

              <p class="small-title">

                ${collectible.brand}

              </p>


              <h3>

                ${collectible.name}

              </h3>


              ${
                detailsHTML
                  ? `
                    <div class="product-details">
                      ${detailsHTML}
                    </div>
                  `
                  : ""
              }


              <p>

                ${collectible.description}

              </p>


              <div
                class="store-buttons"
              >

                ${storesHTML}

              </div>

            </div>

          </article>

        `;

      }
    );


    // =================================
    // NO COLLECTIBLES
    // =================================

    if (
      collectiblesHTML === ""
    ) {

      collectiblesHTML = `

        <div class="no-collectibles">

          <p class="no-products">

            No collectibles available yet.

          </p>

          <a
            href="index.html"
            class="explore-button"
          >
            Explore Collectibles
          </a>

        </div>

      `;

    }


    // =================================
    // SHOW PAGE
    // =================================

    page.innerHTML = `

      <div class="detail-container">


        <!-- BACK -->

        <a
          href="index.html#explore"
          class="back-button"
        >
          ← Back to catalog
        </a>


        <!-- COMPACT SPECIES HERO -->

        <section class="species-hero">


          <!-- INFORMATION -->

          <div class="species-hero-info">

            <p class="small-title">

              ${dinosaur.type}

            </p>


            <h1>

              ${dinosaur.name}

            </h1>


            <div class="species-line"></div>


            <p class="species-hero-description">

              ${dinosaur.description}

            </p>


            <div class="detail-tags">

              <span class="tag">
                ${dinosaur.period}
              </span>

              <span class="tag">
                ${dinosaur.location}
              </span>

            </div>

          </div>


          <!-- DINOSAUR -->

          <div class="species-hero-image">

            <div class="species-image-glow"></div>

            ${imageHTML}

          </div>


        </section>


        <!-- COLLECTIBLES -->

        <section
          class="products-section"
        >

          <div class="products-heading">

            <div>

              <p class="small-title">

                COLLECTIBLES

              </p>


              <h2>

                ${dinosaur.name}
                collectibles

              </h2>

            </div>

          </div>


          <div
            class="detail-collectibles"
          >

            ${collectiblesHTML}

          </div>


        </section>


      </div>

    `;

  }


  // ===================================
  // ERROR
  // ===================================

  catch (error) {

    console.error(
      "Error loading dinosaur:",
      error
    );


    page.innerHTML = `

      <div class="not-found">

        <h1>
          Something went wrong.
        </h1>

        <p>
          We couldn't load this
          prehistoric creature.
        </p>

        <a
          href="index.html"
          class="explore-button"
        >
          ← Back to catalog
        </a>

      </div>

    `;

  }

}


// =====================================
// START
// =====================================

loadDinosaur();
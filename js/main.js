(() => {

  //variables
  
  const model = document.querySelector("#model"),
    hotspots = document.querySelectorAll(".Hotspot"),
    materialTemplate = document.querySelector("#material-template"),
    materialList = document.querySelector("#material-list"),
    spinnerCon = document.querySelector("#spinner-con"),
    spinner = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#070C36"
     stroke="#070C36" stroke-width="15" r="15" cx="40" cy="100"><animate attributeName="opacity" 
     calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" 
     begin="-.4"></animate></circle><circle fill="#070C36" stroke="#070C36" stroke-width="15" r="15" cx="100" 
     cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" 
     repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#070C36" stroke="#070C36" stroke-width="15" r="15" 
     cx="160" cy="100"><animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" 
     repeatCount="indefinite" begin="0"></animate></circle></svg>`;


  //functions
  function modelLoaded() {
    hotspots.forEach(hotspot => {
      hotspot.style.display = "block";
    });
  }

  function showSpinner() {
    spinnerCon.innerHTML = spinner;
  }

  function hideSpinner() {
    spinnerCon.innerHTML = "";
    spinnerCon.style.display = "none";
  }

  function loadInfo() {
    showSpinner();
    fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then(response => response.json())
      .then(infoboxes => {

        infoboxes.forEach((infoBox, index) => {
          let selected = document.querySelector(`#hotspot-${index + 1}`);

          let heading = document.createElement('h2');
          heading.textContent = infoBox.heading;

          let description = document.createElement('p');
          description.textContent = infoBox.description;
          let img = document.createElement('img');
          img.src = `images/${infoBox.thumbnail}`;

          selected.appendChild(heading);
          selected.appendChild(description);
          selected.appendChild(img);
        })
        hideSpinner();
      })
      .catch(error => {
        console.error(error);
        alert("Failed to load data, please try again later.");
      });
  }
  loadInfo();

  function loadMaterialInfo() {
    fetch("https://swiftpixel.com/earbud/api/materials")
      .then(response => response.json())
      .then(materials => {

        materials.forEach(material => {

          const clone = materialTemplate.content.cloneNode(true);

          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = material.heading;

          const materialDescription = clone.querySelector(".material-description");
          materialDescription.textContent = material.description;

          materialList.appendChild(clone);
        });
      })
      .catch(error => {
        console.error(error);
        alert("Failed to load data, please try again later.");
      });
  }

  loadMaterialInfo();

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners
  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

})();


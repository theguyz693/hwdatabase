let editingIndex = -1;

document.getElementById("carForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("carName").value.trim();
  const value = document.getElementById("carValue").value.trim();
  const image = document.getElementById("carImage").value.trim();
  const wiki = document.getElementById("wikiLink").value.trim();
  const market = document.getElementById("marketLink").value.trim();
  const error = document.getElementById("errorMsg");

  if (!name) {
    error.textContent = "Car name is required!";
    return;
  }

  error.textContent = "";

  const car = { name, value, image, wiki, market };

  if (editingIndex > -1) {
    updateCar(editingIndex, car);
    editingIndex = -1;
    document.getElementById("submitButton").textContent = "Add to Collection";
  } else {
    addCarToCollection(car);
  }

  this.reset();
});

function addCarToCollection(car) {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img src="${car.image || 'https://via.placeholder.com/260x160?text=No+Image'}" alt="${car.name}" />
    <h3>${car.name}</h3>
    <p>Value: ${car.value || 'Unknown'}</p>
    ${car.market ? `<a href="${car.market}" target="_blank">Buy/Marketplace</a>` : ''}
    ${car.wiki ? `<a href="${car.wiki}" target="_blank">Wiki Info</a>` : ''}
    <button class="delete">Delete</button>
    <button class="edit">Edit</button>
    ${car.wiki ? `<button class="info">ℹ️</button>` : ''}
  `;

  document.getElementById("collection").appendChild(card);

  card.querySelector(".delete").addEventListener("click", () => card.remove());

  card.querySelector(".edit").addEventListener("click", () => {
    if (editingIndex !== -1) {
      alert("Finish editing the current item first.");
      return;
    }
    const form = document.getElementById("carForm");
    document.getElementById("carName").value = car.name;
    document.getElementById("carValue").value = car.value;
    document.getElementById("carImage").value = car.image;
    document.getElementById("wikiLink").value = car.wiki;
    document.getElementById("marketLink").value = car.market;

    editingIndex = Array.from(card.parentElement.children).indexOf(card);
    document.getElementById("submitButton").textContent = "Finish Edit";
  });

  const infoBtn = card.querySelector(".info");
  if (infoBtn) {
    infoBtn.addEventListener("click", () => {
      window.open(car.wiki, "_blank");
    });
  }
}

function updateCar(index, car) {
  const collection = document.getElementById("collection");
  const card = collection.children[index];

  card.innerHTML = `
    <img src="${car.image || 'https://via.placeholder.com/260x160?text=No+Image'}" alt="${car.name}" />
    <h3>${car.name}</h3>
    <p>Value: ${car.value || 'Unknown'}</p>
    ${car.market ? `<a href="${car.market}" target="_blank">Buy/Marketplace</a>` : ''}
    ${car.wiki ? `<a href="${car.wiki}" target="_blank">Wiki Info</a>` : ''}
    <button class="delete">Delete</button>
    <button class="edit">Edit</button>
    ${car.wiki ? `<button class="info">ℹ️</button>` : ''}
  `;

  card.querySelector(".delete").addEventListener("click", () => card.remove());

  card.querySelector(".edit").addEventListener("click", () => {
    if (editingIndex !== -1) {
      alert("Finish editing the current item first.");
      return;
    }
    document.getElementById("carName").value = car.name;
    document.getElementById("carValue").value = car.value;
    document.getElementById("carImage").value = car.image;
    document.getElementById("wikiLink").value = car.wiki;
    document.getElementById("marketLink").value = car.market;
    editingIndex = index;
    document.getElementById("submitButton").textContent = "Finish Edit";
  });

  const infoBtn = card.querySelector(".info");
  if (infoBtn) {
    infoBtn.addEventListener("click", () => {
      window.open(car.wiki, "_blank");
    });
  }
}


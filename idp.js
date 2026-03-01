document.addEventListener("DOMContentLoaded", () => {
  rooms = document.getElementById("rooms-opt");
  sqr_price = document.getElementById("sqft-inpt");
  quality = document.getElementById("quality-opt");
  est_cost = document.getElementById("total-price");
  whats_btn = document.getElementById("whatsapp-btn");

  const baseRates = {
    living: 800,
    kitchen: 1500,
    bedroom: 1000,
    bathroom: 1800,
  };

  const qualityMultipliers = {
    standard: 1.0,
    premium: 1.3,
    luxury: 1.8,
  };

  function calculateTotal() {
    const sltRoom = rooms.value;
    const roomSqft = Number(sqr_price.value);
    const roomQlt = document.querySelector(
      'input[name="quality"]:checked',
    ).value;

    if (roomSqft === 0 || isNaN(roomSqft)) {
      est_cost.textContent = "₹0";
      return;
    }

    const roomPrice = baseRates[sltRoom];
    const multiplier = qualityMultipliers[roomQlt];

    const totalCost = roomPrice * roomSqft * multiplier;
    est_cost.textContent = "₹" + Math.round(totalCost).toLocaleString("en-IN");

    localStorage.setItem("savedRoom", sltRoom);
    localStorage.setItem("savedSqft", roomSqft);
    localStorage.setItem("savedQlt", roomQlt);
  }

  function restoreData() {
    const currrentRoom = localStorage.getItem("savedRoom");
    const currentSqft = localStorage.getItem("savedSqft");
    const currentQlt = localStorage.getItem("savedQlt");

    if (currrentRoom) {
      rooms.value = currrentRoom;
    }

    if (currentSqft) {
      sqr_price.value = currentSqft;
    }

    if (currentQlt) {
      const radioSlt = document.querySelector(
        `input[name="quality"][value="${currentQlt}"]`,
      );
      if (radioSlt) {
        radioSlt.checked = true;
      }
    }

    if (currrentRoom && currentSqft) {
      calculateTotal();
    }
  }
  restoreData();

  rooms.addEventListener("change", calculateTotal);
  sqr_price.addEventListener("input", calculateTotal);

  const qualityRadio = document.querySelectorAll(`input[name="quality"]`);
  qualityRadio.forEach((radio) => {
    radio.addEventListener("change", calculateTotal);
  });

  whats_btn.addEventListener("click", (event) => {
    event.preventDefault();
    const roomType = rooms.value;
    const roomDim = sqr_price.value;
    const roomQualty = document.querySelector(
      'input[name="quality"]:checked',
    ).value;

    const curEst = est_cost.textContent;

    if (roomDim === 0 || isNaN(roomDim) || curEst === 0) {
      alert("Please enter the square footage to get the estimate first");
      return;
    }

    const customMsg = `Hello!I used your Interior Design Estimator and I'm interested in project.
  Here are my details:
  * Room: ${roomType}
  * Size: ${roomDim} sq ft
  * Quality: ${roomQualty}
  
  Can we schedule a quick call to discuss a detailed breakdown?
  `;

    const encodedMsg = encodeURIComponent(customMsg);

    const phNo = "917892729670";

    const whatsappUrl = `https://wa.me/${phNo}?text=${encodedMsg}`;
    window.open(whatsappUrl, "_blank");
  });
});

const IP_ADDRESS = 'localhost';

document.addEventListener("DOMContentLoaded", function () {
  const registrationForm = document.getElementById("registration-form");
  const searchTransmileni = document.getElementById("transmilenio-form");
  const removalForm = document.getElementById("removal-form");

  function fetchCarsList() {
    console.log('3');
    fetch(`http://${IP_ADDRESS}:3000/transmilenio`)
      .then((response) => response.json())
      .then((data) => {
        const carsTableBody = document.getElementById("transmilenio-table-body");
        carsTableBody.innerHTML = "";
        data.forEach((transmilenio) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                <td>${transmilenio.license_plate}</td>
                <td>${transmilenio.timestamp}</td>
                <td>${transmilenio.editing}</td>
            `;
          carsTableBody.appendChild(row);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while fetching the car list. Please try again.");
      });
  }
  function fetchCarsList() {
    console.log('3');
    fetch(`http://${IP_ADDRESS}:3000/transmilenio`)
      .then((response) => response.json())
      .then((data) => {
        const carsTableBody = document.getElementById("transmilenio-table-body");
        carsTableBody.innerHTML = "";
        data.forEach((transmilenio) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                <td>${transmilenio.license_plate}</td>
                <td>${transmilenio.timestamp}</td>
                <td>${transmilenio.editing}</td>
            `;
          carsTableBody.appendChild(row);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while fetching the car list. Please try again.");
      });
  }

  fetchCarsList();

  searchTransmileni.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(searchTransmileni);
    const licensePlate = formData.get("license-plate");

    fetch(`http://${IP_ADDRESS}:3000/transmilenio/${licensePlate}`)
      .then((response) => response.json())
      .then((transmilenio) => {
        const searchTransmi = document.getElementById("transmilenio-search");
        searchTransmi.innerHTML = "";
        if (transmilenio) {
          const row = document.createElement("tr");
          row.innerHTML = `
                <td>${transmilenio.license_plate}</td>
                <td>${transmilenio.timestamp}</td>
                <td>${transmilenio.editing}</td>
            `;
          searchTransmi.appendChild(row);
        } else {
          searchTransmileni.reset();
          alert("Transmilenio no encontrado");
        }
      })
      .catch((error) => {
        const searchTransmi = document.getElementById("transmilenio-search");
        searchTransmi.innerHTML = "";
        alert("Transmilenio no encontrado");
      });
  });


  registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(registrationForm);
    const requestData = {
      license_plate: formData.get("placa"),
    };
    fetch(`http://${IP_ADDRESS}:3000/transmilenio`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.text())
      .then((data) => {
        if(data.includes('Car updated successfully')){
        alert(data);}
        registrationForm.reset();
        fetchCarsList();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
  });

  removalForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(removalForm);
    const licensePlate = formData.get("license-plate");

    fetch(`http://${IP_ADDRESS}:3000/transmilenio`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ license_plate: licensePlate }),
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data);
        fetchCarsList();
        removalForm.reset();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while removing the car. Please try again.");
      });
  });
});

// This is main function this function call Search button index.html
function searchMobile() {
  // search button click spnner display show
  document.getElementById("spenner").style.display = "block";
  const searchFild = document.getElementById("search-fild");
  const searchText = searchFild.value;
  if (searchText == "") {
    document.getElementById("spenner").style.display = "none";
    document.getElementById("noresult").innerText = "Empty Input Value";
    const allSearch = document.getElementById("all-Search");
    const phoneDetails = document.getElementById("phone-details");
    allSearch.innerHTML = "";
    phoneDetails.innerHTML = "";
  } else {
    document.getElementById("noresult").innerText = "Search The Mobile";
    searchFild.value = "";

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => displayUser(data));
  }
}

// this is  all search mobile display function
const displayUser = (data) => {
  const searchMobile = document.getElementById("all-Search");
  searchMobile.innerHTML = "";
  //   console.log(data);
  if (data.data.length === 0) {
    document.getElementById("spenner").style.display = "none";
    // console.log("No Result Found");
    document.getElementById("phone-details").innerHTML = `
    <h1 class="text-center">Phone Not Found</h1>
    `;
  } else {
    document.getElementById("phone-details").innerHTML = "";

    data.data.forEach((mobile, index) => {
      // if mobile show spenner hide
      document.getElementById("spenner").style.display = "none";
      //   console.log(mobile);
      const div = document.createElement("div");

      div.innerHTML = `
    <div class="card my-2">
  <div class="card-body mx-auto text-center">
     <img src="${mobile.image}"></img>
    <h1 class="title">${mobile.brand}</h1>
    <h3>${mobile.phone_name}</h3>
  
    <button type="button" onclick="detailsPhone('${mobile.slug}')" class="btn btn-success my-2">Details The Phone</button>
  </div>
</div>
    `;
      if (index < 20) {
        searchMobile.appendChild(div);
      }
    });
  }
};

const detailsPhone = (mobileDetails) => {
  //   console.log(mobileDetails);

  const url = `https://openapi.programming-hero.com/api/phone/${mobileDetails}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayDetails(data));
};

// this is single mobile display fumction
const displayDetails = (detailsData) => {
  const phoneDetails = document.getElementById("phone-details");
  // console.log(detailsData.data);
  // console.log(detailsData.data.mainFeatures.storage);
  // get sensors value for map Method
  const sensors = detailsData.data.mainFeatures.sensors.map((value) => value);
  if (detailsData.data.releaseDate) {
    phoneDetails.innerHTML = `
      <div class="card my-2">
  <div class="card-body mx-auto ">
     <img src="${detailsData.data.image}"></img>
    <h1>${detailsData.data.brand}</h1>
    <p>${detailsData.data.releaseDate}</p>
    <h4>Brand: ${detailsData.data.name}</h4>
    <h4>Storage: ${detailsData.data.mainFeatures.storage}</h4>
    <h4>DisplaySize: ${detailsData.data.mainFeatures.displaySize}</h4>
  
   <h4>Sensors: ${sensors}</h4>
    
    <h4>Bluetooth: ${detailsData.data.others.WLAN}</h4>
    <h4>Bluetooth: ${detailsData.data.others.Bluetooth}</h4>
    
  </div>
</div>
  `;
  } else {
    phoneDetails.innerHTML = `
      <div class="card my-2">
  <div class="card-body mx-auto ">
     <img src="${detailsData.data.image}"></img>
     <h1>${detailsData.data.name}</h1>
    <p>No Release Date Found</p>
    <h4>Brand: ${detailsData.data.name}</h4>
    <h4>Storage: ${detailsData.data.mainFeatures.storage}</h4>
    <h4>DisplaySize: ${detailsData.data.mainFeatures.displaySize}</h4>
    
    <h4>Sensors: ${sensors}</h4>
    
    <h4>Bluetooth: ${detailsData.data.others.WLAN}</h4>
    <h4>Bluetooth: ${detailsData.data.others.Bluetooth}</h4>
    
    
  </div>
</div>
  `;
  }
};

// Enter Button Click search value show
const searchFild = document.getElementById("search-fild");
searchFild.addEventListener("keypress", function (event) {
  if (event.keyCode == 13) {
    document.getElementById("button").click();
  }
});

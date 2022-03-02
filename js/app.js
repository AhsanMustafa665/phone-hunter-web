document.getElementById('error-message').style.display = 'none';


const searchButton = () => {
    const searchFeild = document.getElementById('search-feild')
    const searchText = searchFeild.value;
    // console.log(searchText);

    // clear data
    searchFeild.value = ""
    document.getElementById('error-message').style.display = 'none';
    const errorMessage2 = document.getElementById('error-message2')

    //  the error message show,when you search feild no writting
    if (searchText == '') {
        errorMessage2.innerText = "Please write something!"

    }

    // load data
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        // console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => ShowSearchResult(data.data))
            .catch(error => displayError(error))
        errorMessage2.innerText = ''
    }
}
const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}
const ShowSearchResult = (data) => {
    // console.log(data);
    const searchResult = document.getElementById('search-result')
    const errorMessage2 = document.getElementById('error-message2')

    // the error message show,when you written phone is not available here
    if (data.length == 0) {
        errorMessage2.innerText = "Sorry, the phone you searcher for watch not found!"
    }
    const first20data = data.slice(0, 20);

    // clear info(image and others)
    searchResult.textContent = ''
    first20data.forEach(byte => {
        // console.log(byte);
        const div = document.createElement('div')
        div.classList.add('col');
        div.innerHTML = `
        <div class="card w-75 h-100 bg-dark round ">
            <img class="w-100 round2" src="${byte.image}" class="card-img-top" alt="...">
            <div id="search-result" class="card-body px-4 py-4 ">
                <h3 class="card-title text-primary">Phone Name : ${byte.phone_name}</h3>
                <h4 class="text-info pt-2">Phone Brand : ${byte.brand}</h4>
                <button onclick="loadPhoneDetail('${byte.slug}')" href="#" class="btn btn-primary text-text-center mt-3 mx-5">More Explore</buttonhref=>
        </div>
            
      </div>`;
        searchResult.appendChild(div)
    })
}
const loadPhoneDetail = (phoneSlug) => {
    // console.log(phoneSlug);
    const url = `https://openapi.programming-hero.com/api/phone/${phoneSlug}`
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => showPhoneDetail(data.data))
}

const showPhoneDetail = (info) => {
    // console.log(info);
    const phoneDetails = document.getElementById('phone-details')
    phoneDetails.textContent = '';
    const div = document.createElement('div')
    div.classList.add('card');
    if (info.releaseDate == 0) {
        alert("This phone will be released soon.")
    }
    div.innerHTML = `
    <div class="card w-100  round ">
    <img src="${info.image}" class="card-img-top" alt="...">
        <div class="card-body details-bg my-3 ">
          <h4 class="card-title mb-4 text-primary">Release Date : ${info.releaseDate}</h4>
          <p><span class="fw-bold fst-italic ">Storage :</span> ${info.mainFeatures.storage}</p>
          <p><span class="fw-bold fst-italic">Display-size :</span> ${info.mainFeatures.displaySize}</p>
          <p><span class="fw-bold fst-italic">Chipset :</span> ${info.mainFeatures.chipSet}</p>
          <p><span class="fw-bold fst-italic">Memory :</span> ${info.mainFeatures.memory}</p>
          <p><span class="fw-bold fst-italic">Sensors :</span> ${info.mainFeatures.sensors[0]}</p>
          <p><span class="fw-bold fst-italic">WLAN :</span> ${info.others.WLAN}</p>
          <p><span class="fw-bold fst-italic">Bluetooth :</span> ${info.others.Bluetooth}</p>
          <p><span class="fw-bold fst-italic">GPS :</span> ${info.others.GPS}</p>
          <p><span class="fw-bold fst-italic">NFC :</span> ${info.others.NFC}</p>
          <p><span class="fw-bold fst-italic">Radio :</span> ${info.others.Radio}</p>
          <p><span class="fw-bold fst-italic">USB :</span> ${info.others.USB}</p>
          
        </div>
        </div>
    `;
    phoneDetails.appendChild(div)
}

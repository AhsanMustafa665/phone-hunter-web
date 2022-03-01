const searchButton = () => {
    const searchFeild = document.getElementById('search-feild')
    const searchText = searchFeild.value;
    // console.log(searchText);
    // searchFeild.value = ""

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => ShowSearchResult(data.data))
}
const ShowSearchResult = (data) => {
    // console.log(data);
    const searchResult = document.getElementById('search-result')
    data.forEach(byte => {
        // console.log(byte);
        const div = document.createElement('div')
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadPhoneDetail('${byte.slug}')" class="card w-75 h-100 bg-dark round ">
            <img class="w-100 round2" src="${byte.image}" class="card-img-top" alt="...">
            <div id="search-result" class="card-body px-4 py-4 ">
                <h3 class="card-title text-primary">Phone Name : ${byte.phone_name}</h3>
                <h4 class="text-info pt-2">Phone Brand : ${byte.brand}</h4>
            </div>
      </div>`;
        searchResult.appendChild(div)
    })
}

const loadPhoneDetail = (phoneSlug) => {
    // console.log(phoneSlug);
    const url = `https://openapi.programming-hero.com/api/phone/oppo_find_x5_pro-11236`
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data))
}
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

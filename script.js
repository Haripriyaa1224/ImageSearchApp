document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.querySelector(".search-results");
  const showMoreButton = document.getElementById("show-more-button");

  let currentPage = 1;

  form.addEventListener("submit", function (event) {
      event.preventDefault();

      const query = searchInput.value.trim();
      if (query !== "") {
          currentPage = 1; 
          searchImages(query, currentPage);
      }
  });

  showMoreButton.addEventListener("click", function () {
      currentPage++;
      const query = searchInput.value.trim();
      if (query !== "") {
          searchImages(query, currentPage);
      }
  });

  async function searchImages(query, page) {
      const accessKey = "wqs0t_nyXJ26sPT3A0s3WoT1mkobhYRTtrfyHT4YLBA";
      const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}&page=${page}`;

      try {
          const response = await fetch(apiUrl);
          const data = await response.json();

          if (data.results.length === 0) {
              showMoreButton.style.display = "none";
              return;
          }

          displayResults(data.results);
      } catch (error) {
          console.error("Error fetching images:", error);
      }
  }

  function displayResults(results) {
      if (currentPage === 1) {
          searchResults.innerHTML = ""; 
      }

      if (results.length === 0) {
          searchResults.innerHTML = "<p>No results found</p>";
          showMoreButton.style.display = "none";
      } else {
          results.forEach((result) => {
              const imgElement = document.createElement("img");
              imgElement.src = result.urls.small;
              imgElement.alt = result.alt_description;

              const linkElement = document.createElement("a");
              linkElement.href = result.urls.full;
              linkElement.target = "_blank";
              linkElement.appendChild(imgElement);

              const resultItem = document.createElement("div");
              resultItem.classList.add("result-item");
              resultItem.appendChild(linkElement);

              searchResults.appendChild(resultItem);
          });

          showMoreButton.style.display = "block";
      }
  }
});

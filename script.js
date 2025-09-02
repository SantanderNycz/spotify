const searchInput = document.getElementById("search-input");
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById("result-playlists");
const gridContainer = document.querySelector(".grid-container");
let searchTimeout; // Variável para o debounce

// Dados mockados de artistas
const mockArtists = [
  {
    id: 1,
    name: "Foo Fighters",
    urlImg:
      "https://i.iheart.com/v3/surl/aHR0cDovL2ltYWdlLmloZWFydC5jb20vaW1hZ2VzL3JvdmkvMTA4MC8wMDA1Lzg3My9NSTAwMDU4NzMzMjguanBn?ops=fit%28480%2C480%29%2Crun%28%22circle%22%29&sn=eGtleWJhc2UyMDIxMTExMDrsBnpaNm9NlTCYNnTmdDE5_RZfbhvbhWl8vWtwTs0Tdg%3D%3D&surrogate=1cOXl179JY-syhxYSCX6Q1a_Mcu6UO8d-F4oJzpZf1hcUbJr4aIixtMBEVetygNP21Km16ujZqsmYbkC-XY8VM1_kEvWF67ikO5yQWJ9yygelksPkRKqgZi_uSOlB0Qn3bBSGYXn2_zqb1oHebbIYIEtCJR-REOZIJn4_cTJu9JhJ3_yOm07YKlAtfMaVOq7bO2rVuSqoZVHOCHWjDWQIRYqD04%3D",
    genre: "Rock",
  },
  {
    id: 2,
    name: "Queen",
    urlImg:
      "https://i.discogs.com/XztqBh9zPrHpafbPSTRKrSwvTTVZ1JzOhy0I-tyTWo0/rs:fit/g:sm/q:90/h:600/w:595/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTgxMDEz/LTEyMTE5Nzg2NTku/anBlZw.jpeg",
    genre: "Rock",
  },
  {
    id: 3,
    name: "Coldplay",
    urlImg: "https://i.scdn.co/image/ab6761610000e5eb1ba8fc5f5c73e7e9313cc6eb",
    genre: "Pop",
  },
  {
    id: 4,
    name: "Bemvirá",
    urlImg: "https://i.scdn.co/image/ab6761610000e5ebb2746a70dc7b456493cf2f77",
    genre: "Indie Rock",
  },
];

function requestApi(searchTerm) {
  // Simulando uma API local com os dados mockados
  const filteredArtists = mockArtists.filter((artist) =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Quando tiver um backend, descomentar este código:
  /*
  const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => displayResults(result))
    .catch(() => {
      displayResults([]); // Mostra estado vazio se der erro
    });
  */

  displayResults(filteredArtists);
}

function displayResults(results) {
  gridContainer.innerHTML = ""; // Limpa resultados anteriores

  // Remove a mensagem de "Nenhum resultado" se existir
  const noResultsMsg = document.getElementById("no-results-message");
  if (noResultsMsg) noResultsMsg.remove();

  if (!results || results.length === 0) {
    // Esconde as playlists e mostra a área de artistas (com mensagem)
    resultPlaylist.classList.add("hidden");
    resultArtist.classList.remove("hidden");

    // Mostra mensagem de nenhum resultado encontrado
    const message = document.createElement("div");
    message.id = "no-results-message";
    message.textContent = "Nenhum artista encontrado";
    message.style.color = "#fff";
    message.style.textAlign = "center";
    message.style.marginTop = "40px";
    message.style.fontSize = "18px";
    message.style.width = "100%";
    gridContainer.appendChild(message);
    return;
  }

  // Cria cards para cada artista encontrado
  results.forEach((artist) => {
    const artistCard = document.createElement("div");
    artistCard.className = "artist-card";
    artistCard.innerHTML = `
      <div class="card-img">
        <img src="${artist.urlImg}" alt="${artist.name}" class="artist-img">
        <div class="play">
          <span class="fa fa-solid fa-play"></span>
        </div>
      </div>
      <div class="card-text">
        <span class="artist-name">${artist.name}</span>
        <span class="artist-categorie">${artist.genre || "Artista"}</span>
      </div>
    `;
    gridContainer.appendChild(artistCard);
  });

  // Mostra resultados e esconde playlists
  resultPlaylist.classList.add("hidden");
  resultArtist.classList.remove("hidden");
}

// Debounce para evitar muitas requisições enquanto digita
searchInput.addEventListener("input", function () {
  clearTimeout(searchTimeout);
  const searchTerm = searchInput.value.trim();

  searchTimeout = setTimeout(() => {
    if (searchTerm === "") {
      // Limpa completamente os resultados anteriores
      gridContainer.innerHTML = "";

      // Remove qualquer mensagem de "Nenhum resultado"
      const noResultsMsg = document.getElementById("no-results-message");
      if (noResultsMsg) noResultsMsg.remove();

      // Mostra as playlists e esconde os resultados de artista
      resultPlaylist.classList.remove("hidden");
      resultArtist.classList.add("hidden");
      return;
    }
    requestApi(searchTerm);
  }, 300);
});

// Funcionalidade do menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    
    // Função para abrir/fechar sidebar
    function toggleSidebar() {
        sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('active');
        
        // Mudança do ícone
        const icon = mobileMenuBtn.querySelector('i');
        if (sidebar.classList.contains('open')) {
            icon.className = 'fa fa-times';
        } else {
            icon.className = 'fa fa-bars';
        }
    }
    
    // Event listeners
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleSidebar);
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', toggleSidebar);
    }
    
    // Fechar sidebar ao clicar em links (mobile)
    const sidebarLinks = sidebar.querySelectorAll('a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                toggleSidebar();
            }
        });
    });
    
    // Fechar sidebar ao redimensionar para desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.className = 'fa fa-bars';
        }
    });
});


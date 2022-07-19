const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImage = document.querySelector('.pokemon-image');

const formulario = document.querySelector('.formulario');

const input = document.querySelector('.input-search');
const botaoAnt = document.querySelector('.btn-ant');
const botaoProx = document.querySelector('.btn-prox');

let procurarPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = ' ';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        procurarPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Não encontrado!';
        pokemonNumber.innerHTML = '';
    }
}

formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value);
});

botaoAnt.addEventListener('click', () => {
    if (procurarPokemon > 1) {
        procurarPokemon -= 1;
        renderPokemon(procurarPokemon);
    }
});

botaoProx.addEventListener('click', () => {
    procurarPokemon += 1;
    renderPokemon(procurarPokemon);
});

renderPokemon(procurarPokemon);



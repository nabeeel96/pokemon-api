export const fetchCategories = async () => {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/type/");
        if (!response.ok) {
            throw new Error("Failed to fetch categories");
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

export const fetchPokemonsByCategories = async (categoryNames) => {
    try {
        const promises = categoryNames.map(async (categoryName) => {
            const response = await fetch(
                `https://pokeapi.co/api/v2/type/${categoryName}`
            );
            if (!response.ok) {
                throw new Error(`Failed to fetch pokemons for category ${categoryName}`);
            }
            return response.json();
        });
        const responses = await Promise.all(promises);
        const pokemons = responses.flatMap((response) => response.pokemon);
        return { pokemon: pokemons };
    } catch (error) {
        console.error("Error fetching pokemons by categories:", error);
        throw error;
    }
};


export async function fetchPokemonDetails(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch Pokémon details: ${name}`);
    }
    const data = await response.json();
    return data;
}

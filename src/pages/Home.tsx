import { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import PokemonCard from "../components/PokemonCard";

interface Pokemon {
  name: string;
  id: number;
  image: string;
  types: string[];
}

const Home = () => {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
        const data = await res.json();
        const promises = data.results.map(
          async (pokemon: { name: string; url: string }) => {
            const details = await fetch(pokemon.url).then((res) => res.json());
            return {
              name: details.name,
              id: details.id,
              image: details.sprites.front_default,
              types: details.types.map(
                (t: { type: { name: string } }) => t.type.name
              ),
            };
          }
        );
        const results = await Promise.all(promises);
        setAllPokemon(results);
      } catch {
        setError("Failed to load Pokémon.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const types = Array.from(new Set(allPokemon.flatMap((p) => p.types))).sort();

  const filtered = allPokemon.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (typeFilter ? p.types.includes(typeFilter) : true)
  );

  return (
    <>
      <Header />
      <SearchBar
        search={search}
        onSearchChange={setSearch}
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
        types={types}
      />
      <main className="container">
        {loading ? (
          <p className="text-center">Loading Pokémon...</p>
        ) : error ? (
          <p className="text-danger text-center">{error}</p>
        ) : filtered.length === 0 ? (
          <p className="text-center">No Pokémon found.</p>
        ) : (
          <div className="row">
            {filtered.map((p) => (
              <PokemonCard key={p.id} {...p} />
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default Home;

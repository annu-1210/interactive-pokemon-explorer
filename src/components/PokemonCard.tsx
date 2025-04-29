interface PokemonCardProps {
  name: string;
  image: string;
  types: string[];
  id: number;
}

const PokemonCard = ({ name, image, types, id }: PokemonCardProps) => (
  <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
    <div
      className="pokemon-card animate-fade-in d-flex flex-column"
      role="button"
    >
      <img
        src={image}
        className="card-img-top bg-light p-3 rounded-top"
        alt={`Pokemon ${name}`}
      />
      <div className="card-body text-center">
        <h5 className="card-title text-capitalize fw-semibold">{name}</h5>
        <p className="card-text text-muted">ID: #{id}</p>
        <div>
          {types.map((type) => (
            <span
              key={type}
              className="badge bg-gradient me-1 text-capitalize text-white"
              style={{
                background: "linear-gradient(to right, #6C5CE7, #00cec9)",
              }}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default PokemonCard;

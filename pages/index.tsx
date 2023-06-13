import type { NextPage } from "next";
import axios from "axios";
import { useQuery } from "react-query";
import styles from "../styles/Home.module.css";

interface Beer {
  id: number;
  name: string;
  tagline: string;
  description: string;
  abv: number;
}

const Home: NextPage = () => {
  const { data, isLoading, isError } = useQuery<Beer[]>("beers", fetchBeers);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className="text-red-600">Coucou les amis</h1>

      <div>
        <h2>Beers:</h2>
        <ul>
          {data?.map((beer) => (
            <li key={beer.id}>
              <h3>{beer.name}</h3>
              <p>{beer.tagline}</p>
              <p>{beer.description}</p>
              <p>ABV: {beer.abv}%</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const fetchBeers = async (): Promise<Beer[]> => {
  const response = await axios.get("https://api.punkapi.com/v2/beers");
  return response.data;
};

export default Home;

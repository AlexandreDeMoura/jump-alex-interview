import type { NextPage } from "next";
import axios from "axios";
import { useQuery } from "react-query";
import SearchIcon from "../public/icon-search.svg";
import LoadingIcon from "../public/icon-loading.gif";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/skeleton.module.css";
import RandomlyGeneratedBeerCard from "../components/RandomlyGeneratedBeerCard";

export interface Beer {
  id: number;
  name: string;
  image_url: string;
  description: string;
  first_brewed: string;
}

const Home: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, isError, isFetching } = useQuery<Beer[]>(
    ["beers", searchTerm],
    () => fetchBeers(searchTerm)
  );

  if (isError) {
    return <div>Nous n'avons pas réussi à charger la liste de bière.</div>;
  }

  return (
    <div className="w-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="flex space-x-4">
        <RandomlyGeneratedBeerCard key={1} id={1} />
        <RandomlyGeneratedBeerCard key={2} id={2} />
      </div>
      <div className="w-106 bg-white p-4 space-y-2">
        <div className="flex space-x-2 px-2 py-1 rounded-md border border-gray-500 focus-within:border-gray-700 focus-within:shadow-lg">
          <Image
            className="text-green-900"
            src={isLoading ? LoadingIcon : SearchIcon}
            width={20}
            height={20}
            alt="Picture of the author"
          />
          <input
            className="w-full focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ul className="space-y-2">
          {isLoading || isFetching ? (
            <>
              <li className={styles["skeleton-li"]} />
              <li className={styles["skeleton-li"]} />
              <li className={styles["skeleton-li"]} />
              <li className={styles["skeleton-li"]} />
              <li className={styles["skeleton-li"]} />
            </>
          ) : (
            data?.map((beer) => (
              <li
                className="flex justify-between items-center cursor-pointer rounded-md hover:bg-gray-100 px-2 py-1"
                key={beer.id}
              >
                <div className="text-gray-900 font-semibold">{beer.name}</div>
                <div className="text-gray-700">{beer.first_brewed}</div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

const fetchBeers = async (searchTerm: string): Promise<Beer[]> => {
  const searchTermParam = searchTerm
    ? {
        beer_name: searchTerm,
      }
    : {};
  const response = await axios.get("https://api.punkapi.com/v2/beers", {
    params: {
      per_page: 10,
      ...searchTermParam,
    },
  });
  return response.data;
};

export default Home;

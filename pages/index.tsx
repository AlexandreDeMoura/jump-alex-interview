import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Image from "next/image";
import { useState } from "react";
import RandomlyGeneratedBeerCard from "../components/RandomlyGeneratedBeerCard";
import BeerList from "../components/BeerList";

export interface Beer {
  id: number;
  name: string;
  image_url: string;
  description: string;
  first_brewed: string;
}

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, isError, isFetching } = useQuery<Beer[]>(
    ["beers", searchTerm],
    () => fetchBeers(searchTerm)
  );

  if (isError) {
    return <div>Nous n&apos;avons pas réussi à charger la liste de bière.</div>;
  }

  return (
    <div className="w-screen flex flex-col justify-center items-center p-10 space-y-5">
      <div className="flex space-x-4">
        <RandomlyGeneratedBeerCard key={1} id={1} />
        <RandomlyGeneratedBeerCard key={2} id={2} />
      </div>
      <div className="w-136 bg-white p-4 space-y-2">
        <div className="flex space-x-2 px-2 py-1 rounded-md border border-gray-500 focus-within:border-gray-700 focus-within:shadow-lg">
          <Image
            className="text-green-900"
            src={isLoading ? "/icon-loading.gif" : "/icon-search.svg"}
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
        <BeerList data={data} isLoading={isLoading} isFetching={isFetching} />
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

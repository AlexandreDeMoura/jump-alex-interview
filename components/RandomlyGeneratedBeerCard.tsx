import axios from "axios";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import { Beer } from "../pages/index";

type RandomlygeneratedBeerCardProps = {
  id: number;
};

const RandomlygeneratedBeerCard = ({ id }: RandomlygeneratedBeerCardProps) => {
  const { data, isLoading, isError, isFetching } = useQuery<Beer[]>(
    ["beers", id],
    fetchRandomBeers,
    {
      refetchInterval: 10000, // Refetch every 10 seconds (10000 milliseconds)
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const beer = data ? data[0] : null;
  return (
    <div className="flex flex-col justify-between w-56 h-56 p-6 border border-gray-600 rounded-md cursor-pointer hover:bg-gray-100">
      {beer ? (
        <div className="flex space-x-4">
          {beer.image_url && <img className="w-8" src={beer.image_url} />}
          <div>
            <div className="text-gray-900 font-semibold">{beer.name}</div>
            <div className="text-gray-700">{beer.first_brewed}</div>
          </div>
        </div>
      ) : null}
      <Link
        href={{
          pathname: "/beer-detail",
          query: { beer: JSON.stringify(beer) },
        }}
        as="/beer-detail"
      >
        <div className="font-semibold text-green-900">Voir détail</div>
      </Link>
    </div>
  );
};

const fetchRandomBeers = async (): Promise<Beer[]> => {
  const response = await axios.get("https://api.punkapi.com/v2/beers/random");
  return response.data;
};

export default RandomlygeneratedBeerCard;

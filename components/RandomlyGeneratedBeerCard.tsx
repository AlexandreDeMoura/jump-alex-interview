import axios from "axios";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import { Beer } from "../pages/index";
import { useLocalStorage } from "react-use";
import Image from "next/image";

type RandomlygeneratedBeerCardProps = {
  id: number;
};

const RandomlygeneratedBeerCard = ({ id }: RandomlygeneratedBeerCardProps) => {
  const [, setBeerDetail] = useLocalStorage<Beer>("beer-detail");
  const { data, isLoading } = useQuery<Beer[]>(
    ["beers", id],
    fetchRandomBeers,
    {
      refetchInterval: 10000,
    }
  );

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  const beer = data ? data[0] : null;
  return (
    <div className="flex flex-col justify-between w-56 h-56 p-6 border border-gray-600 rounded-md cursor-pointer hover:bg-gray-100">
      {beer ? (
        <div className="flex space-x-4">
          {beer.image_url && (
            <Image
              width={32}
              height={32}
              loader={() => beer.image_url}
              src={beer.image_url}
              alt="beer image"
            />
          )}
          <div>
            <div className="text-gray-900 font-semibold">{beer.name}</div>
            <div className="text-gray-700">{beer.first_brewed}</div>
          </div>
        </div>
      ) : null}
      <Link
        href={{
          pathname: "/beer-detail/[id]",
          query: { id: beer?.id },
        }}
        as={`/beer-detail/${beer?.id}`}
        onClick={beer ? () => setBeerDetail(beer) : () => 0}
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

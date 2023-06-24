import React, { useEffect } from "react";
import { Beer } from "..";
import Link from "next/link";
import Image from "next/image";

const BeerDetail = () => {
  const [beerDetail, setBeerDetail] = React.useState<Beer | null>(null);

  useEffect(() => {
    const savedBeerDetail = localStorage.getItem("beer-detail");
    if (savedBeerDetail) {
      setBeerDetail(JSON.parse(savedBeerDetail));
    }
  }, []);

  return beerDetail ? (
    <div className="w-full lg:w-screen flex flex-col lg:justify-center lg:items-center">
      <div className="pl-5 lg:pl-0 pt-10 space-y-6">
        <div>
          <Link
            href="/"
            className="text-green-900 font-semibold cursor-pointer"
          >
            Précédent
          </Link>
        </div>
        <div className="w-full flex items-start space-x-6">
          {beerDetail.image_url && (
            <Image
              width={32}
              height={32}
              loader={() => beerDetail.image_url}
              src={beerDetail.image_url}
              alt="beer image"
            />
          )}
          <div>
            <div className="text-gray-900 font-semibold">{beerDetail.name}</div>
            <div className="text-gray-700 mb-4">{beerDetail.first_brewed}</div>
            <div className="w-100 text-sm text-gray-700">
              {beerDetail.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default BeerDetail;

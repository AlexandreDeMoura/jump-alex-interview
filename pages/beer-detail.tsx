import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import { Beer } from ".";
import Link from "next/link";

const BeerDetail = () => {
  const router = useRouter();
  const { beer } = router.query;
  const parsedbeer: Beer | null = beer ? JSON.parse(beer as any) : null;

  return (
    <div className="w-screen flex flex-col justify-center items-center">
      <div className="pt-10 space-y-6">
        <Link href="/" className="text-green-900 font-semibold cursor-pointer">
          Précédent
        </Link>
        <div className="flex space-x-6">
          <div>
            <img
              src={parsedbeer?.image_url || ""}
              className="w-12"
              alt="image de bière"
            />
          </div>
          <div>
            <div className="text-gray-900 font-semibold">
              {parsedbeer?.name}
            </div>
            <div className="text-gray-700 mb-4">{parsedbeer?.first_brewed}</div>
            <div className="w-100 text-sm text-gray-700">
              {parsedbeer?.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeerDetail;

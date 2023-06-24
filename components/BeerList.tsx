import React from "react";
import { Beer } from "../pages/index";
import styles from "../styles/skeleton.module.css";
import { useLocalStorage } from "react-use";
import Link from "next/link";

interface BeerListProps {
  data: Beer[] | undefined;
  isLoading: boolean;
  isFetching: boolean;
}

const BeerList: React.FC<BeerListProps> = ({ data, isLoading, isFetching }) => {
  const [, setBeerDetail] = useLocalStorage<Beer>("beer-detail");
  return (
    <ul className="space-y-2">
      {isLoading || isFetching ? (
        <>
          <li className={styles["skeleton-li"]} />
          <li className={styles["skeleton-li"]} />
          <li className={styles["skeleton-li"]} />
          <li className={styles["skeleton-li"]} />
          <li className={styles["skeleton-li"]} />
        </>
      ) : data && data.length > 0 ? (
        data?.map((beer) => (
          <Link
            href={{
              pathname: "/beer-detail/[id]",
              query: { id: beer.id },
            }}
            onClick={() => setBeerDetail(beer)}
            key={beer.id}
          >
            <li className="flex justify-between items-center cursor-pointer rounded-md hover:bg-gray-100 px-2 py-1 w-full">
              <div className="text-gray-900 font-semibold w-60 lg:w-auto truncate">
                {beer.name}
              </div>
              <div className="text-gray-700">{beer.first_brewed}</div>
            </li>
          </Link>
        ))
      ) : (
        <div>Aucunes bières ne correspond à votre recherche.</div>
      )}
    </ul>
  );
};

export default BeerList;

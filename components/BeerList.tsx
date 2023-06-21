import React from "react";
import { Beer } from "../pages/index";
import styles from "../styles/skeleton.module.css";
import Link from "next/link";

interface BeerListProps {
  data: Beer[] | undefined;
  isLoading: boolean;
  isFetching: boolean;
}

const BeerList: React.FC<BeerListProps> = ({ data, isLoading, isFetching }) => {
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
      ) : (
        data?.map((beer) => (
          <Link
            href={{
              pathname: "/beer-detail",
              query: { beer: JSON.stringify(beer) },
            }}
            as={`/beer-detail/${beer.id}`}
            key={beer.id}
          >
            <li className="flex justify-between items-center cursor-pointer rounded-md hover:bg-gray-100 px-2 py-1">
              <div className="text-gray-900 font-semibold">{beer.name}</div>
              <div className="text-gray-700">{beer.first_brewed}</div>
            </li>
          </Link>
        ))
      )}
    </ul>
  );
};

export default BeerList;

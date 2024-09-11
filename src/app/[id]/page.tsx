import { headers } from "next/headers";
import BusDepartureClient from "./busDepartureClient";
import { TBusData } from "@/lib/types";
import NotFoundComponent from "../(components)/not-found";

export default async function BusDeparturePage({ params }: { params: any }) {
  headers();

  let busData: TBusData | null;
  busData = await new Promise(async (resolve) => {
    await fetch(`https://mpolden.no/atb/v2/departures/${params.id}`)
      .then(async (response) => {
        resolve(await response.json());
      })
      .catch((error) => {
        resolve(null);
      });
  });

  if (busData && busData?.departures?.length > 0) {
    return (
      <div className="w-[85%] mx-auto flex flex-col gap-[2dvh] items-center my-[5dvh]">
        {busData.departures.map((busDeparture, busDepartureIndex) => (
          <BusDepartureClient
            key={busDeparture.scheduledDepartureTime}
            busDeparture={busDeparture}
          />
        ))}
      </div>
    );
  } else {
    return <NotFoundComponent />;
  }
}

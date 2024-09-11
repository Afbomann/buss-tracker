import { headers } from "next/headers";
import BusDepartureClient from "./busDepartureClient";
import { TBusData, TBusDeparture } from "@/lib/types";
import NotFoundComponent from "../(components)/not-found";
import Link from "next/link";
import { redirect } from "next/navigation";
import LineChoiceClient from "./lineChoiceClient";

export default async function BusDeparturePage({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
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
    const lineChoices: string[] = [];

    busData.departures.forEach((busDeparture) => {
      if (!lineChoices.find((value) => value == busDeparture.line)) {
        lineChoices.push(busDeparture.line);
      }
    });

    if (
      searchParams.lineChoice &&
      searchParams.lineChoice != "Alle" &&
      lineChoices.find((value) => value == searchParams.lineChoice)
    ) {
      busData.departures = busData.departures.filter(
        (busDeparture) => busDeparture.line == searchParams.lineChoice
      );
    }

    return (
      <>
        <div className="mx-auto w-fit mt-[3dvh]">
          <Link
            className="bg-slate-200 rounded-md p-[10px] shadow-md text-sm lg:text-base"
            href="/"
          >
            Tilbake
          </Link>
        </div>

        <LineChoiceClient
          lineChoiceServer={async (lineChoice: string) => {
            "use server";

            return redirect(`/${params.id}?lineChoice=${lineChoice}`);
          }}
          lineChoices={lineChoices}
          lineChoice={
            searchParams.lineChoice &&
            lineChoices.find((value) => value == searchParams.lineChoice)
              ? searchParams.lineChoice
              : "Alle"
          }
        />

        <div className="w-[85%] mx-auto flex flex-col gap-[2dvh] items-center mt-[2dvh] mb-[5dvh]">
          {busData.departures.map((busDeparture, busDepartureIndex) => (
            <BusDepartureClient
              key={busDeparture.scheduledDepartureTime}
              busDeparture={busDeparture}
            />
          ))}
        </div>
      </>
    );
  } else {
    return <NotFoundComponent />;
  }
}

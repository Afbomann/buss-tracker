import { headers } from "next/headers";
import NotFoundComponent from "../(components)/not-found";
import { getBusStopInfo } from "@/lib/journeyPlanner";
import Link from "next/link";
import BusStopClient from "./busStopClient";

export default async function BusDeparturePage({
  params,
}: {
  params: { id: string };
}) {
  headers();

  const busStopInfo = await getBusStopInfo(params.id, 20);

  if (busStopInfo && busStopInfo?.data?.stopPlace) {
    return (
      <>
        <h3 className="text-center text-xl lg:text-2xl font-bold mt-[5dvh]">
          {busStopInfo.data.stopPlace.name}
        </h3>

        <h4 className="text-center text-lg lg:text-xl font-bold text-gray-600 mx-[7.5%]">
          Bussene oppdaterer seg hele tiden så husk å refresh
        </h4>

        <div className="w-fit mx-auto mt-[2dvh]">
          <Link
            className="text-sm lg:text-base bg-slate-200 rounded-md px-[15px] py-[5px] shadow-md"
            href="/"
          >
            Tilbake
          </Link>
        </div>

        <div className="flex flex-col w-[85%] mx-auto items-center mt-[3dvh] mb-[5dvh] gap-[2dvh]">
          {busStopInfo.data.stopPlace.estimatedCalls.map((estimatedCall) => {
            const estimatedCallDate = new Date(
              estimatedCall.actualArrivalTime ??
                estimatedCall.expectedArrivalTime
            );
            const dateNow = new Date();

            if (process.env.NODE_ENV == "production") {
              estimatedCallDate.setHours(estimatedCallDate.getHours() + 2);
              dateNow.setHours(dateNow.getHours() + 2);
            }

            const secondsUntilArrival = Math.floor(
              estimatedCallDate.getTime() / 1000 - dateNow.getTime() / 1000
            );
            const minutesUntilArrival = Math.floor(secondsUntilArrival / 60);
            const hoursUntilArrival = Math.floor(secondsUntilArrival / 3600);

            if (secondsUntilArrival < -30) return;

            return (
              <BusStopClient
                secondsUntilArrival={secondsUntilArrival}
                minutesUntilArrival={minutesUntilArrival}
                hoursUntilArrival={hoursUntilArrival}
                estimatedCall={estimatedCall}
                estimatedCallDate={estimatedCallDate}
                isProduction={process.env.NODE_ENV == "production"}
                key={`${estimatedCall.actualArrivalTime}-${estimatedCall.destinationDisplay}`}
              />
            );
          })}
        </div>
      </>
    );
  } else {
    return <NotFoundComponent />;
  }
}

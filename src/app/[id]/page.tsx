import { headers } from "next/headers";
import NotFoundComponent from "../(components)/not-found";
import { getBusStopInfo } from "@/lib/journeyPlanner";
import Link from "next/link";

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
            const secondsUntilArrival = Math.floor(
              estimatedCallDate.getTime() / 1000 - dateNow.getTime() / 1000
            );
            const minutesUntilArrival = Math.floor(secondsUntilArrival / 60);
            const hoursUntilArrival = Math.floor(secondsUntilArrival / 3600);

            if (secondsUntilArrival < -30) return;

            return (
              <div
                className={`${getColor(
                  minutesUntilArrival
                )} w-[350px] max-w-[100%] rounded-md p-[10px] shadow-md`}
                key={`${estimatedCall.actualArrivalTime}-${estimatedCall.destinationDisplay}`}
              >
                <h4 className="text-base lg:text-lg font-bold">
                  {estimatedCall.serviceJourney.line.publicCode}
                </h4>
                <h4 className="text-sm lg:text-base tracking-widest">
                  {estimatedCall.destinationDisplay.frontText}
                </h4>
                <div className="flex mt-[5px]">
                  <h5 className="text-sm lg:text-base tracking-wide">
                    {formatNumber(estimatedCallDate.getHours())}:
                    {formatNumber(estimatedCallDate.getMinutes())}
                  </h5>
                  <h5 className="text-sm lg:text-base tracking-wide ml-auto">
                    {hoursUntilArrival >= 1 &&
                      `${hoursUntilArrival} tim og ${
                        minutesUntilArrival % 60
                      } min`}
                    {minutesUntilArrival <= 0
                      ? "Nå"
                      : hoursUntilArrival <= 0 &&
                        `${minutesUntilArrival} min og ${
                          secondsUntilArrival % 60
                        } sek`}
                  </h5>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  } else {
    return <NotFoundComponent />;
  }
}

function formatNumber(number: number): string {
  return number >= 10 ? number.toString() : "0" + number.toString();
}

function getColor(minutes: number): string {
  if (minutes >= -1 && minutes <= 4) return "bg-red-500";

  if (minutes >= 5 && minutes <= 14) return "bg-orange-500";

  return "bg-green-500";
}

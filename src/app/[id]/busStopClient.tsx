"use client";

import { TJourneyPlannerEstimatedCall } from "@/lib/types";
import { useEffect, useState } from "react";

export default function BusStopClient(props: {
  secondsUntilArrival: number;
  minutesUntilArrival: number;
  hoursUntilArrival: number;
  estimatedCall: TJourneyPlannerEstimatedCall;
  estimatedCallDate: Date;
  isProduction: boolean;
}) {
  const [secondsUntilArrival, setSecondsUntilArrival] = useState(
    props.secondsUntilArrival
  );
  const [minutesUntilArrival, setMinutesUntilArrival] = useState(
    props.minutesUntilArrival
  );
  const [hoursUntilArrival, setHoursUntilArrival] = useState(
    props.hoursUntilArrival
  );
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (props.isProduction)
      props.estimatedCallDate.setHours(props.estimatedCallDate.getHours() + 2);

    const interval = setInterval(() => {
      const dateNow = new Date();

      if (props.isProduction) dateNow.setHours(dateNow.getHours() + 2);

      const secondsUntilArrival = Math.floor(
        props.estimatedCallDate.getTime() / 1000 - dateNow.getTime() / 1000
      );
      const minutesUntilArrival = Math.floor(secondsUntilArrival / 60);
      const hoursUntilArrival = Math.floor(secondsUntilArrival / 3600);

      setSecondsUntilArrival((prev) => (prev = secondsUntilArrival));
      setMinutesUntilArrival((prev) => (prev = minutesUntilArrival));
      setHoursUntilArrival((prev) => (prev = hoursUntilArrival));

      if (secondsUntilArrival < -30) {
        clearInterval(interval);
        setShow(() => false);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [props.estimatedCallDate, props.isProduction]);

  if (show)
    return (
      <div
        className={`${getColor(
          minutesUntilArrival
        )} w-[350px] max-w-[100%] rounded-md p-[10px] shadow-md`}
        key={`${props.estimatedCall.actualArrivalTime}-${props.estimatedCall.destinationDisplay.frontText}`}
      >
        <h4 className="text-base lg:text-lg font-bold">
          {props.estimatedCall.serviceJourney.line.publicCode}
        </h4>
        <h4 className="text-sm lg:text-base tracking-widest">
          {props.estimatedCall.destinationDisplay.frontText}
        </h4>
        <div className="flex mt-[5px]">
          <h5 className="text-sm lg:text-base tracking-wide">
            {formatNumber(props.estimatedCallDate.getHours())}:
            {formatNumber(props.estimatedCallDate.getMinutes())}
          </h5>
          <h5 className="text-sm lg:text-base tracking-wide ml-auto">
            {hoursUntilArrival >= 1 &&
              `${hoursUntilArrival} tim og ${minutesUntilArrival % 60} min`}
            {minutesUntilArrival <= 0
              ? "Nå"
              : hoursUntilArrival <= 0 &&
                `${minutesUntilArrival} min og ${secondsUntilArrival % 60} sek`}
          </h5>
        </div>
      </div>
    );
}

function formatNumber(number: number): string {
  return number >= 10 ? number.toString() : "0" + number.toString();
}

function getColor(minutes: number): string {
  if (minutes >= -1 && minutes <= 4) return "bg-red-500";

  if (minutes >= 5 && minutes <= 14) return "bg-orange-500";

  return "bg-green-500";
}

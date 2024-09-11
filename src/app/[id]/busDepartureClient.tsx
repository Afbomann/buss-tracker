"use client";

import { useEffect, useState } from "react";
import { TBusDeparture } from "@/lib/types";

export default function BusDepartureClient(props: {
  busDeparture: TBusDeparture;
}) {
  const [show, setShow] = useState(true);
  const [secondsUntilDeparture, setSecondsUntilDeparture] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!show) {
        return clearInterval(interval);
      }

      const dateNow = new Date();
      const departureDate = new Date(props.busDeparture.scheduledDepartureTime);
      const secondsUntilDepartureTemp = Math.round(
        departureDate.getTime() / 1000 - dateNow.getTime() / 1000
      );

      if (secondsUntilDepartureTemp < 0) {
        setShow((prev) => (prev = false));
      }

      setSecondsUntilDeparture((prev) => (prev = secondsUntilDepartureTemp));
    }, 250);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {show && (
        <div
          className={`${getColor(
            secondsUntilDeparture
          )} w-[350px] max-w-[100%] rounded-md p-[10px]`}
        >
          <h4 className="text-base lg:text-lg font-bold">
            {props.busDeparture.line}
          </h4>
          <h4 className="tracking-widest">{props.busDeparture.destination}</h4>
          <h4>{formatTime(secondsUntilDeparture)}</h4>
        </div>
      )}
    </>
  );
}

function formatTime(seconds: number): string {
  if (seconds < 60) {
    return `${seconds} ${
      seconds == 0 || seconds > 1 ? "sekunder" : "sekund"
    } igjen`;
  } else {
    const minutes = Math.floor(seconds / 60);
    const secondss = seconds % 60;

    return `${minutes} ${
      minutes == 0 || (minutes > 1 ? "minutter" : "minutt")
    } og ${secondss} ${
      secondss == 0 || secondss > 1 ? "sekunder" : "sekund"
    } igjen`;
  }
}

function getColor(seconds: number): string {
  const minutes = Math.floor(seconds / 60);

  if (minutes >= 0 && minutes <= 4) {
    return "bg-red-500";
  }

  if (minutes >= 5 && minutes <= 9) {
    return "bg-orange-500";
  }

  return "bg-green-500";
}

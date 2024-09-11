export type TBusDeparture = {
  line: string;
  scheduledDepartureTime: string;
  destination: string;
  isRealtimeData: Boolean;
  isGoingTowardsCentrum: Boolean;
};

export type TBusData = {
  url: string;
  departures: TBusDeparture[];
};

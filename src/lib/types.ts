export type TJourneyPlannerRequestBody = {
  query: string;
  variables: { id: string };
};

export type TJourneyPlannerResponseBody = {
  data: {
    stopPlace: {
      name: string;
      id: string;
      estimatedCalls: {
        actualArrivalTime: string;
        expectedArrivalTime: string;
        destinationDisplay: { frontText: string };
        serviceJourney: {
          line: {
            publicCode: string;
          };
        };
      }[];
    };
  };
};

import {
  TJourneyPlannerRequestBody,
  TJourneyPlannerResponseBody,
} from "@/lib/types";

const baseURL = process.env.Journey_Planner_Base_URL!;
const contentType = "application/json";
const etClientName = process.env.Journey_Planner_Client_Name!;

export async function getBusStopInfo(
  id: string,
  totalDepartures: number
): Promise<TJourneyPlannerResponseBody | null> {
  const requestBody: TJourneyPlannerRequestBody = {
    query: `query ($id: String!) {
              stopPlace(id: $id) {
                name
                id
                estimatedCalls (numberOfDepartures: ${totalDepartures}, includeCancelledTrips: false, whiteListedModes: bus) {
                  actualArrivalTime
                  expectedArrivalTime
                  destinationDisplay {
                    frontText
                  }
                  serviceJourney {
                    line {
                      publicCode
                    }
                  }
                }
              }
            }`,
    variables: { id: `NSR:StopPlace:${id}` },
  };

  return await new Promise(async (resolve) => {
    await fetch(baseURL, {
      method: "POST",
      headers: {
        "Content-Type": contentType,
        "ET-Client-Name": etClientName,
      },
      body: JSON.stringify(requestBody),
    })
      .then(async (response) => {
        const responsejson: TJourneyPlannerResponseBody = await response.json();

        return resolve(responsejson);
      })
      .catch((error) => {
        return resolve(null);
      });
  });
}

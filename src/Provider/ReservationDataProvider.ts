import { DataProvider, GetListParams, GetListResult, QueryFunctionContext, RaRecord } from "react-admin";
import { BASE_URL } from "../Constant";

export const ReservationDataProvider: DataProvider = {
    getList: async function <RecordType extends RaRecord = any>(resource: string, params: GetListParams & QueryFunctionContext): Promise<GetListResult<RecordType>> {
        const response = await fetch(`${BASE_URL}/reservations/all`, { method: "GET" })

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        for (let index = 0; index < jsonData.length; index++) {
            const element = jsonData[index];
            jsonData[index] = { ...element, id: index };
        }
        const result: GetListResult = {
            data: jsonData.map(reservation => ({ ...reservation, id: reservation.reservationID })),
            total: jsonData.length,
        };

        return result;
    },
}
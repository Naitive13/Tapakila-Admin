import { CreateParams, CreateResult, DataProvider, DeleteManyParams, DeleteManyResult, DeleteParams, DeleteResult, GetManyParams, GetManyReferenceParams, GetManyReferenceResult, GetManyResult, Identifier, QueryFunctionContext, RaRecord, UpdateManyParams, UpdateManyResult, UpdateParams, UpdateResult } from "react-admin";
import { BASE_URL } from "../Constant";

export const EventDataProvider: DataProvider = {
    getList: async function <RecordType extends RaRecord = any>(resource: string, params: GetListParams & QueryFunctionContext): Promise<GetListResult<RecordType>> {
        const response = await fetch(`${BASE_URL}/events`, { method: "GET" });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        for (let index = 0; index < jsonData.length; index++) {
            const element = jsonData[index];
            jsonData[index] = { ...element, id: index };
        }
        const result: GetListResult = {
            data: jsonData.map(event => ({ ...event, id: event.eventId })),
            total: jsonData.length,
        };

        return result;
    },

    getOne: async function <RecordType extends RaRecord = any>(resource: string, params: GetOneParams<RecordType> & QueryFunctionContext): Promise<GetOneResult<RecordType>> {
        const { id } = params;
        const response = await fetch(`${BASE_URL}/events/${id}`, { method: "GET" });

        if (!response.ok) {
            throw new Error('Network response was not ok !');
        }

        const jsonData = await response.json();

        const result: GetOneResult = {
            data: { ...jsonData, id: jsonData.eventId },
        };
        return result;
    },
    create: async function <RecordType extends Omit<RaRecord, "id"> = any, ResultRecordType extends RaRecord = RecordType & { id: Identifier; }>(
        resource: string,
        params: CreateParams
    ): Promise<CreateResult<ResultRecordType>> {
        const { data } = params;
        console.log(data);
        

        const createEvent = await fetch(`${BASE_URL}/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!createEvent.ok) {
            throw new Error('Failed to create event');
        }

        const resultData = await createEvent.json();

        const result: CreateResult<ResultRecordType> = {
            data: { ...resultData, id: resultData.eventId },
        };

        return result;
    },
}
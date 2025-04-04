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

    delete: async function <RecordType extends RaRecord = any>(resource: string, params: DeleteParams<RecordType>): Promise<DeleteResult<RecordType>> {
        const { id } = params;
        if (!id) {
            throw new Error('Missing event ID for deletion');
        }

        try {
            console.log(`Deleting event ${id}...`);
            const response = await fetch(`${BASE_URL}/events/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                console.error('Delete failed:', errorText);
                throw new Error(errorText || 'Failed to delete event');
            }

            console.log(`Successfully deleted event ${id}`);
            return { data: { id } };


        } catch (error) {
            console.error('Event delete error:', error);
            throw error;
        }
    },
    update: async function <RecordType extends RaRecord = any>(
        params: UpdateParams,
    ): Promise<UpdateResult<RecordType>> {
        const { data, id } = params;
        const updateEvent = await fetch(`${BASE_URL}/events/${id}`,
            { method: "POST", body: JSON.stringify(data) },
        );

        const result: CreateActionData = {
            data: await updateEvent.json(),
        };
        return result;
    },
}
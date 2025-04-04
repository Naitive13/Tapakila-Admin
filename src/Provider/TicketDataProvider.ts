import { CreateParams, CreateResult, DataProvider, DeleteManyParams, DeleteManyResult, DeleteParams, DeleteResult, GetListParams, GetListResult, GetManyParams, GetManyReferenceParams, GetManyReferenceResult, GetManyResult, GetOneParams, GetOneResult, Identifier, QueryFunctionContext, RaRecord, UpdateManyParams, UpdateManyResult, UpdateParams, UpdateResult } from "react-admin";
import { BASE_URL } from "../Constant";

export const TicketDataProvider: DataProvider = {
    getList: async function <RecordType extends RaRecord = any>(resource: string, params: GetListParams & QueryFunctionContext): Promise<GetListResult<RecordType>> {
        const response = await fetch(`${BASE_URL}/tickets`, { method: "GET" });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        for (let index = 0; index < jsonData.length; index++) {
            const element = jsonData[index];
            jsonData[index] = { ...element, id: index };
        }
        const result: GetListResult = {
            data: jsonData.map(ticket => ({ ...ticket, id: ticket.ticket_id })),
            total: jsonData.length,
        };

        return result;
    },
    getOne: async function <RecordType extends RaRecord = any>(resource: string, params: GetOneParams<RecordType> & QueryFunctionContext): Promise<GetOneResult<RecordType>> {
        const { id } = params;
        const response = await fetch(`${BASE_URL}/tickets/${id}`, { method: "GET" });

        if (!response.ok) {
            throw new Error('Network response was not ok !');
        }

        const jsonData = await response.json();

        const result: GetOneResult = {
            data: { ...jsonData, id: jsonData.ticket_id },
        };
        return result;
    },
    create: async function <RecordType extends Omit<RaRecord, "id"> = any, ResultRecordType extends RaRecord = RecordType & { id: Identifier; }>(resource: string, params: CreateParams): Promise<CreateResult<ResultRecordType>> {
        const { data } = params;
        console.log(data);


        const createTicket = await fetch(`${BASE_URL}/tickets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!createTicket.ok) {
            throw new Error('Failed to create event');
        }

        const resultData = await createTicket.json();

        const result: CreateResult<ResultRecordType> = {
            data: { ...resultData, id: resultData.eventId },
        };

        return result;
    },
    delete: async function <RecordType extends RaRecord = any>(resource: string, params: DeleteParams<RecordType>): Promise<DeleteResult<RecordType>> {
        const { id } = params;
        if (!id) {
            throw new Error('Missing Reservation for deletion');
        }

        try {
            console.log(`Deleting user ${id}...`);
            const response = await fetch(`${BASE_URL}/tickets/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                console.error('Delete failed:');
            }

            console.log(`Successfully deleted user ${id}`);
            return { data: { id } };


        } catch (error) {
            console.error('User delete error:', error);
            throw error;
        }
    },
}
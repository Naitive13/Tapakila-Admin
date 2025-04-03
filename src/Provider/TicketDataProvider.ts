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
}
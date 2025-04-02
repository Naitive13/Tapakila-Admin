import { DataProvider, RaRecord, GetListParams, QueryFunctionContext, GetListResult, GetOneParams, GetOneResult, UpdateParams, UpdateResult, Identifier, CreateParams, CreateResult } from "react-admin";
import { UserDataProvider } from "./UserDataProvider";
import { ReservationDataProvider } from "./ReservationDataProvider";
import { TicketDataProvider } from "./TicketDataProvider";

const getDataProvider = (resource: string) => {
    switch (resource) {
        case "User":
            return UserDataProvider;
        case "Reservation":
            return ReservationDataProvider;
        case "Ticket":
            return TicketDataProvider;

        default:
            throw new Error(resource);
    }
};
export const dataProvider: DataProvider = {
    getList: async function <RecordType extends RaRecord = any>(
        resource: string,
        params: GetListParams & QueryFunctionContext,
    ): Promise<GetListResult<RecordType>> {
        const currentDataProvider = getDataProvider(resource);
        return currentDataProvider.getList(params);
    },
    getOne: async function <RecordType extends RaRecord = any>(
        resource: string,
        params: GetOneParams<RecordType> & QueryFunctionContext,
    ): Promise<GetOneResult<RecordType>> {
        const currentDataProvider = getDataProvider(resource);
        return currentDataProvider.getOne(params);
    },

    update: async function <RecordType extends RaRecord = any>(
        resource: string,
        params: UpdateParams,
    ): Promise<UpdateResult<RecordType>> {
        const currentDataProvider = getDataProvider(resource);
        return currentDataProvider.update(params);
    },
    create: async function <
        RecordType extends Omit<RaRecord, "id"> = any,
        ResultRecordType extends RaRecord = RecordType & { id: Identifier },
    >(
        resource: string,
        params: CreateParams,
    ): Promise<CreateResult<ResultRecordType>> {
        const currentDataProvider = getDataProvider(resource);
        return currentDataProvider.create(params);
    },
};

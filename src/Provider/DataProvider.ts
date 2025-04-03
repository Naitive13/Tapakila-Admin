import { DataProvider, RaRecord, GetListParams, QueryFunctionContext, GetListResult, GetOneParams, GetOneResult, UpdateParams, UpdateResult, Identifier, CreateParams, CreateResult, DeleteManyParams, DeleteManyResult, DeleteParams, DeleteResult, GetManyParams, GetManyReferenceParams, GetManyReferenceResult, GetManyResult, UpdateManyParams, UpdateManyResult } from "react-admin";
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
        params: GetListParams & QueryFunctionContext
    ): Promise<GetListResult<RecordType>> {
        const currentDataProvider = getDataProvider(resource);
        return currentDataProvider.getList(params);
    },
    getOne: async function <RecordType extends RaRecord = any>(
        resource: string,
        params: GetOneParams<RecordType> & QueryFunctionContext
    ): Promise<GetOneResult<RecordType>> {
        const currentDataProvider = getDataProvider(resource);
        return currentDataProvider.getOne(params);
    },

    update: async function <RecordType extends RaRecord = any>(
        resource: string,
        params: UpdateParams
    ): Promise<UpdateResult<RecordType>> {
        const currentDataProvider = getDataProvider(resource);
        return currentDataProvider.update(params);
    },
    create: async function <
        RecordType extends Omit<RaRecord, "id"> = any,
        ResultRecordType extends RaRecord = RecordType & { id: Identifier; }
    >(
        resource: string,
        params: CreateParams
    ): Promise<CreateResult<ResultRecordType>> {
        const currentDataProvider = getDataProvider(resource);
        return currentDataProvider.create(params);
    },
    getMany: function <RecordType extends RaRecord = any>(resource: string, params: GetManyParams<RecordType> & QueryFunctionContext): Promise<GetManyResult<RecordType>> {
        throw new Error("Function not implemented.");
    },
    getManyReference: function <RecordType extends RaRecord = any>(resource: string, params: GetManyReferenceParams & QueryFunctionContext): Promise<GetManyReferenceResult<RecordType>> {
        throw new Error("Function not implemented.");
    },
    updateMany: function <RecordType extends RaRecord = any>(resource: string, params: UpdateManyParams): Promise<UpdateManyResult<RecordType>> {
        throw new Error("Function not implemented.");
    },
    delete: function <RecordType extends RaRecord = any>(resource: string, params: DeleteParams<RecordType>): Promise<DeleteResult<RecordType>> {
        throw new Error("Function not implemented.");
    },
    deleteMany: function <RecordType extends RaRecord = any>(resource: string, params: DeleteManyParams<RecordType>): Promise<DeleteManyResult<RecordType>> {
        throw new Error("Function not implemented.");
    }
};

import { DataProvider, GetListParams, GetListResult, QueryFunctionContext, RaRecord } from "react-admin";

export const ReservationDataProvider: DataProvider = {
    getList: function <RecordType extends RaRecord = any>(resource: string, params: GetListParams & QueryFunctionContext): Promise<GetListResult<RecordType>> {
        throw new Error("Function not implemented.");
    },
}
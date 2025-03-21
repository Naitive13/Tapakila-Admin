import { CreateParams, CreateResult, DataProvider, DeleteManyParams, DeleteManyResult, DeleteParams, DeleteResult, GetListParams, GetListResult, GetManyParams, GetManyReferenceParams, GetManyReferenceResult, GetManyResult, GetOneParams, GetOneResult, Identifier, QueryFunctionContext, RaRecord, UpdateManyParams, UpdateManyResult, UpdateParams, UpdateResult } from "react-admin";
import { BASE_URL } from "../Constant";

export const UserDataProvider: DataProvider = {
    getList: async function <RecordType extends RaRecord = any>
        (resource: string, params: GetListParams & QueryFunctionContext)
        : Promise<GetListResult<RecordType>> {

        const response = await fetch(`${BASE_URL}/user/all`, { method: 'GET' });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const jsonData = await response.json(); 
        // debug by naitive13
        for (let index = 0; index < jsonData.length; index++) {
            const element = jsonData[index];
            jsonData[index] = {...element, id:index};
        }
        console.log(jsonData);
        //end of debug

        const result: GetListResult = {
            data:jsonData,
            total: jsonData.length, 
        };

        return result;
    }
};

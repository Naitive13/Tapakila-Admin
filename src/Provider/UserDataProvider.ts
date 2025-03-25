import { CreateParams, CreateResult, DataProvider, DeleteManyParams, DeleteManyResult, DeleteParams, DeleteResult, GetListParams, GetListResult, GetManyParams, GetManyReferenceParams, GetManyReferenceResult, GetOneParams, GetOneResult, Identifier, QueryFunctionContext, RaRecord, UpdateManyParams, UpdateManyResult, UpdateParams, UpdateResult } from "react-admin";
import { BASE_URL } from "../Constant";

export const UserDataProvider: DataProvider = {
    getList: async function <RecordType extends RaRecord = any>(resource: string, params: GetListParams & QueryFunctionContext): Promise<GetListResult<RecordType>> {

        const response = await fetch(`${BASE_URL}/user/all`, { method: 'GET' });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        // debug by naitive13
        for (let index = 0; index < jsonData.length; index++) {
            const element = jsonData[index];
            jsonData[index] = { ...element, id: index };
        }
        //end of debug
        const result: GetListResult = {
            data: jsonData.map(user => ({ ...user, id: user.userId })),
            total: jsonData.length,
        };

        return result;
    },
    getOne: async function <RecordType extends RaRecord = any>(resource: string, params: GetOneParams<RecordType> & QueryFunctionContext): Promise<GetOneResult<RecordType>> {
        const { id } = params;
        const response = await fetch(`${BASE_URL}/user/${id}`, { method: "GET" });

        if (!response.ok) {
            throw new Error('Network response was not ok !');
        }

        const jsonData = await response.json();

        const result: GetOneResult = {
            data: { ...jsonData, id: jsonData.userId },
        };
        return result;
    },
    getManyReference: function <RecordType extends RaRecord = any>(resource: string, params: GetManyReferenceParams & QueryFunctionContext): Promise<GetManyReferenceResult<RecordType>> {
        throw new Error("Function not implemented.");
    },
    update: function <RecordType extends RaRecord = any>(resource: string, params: UpdateParams): Promise<UpdateResult<RecordType>> {
        throw new Error("Function not implemented.");
    },
    updateMany: function <RecordType extends RaRecord = any>(resource: string, params: UpdateManyParams): Promise<UpdateManyResult<RecordType>> {
        throw new Error("Function not implemented.");
    },
    create: function <RecordType extends Omit<RaRecord, "id"> = any, ResultRecordType extends RaRecord = RecordType & { id: Identifier; }>(resource: string, params: CreateParams): Promise<CreateResult<ResultRecordType>> {
        throw new Error("Function not implemented.");
    },
    delete: async function <RecordType extends RaRecord = any>(resource: string, params: DeleteParams<RecordType>): Promise<DeleteResult<RecordType>> {
        const { id } = params;
        const response = await fetch(`${BASE_URL}/${resource}/${id}`, 
            { method: 'DELETE', headers: 
                {
            'Content-Type': 'application/json',
          }});

        if (!response.ok){
            throw new Error(`Failed to delete user record : ${id} . ERROR : ${response.statusText}`);
        }
    
        return { data: id}

    },
    deleteMany: function <RecordType extends RaRecord = any>(resource: string, params: DeleteManyParams<RecordType>): Promise<DeleteManyResult<RecordType>> {
        throw new Error("Function not implemented.");
    }
};

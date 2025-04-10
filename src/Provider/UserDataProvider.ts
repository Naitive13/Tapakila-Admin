import { CreateParams, CreateResult, DataProvider, DeleteManyParams, DeleteManyResult, DeleteParams, DeleteResult, GetListParams, GetListResult, GetManyParams, GetManyReferenceParams, GetManyReferenceResult, GetManyResult, GetOneParams, GetOneResult, Identifier, Notification, QueryFunctionContext, RaRecord, UpdateManyParams, UpdateManyResult, UpdateParams, UpdateResult, useNotify } from "react-admin";
import { BASE_URL } from "../Constant";

export const userDataProvider: DataProvider = {
    getList: async function <RecordType extends RaRecord = any>(resource: string, params: GetListParams & QueryFunctionContext): Promise<GetListResult<RecordType>> {
        const token = sessionStorage.getItem("accessToken");
        const response = await fetch(`${BASE_URL}/user/all`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
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
        if (!params || !params.id) {
            throw new Error('Missing ID parameter');
        }

        const { id } = params;

        const token = sessionStorage.getItem("accessToken");

        try {
            const response = await fetch(`${BASE_URL}/user/${id}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                alert(`HTTP error! status: ${response.status}`);

            }

            const jsonData = await response.json();

            return {
                data: {
                    ...jsonData,
                    id: jsonData.userId || id // Fallback to original ID if userId doesn't exist
                },
            };
        } catch (error) {
            console.error('Error in getOne:', error);
            throw error;
        }
    },
    create: async function <RecordType extends Omit<RaRecord, "id"> = any, ResultRecordType extends RaRecord = RecordType & { id: Identifier; }>(resource: string, params: CreateParams): Promise<CreateResult<ResultRecordType>> {
        try {
            const token = sessionStorage.getItem("accessToken");
            const response = await fetch(`${BASE_URL}/user/create`,
                {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userName: params.data.userName,
                        email: params.data.email,
                        password: params.data.password,
                        type: params.data.type,
                    })
                }
            );

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${await response.text()}`);
            }
            const responseData = await response.json();
            console.log("Response Data:", responseData);

            return {
                data: { id: responseData.userId, ...responseData }
            } as CreateResult<ResultRecordType>;
        } catch (error) {
            console.error("Create request failed:", error);
            throw error;
        }
    },
    delete: async function <RecordType extends RaRecord = any>(resource: string, params: DeleteParams<RecordType>): Promise<DeleteResult<RecordType>> {
        const { id } = params;
        if (!id) {
            throw new Error('Missing user ID for deletion');
        }

        const token = sessionStorage.getItem("accessToken");
        if (!token) {
            throw new Error('Authentication token missing');
        }

        try {
            console.log(`Deleting user ${id}...`);
            const response = await fetch(`${BASE_URL}/user/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                console.error('Delete failed:', errorText);
                throw new Error(errorText || 'Failed to delete user');
            }

            console.log(`Successfully deleted user ${id}`);
            return { data: { id } };


        } catch (error) {
            console.error('User delete error:', error);
            throw error;
        }
    },
    update: async function <RecordType extends RaRecord = any>(
        resource: string, 
        params: UpdateParams<RecordType>
      ): Promise<UpdateResult<RecordType>> {
        try {
          const { id, data } = params;
          const token = sessionStorage.getItem("accessToken");
      
          if (!token) {
            throw new Error("Authentication token missing");
          }
      
          // Special handling for user type updates
          if (resource === 'user' && data.type) {
            const url = `${BASE_URL}/user/${id}?type=${encodeURIComponent(data.type)}`;
            
            const response = await fetch(url, {
              method: "PUT",
              headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
              }
            });
      
            if (!response.ok) {
              const error = await response.json();
              throw new Error(error.message || 'User type update failed');
            }
      
            const responseData = await response.json();
            return {
              data: { id: id as string, ...responseData }
            };
          }
      
          // Default update implementation for other resources
          const response = await fetch(`${BASE_URL}/${resource}/${id}`, {
            method: "PUT",
            headers: {
              'Authorization': `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          });
      
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Update failed');
          }
      
          const responseData = await response.json();
          return {
            data: { id: id as string, ...responseData }
          };
      
        } catch (error) {
          console.error("Update error:", error);
          throw new Error(
            error instanceof Error 
              ? error.message 
              : 'An unknown error occurred during update'
          );
        }
      }
};

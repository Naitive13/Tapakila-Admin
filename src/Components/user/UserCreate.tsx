import { Create, SimpleForm, TextInput } from "react-admin"

export const UserCreate = () =>{
    return (
        <Create>
            <SimpleForm>
                <TextInput source="userName"/>
                <TextInput source="email"/>
                <TextInput source="password"/>
                <TextInput source="type"/>
            </SimpleForm>
        </Create>

    )
}
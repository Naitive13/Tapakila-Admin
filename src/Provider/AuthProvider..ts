import { AuthProvider, QueryFunctionContext } from "react-admin";

const authProvider: AuthProvider = {
    login: async (params: any): Promise<{ redirectTo?: string | boolean } | void> => {
        const { username, password } = params;

        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: 'emilys',
                    password: 'emilyspass',
                    expiresInMins: 30,
                }),
            });

            if (!response.ok) {
                throw new Error("Invalid login !");
            }

            const data = await response.json();
            console.log("Login success:", data);

            localStorage.setItem("accessToken", data.token);

            return Promise.resolve({ redirectTo: "/" });
        } catch (error) {
            console.error("Login failed:", error);
            return Promise.reject(error);
        }
    },

    logout: async (): Promise<void> => {
        localStorage.removeItem("accessToken");
        return Promise.resolve();
    },

    checkAuth: async (): Promise<void> => {
        return localStorage.getItem("accessToken")
            ? Promise.resolve()
            : Promise.reject();
    },

    checkError: async (error: any): Promise<void> => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem("accessToken");
            return Promise.reject();
        }
        return Promise.resolve();
    },

    getPermissions: async (): Promise<any> => {
        return Promise.resolve();
    },
};

export default authProvider;

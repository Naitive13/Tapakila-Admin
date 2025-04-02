import { AuthProvider } from "react-admin";
import { BASE_URL } from "../Constant";

function decodeJWT(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
}

export const authProvider: AuthProvider = {
    login: async (params: any): Promise<{ redirectTo?: string | boolean } | void> => {
        console.log("Received params in login:", params);
        const { username, password } = params;

        try {
            if (!username || !password) {
                throw new Error("Email and password are required.");
            }
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: username, password}),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log("Error data:", errorData); 
                throw new Error(errorData.message || "Invalid email or password!");
            }

            const data = await response.json();
            const detailedData = decodeJWT(data.token);
            
            if (detailedData.userType != "admin"){
                throw new Error("Must be admin to log in! userType : " + detailedData.userType);
            }
            
            console.log("Login success:", data);
            sessionStorage.setItem("accessToken", data.token);
            return { redirectTo: "/"};

        } catch (error) {
            console.error("Login failed:", error);
            return Promise.reject(error.message);
        }
    },


    logout: async (): Promise<void> => {
        localStorage.removeItem("accessToken");
        return Promise.resolve();
    },

    checkAuth: async (): Promise<void> => {
        return sessionStorage.getItem("accessToken")
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


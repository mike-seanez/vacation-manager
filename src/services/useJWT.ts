export const useJWT = () => {
    const setJwt = async (jwt: string) => {
        return localStorage.setItem('jwt', jwt);
    }

    const getJwt = async () => {
        return localStorage.getItem('jwt');
    }

    const deleteJwt = async () => {
        return localStorage.removeItem('jwt');
    }

    const getJwtAsJson = async (): Promise<any | null> => {
        const token = await getJwt();
        if (!token) return null;
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(atob(base64));
    }

    return {
        setJWT: async (jwt: string) => setJwt(jwt),
        getJWT: async () => getJwt(),
        deleteJWT: async () => deleteJwt(),
        getJWTAsJson: async () => getJwtAsJson(),
    };

}
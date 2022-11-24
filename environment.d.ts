declare global {
    namespace NodeJS {
        interface ProcessEnv {
            CLIENT_TOKEN: string;
            TEST_GUILD: string;
        }
    }
}

export {};
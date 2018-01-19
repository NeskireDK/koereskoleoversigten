export const isDevelopmentEnvironment = ()=>{
    return process.env.NODE_ENV.trim().toLowerCase().substring(0, 3) === "dev";
};
export const isProductionEnvironment = ()=>{
    return process.env.NODE_ENV.trim().toLowerCase().substring(0, 4) === "prod";
};
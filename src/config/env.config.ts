
export const EnvConfiguration = () => ({
    enviroment : process.env.NODE_ENV || 'dev',
    mongodb : process.env.MONGODB,
    ports : process.env.PORTS || 3002,
    default_limit : +process.env.DEFAULT_LIMIT,
})
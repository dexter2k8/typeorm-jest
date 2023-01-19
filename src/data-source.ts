import "reflect-metadata";
import "dotenv/config";
import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";

const setDataSourceConfig = (): DataSourceOptions => {
    const entitiesPath: string = path.join(__dirname, "./entities/**.{js,ts}");
    const migrationsPath: string = path.join(__dirname, "./migrations/**.{js,ts}");

    const nodeEnv = process.env.NODE_ENV;

    if (nodeEnv === "production") {
        return {
            type: "postgres",
            url: process.env.DATABASE_URL,
            entities: [entitiesPath],
            migrations: [migrationsPath],
        };
    }

    if (nodeEnv === "test") {
        return {
            type: "sqlite",
            database: ":memory:",
            synchronize: true,
            entities: [entitiesPath],
        };
    }

    return {
        type: "postgres",
        host: process.env.PGHOST,
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        port: parseInt(process.env.PGPORT!),
        database: process.env.DB,
        synchronize: false, // recria as tabelas com os dados das entities cada vez que inicia o servidor
        logging: true, // Exibe no console o log de querys geradas pelo typeorm
        entities: [entitiesPath],
        migrations: [migrationsPath],
    };
};

const dataSourceConfig = setDataSourceConfig();
export default new DataSource(dataSourceConfig);

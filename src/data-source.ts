import "reflect-metadata";
import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";

const setDataSourceConfig = (): DataSourceOptions => {
    const nodeEnv = process.env.NODE_ENV;

    if (nodeEnv === "production") {
        return {
            type: "postgres",
            url: process.env.DATABASE_URL,
            entities: ["src/entities/**/*.ts"],
            migrations: ["src/migrations/**/*.ts"],
        };
    }

    if (nodeEnv === "test") {
        return {
            type: "sqlite",
            database: ":memory:",
            synchronize: true,
            entities: ["src/entities/**/*.ts"],
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
        entities: ["src/entities/**/*.ts"],
        migrations: ["src/migrations/**/*.ts"],
    };
};

const dataSourceConfig = setDataSourceConfig();
export default new DataSource(dataSourceConfig);

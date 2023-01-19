import app from "./app";
import AppDataSource from "./data-source";

(async () => {
    await AppDataSource.initialize().catch((err) => {
        console.error("Error during Data Source initialization", err);
    });

    let PORT = process.env.PORT || 3000;

    if (process.env.NODE_ENV === "test") PORT = 3001;

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
})();

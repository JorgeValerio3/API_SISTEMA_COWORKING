import pool from "../config/db.js";
import type { PoolConnection } from "mysql2/promise";

/**
 * Ejecuta una función dentro de una transacción MySQL.
 * Si la función lanza un error, se hace ROLLBACK automáticamente.
 * La conexión siempre se libera al pool al finalizar.
 */
export async function withTransaction<T>(
    fn: (conn: PoolConnection) => Promise<T>
): Promise<T> {
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        const result = await fn(conn);
        await conn.commit();
        return result;
    } catch (err) {
        await conn.rollback();
        throw err;
    } finally {
        conn.release();
    }
}

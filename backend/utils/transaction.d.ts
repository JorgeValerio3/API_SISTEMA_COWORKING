import type { PoolConnection } from "mysql2/promise";
/**
 * Ejecuta una función dentro de una transacción MySQL.
 * Si la función lanza un error, se hace ROLLBACK automáticamente.
 * La conexión siempre se libera al pool al finalizar.
 */
export declare function withTransaction<T>(fn: (conn: PoolConnection) => Promise<T>): Promise<T>;
//# sourceMappingURL=transaction.d.ts.map
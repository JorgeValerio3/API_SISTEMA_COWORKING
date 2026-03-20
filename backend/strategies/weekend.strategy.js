/**
 * Descuento de fin de semana: -15% si el día es sábado o domingo.
 */
export class WeekendStrategy {
    name = "Descuento Fin de Semana (-15%)";
    apply(ctx, currentTotal) {
        const isWeekend = ctx.dayOfWeek === 0 || ctx.dayOfWeek === 6;
        if (isWeekend) {
            return currentTotal * 0.85;
        }
        return currentTotal;
    }
}
//# sourceMappingURL=weekend.strategy.js.map
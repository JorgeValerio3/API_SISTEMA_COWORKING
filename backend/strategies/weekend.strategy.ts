import type { PricingStrategy, PricingContext } from "../types/pricing.types.js";

/**
 * Descuento de fin de semana: -15% si el día es sábado o domingo.
 */
export class WeekendStrategy implements PricingStrategy {
    name = "Descuento Fin de Semana (-15%)";

    apply(ctx: PricingContext, currentTotal: number): number {
        const isWeekend = ctx.dayOfWeek === 0 || ctx.dayOfWeek === 6;
        if (isWeekend) {
            return currentTotal * 0.85;
        }
        return currentTotal;
    }
}

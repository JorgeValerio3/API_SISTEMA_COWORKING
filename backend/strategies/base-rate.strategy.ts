import type { PricingStrategy, PricingContext } from "../types/pricing.types.js";

/**
 * Tarifa base: priceHour × hours.
 * Siempre se aplica primero.
 */
export class BaseRateStrategy implements PricingStrategy {
    name = "Tarifa Base";

    apply(ctx: PricingContext, _currentTotal: number): number {
        return ctx.baseRatePerHour * ctx.hours;
    }
}

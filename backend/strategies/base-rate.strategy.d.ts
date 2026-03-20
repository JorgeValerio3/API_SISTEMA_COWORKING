import type { PricingStrategy, PricingContext } from "../types/pricing.types.js";
/**
 * Tarifa base: priceHour × hours.
 * Siempre se aplica primero.
 */
export declare class BaseRateStrategy implements PricingStrategy {
    name: string;
    apply(ctx: PricingContext, _currentTotal: number): number;
}
//# sourceMappingURL=base-rate.strategy.d.ts.map
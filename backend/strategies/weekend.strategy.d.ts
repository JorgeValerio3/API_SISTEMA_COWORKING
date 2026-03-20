import type { PricingStrategy, PricingContext } from "../types/pricing.types.js";
/**
 * Descuento de fin de semana: -15% si el día es sábado o domingo.
 */
export declare class WeekendStrategy implements PricingStrategy {
    name: string;
    apply(ctx: PricingContext, currentTotal: number): number;
}
//# sourceMappingURL=weekend.strategy.d.ts.map
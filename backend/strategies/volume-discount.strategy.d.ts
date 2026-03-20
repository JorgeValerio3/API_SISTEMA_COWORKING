import type { PricingStrategy, PricingContext } from "../types/pricing.types.js";
/**
 * Descuento por volumen de horas reservadas.
 * > 8 horas: -10%
 * > 4 horas: -5%
 */
export declare class VolumeDiscountStrategy implements PricingStrategy {
    name: string;
    apply(ctx: PricingContext, currentTotal: number): number;
}
//# sourceMappingURL=volume-discount.strategy.d.ts.map
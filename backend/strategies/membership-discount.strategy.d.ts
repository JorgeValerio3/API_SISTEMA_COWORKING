import type { PricingStrategy, PricingContext } from "../types/pricing.types.js";
/**
 * Descuento por tipo de membresía del usuario.
 * Premium: -10%
 * Enterprise: -20%
 * Basic: sin descuento
 */
export declare class MembershipDiscountStrategy implements PricingStrategy {
    name: string;
    apply(ctx: PricingContext, currentTotal: number): number;
}
//# sourceMappingURL=membership-discount.strategy.d.ts.map
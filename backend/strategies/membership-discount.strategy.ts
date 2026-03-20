import type { PricingStrategy, PricingContext } from "../types/pricing.types.js";

/**
 * Descuento por tipo de membresía del usuario.
 * Premium: -10%
 * Enterprise: -20%
 * Basic: sin descuento
 */
export class MembershipDiscountStrategy implements PricingStrategy {
    name = "Descuento por Membresía";

    apply(ctx: PricingContext, currentTotal: number): number {
        switch (ctx.userMembershipTypeId) {
            case 3: // Enterprise
                this.name = "Descuento por Membresía Enterprise (-20%)";
                return currentTotal * 0.80;
            case 2: // Premium
                this.name = "Descuento por Membresía Premium (-10%)";
                return currentTotal * 0.90;
            default: // Basic
                return currentTotal;
        }
    }
}

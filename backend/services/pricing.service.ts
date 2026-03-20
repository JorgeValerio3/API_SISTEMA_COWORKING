import type { PricingContext, PricingResult, PricingStrategy } from "../types/pricing.types.js";
import { BaseRateStrategy } from "../strategies/base-rate.strategy.js";
import { WeekendStrategy } from "../strategies/weekend.strategy.js";
import { MembershipDiscountStrategy } from "../strategies/membership-discount.strategy.js";
import { VolumeDiscountStrategy } from "../strategies/volume-discount.strategy.js";

/**
 * Motor de precios dinámicos.
 * Aplica estrategias secuencialmente (pipeline):
 * cada descuento se calcula sobre el resultado anterior.
 */
class PricingService {
    private strategies: PricingStrategy[];

    constructor() {
        this.strategies = [
            new BaseRateStrategy(),
            new WeekendStrategy(),
            new MembershipDiscountStrategy(),
            new VolumeDiscountStrategy(),
        ];
    }

    calculate(ctx: PricingContext): PricingResult {
        let currentTotal = 0;
        const discounts: { name: string; amount: number }[] = [];

        for (const strategy of this.strategies) {
            const before = currentTotal;
            currentTotal = strategy.apply(ctx, currentTotal);
            const diff = before - currentTotal;
            if (diff > 0) {
                discounts.push({ name: strategy.name, amount: Math.round(diff * 100) / 100 });
            }
        }

        return {
            subtotal: Math.round(ctx.baseRatePerHour * ctx.hours * 100) / 100,
            discounts,
            total: Math.max(Math.round(currentTotal * 100) / 100, 0),
        };
    }
}

export default new PricingService();

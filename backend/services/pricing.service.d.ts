import type { PricingContext, PricingResult } from "../types/pricing.types.js";
/**
 * Motor de precios dinámicos.
 * Aplica estrategias secuencialmente (pipeline):
 * cada descuento se calcula sobre el resultado anterior.
 */
declare class PricingService {
    private strategies;
    constructor();
    calculate(ctx: PricingContext): PricingResult;
}
declare const _default: PricingService;
export default _default;
//# sourceMappingURL=pricing.service.d.ts.map
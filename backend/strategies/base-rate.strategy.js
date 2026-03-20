/**
 * Tarifa base: priceHour × hours.
 * Siempre se aplica primero.
 */
export class BaseRateStrategy {
    name = "Tarifa Base";
    apply(ctx, _currentTotal) {
        return ctx.baseRatePerHour * ctx.hours;
    }
}
//# sourceMappingURL=base-rate.strategy.js.map
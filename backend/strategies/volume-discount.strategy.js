/**
 * Descuento por volumen de horas reservadas.
 * > 8 horas: -10%
 * > 4 horas: -5%
 */
export class VolumeDiscountStrategy {
    name = "Descuento por Volumen de Horas";
    apply(ctx, currentTotal) {
        if (ctx.hours > 8) {
            this.name = "Descuento por Volumen >8h (-10%)";
            return currentTotal * 0.90;
        }
        if (ctx.hours > 4) {
            this.name = "Descuento por Volumen >4h (-5%)";
            return currentTotal * 0.95;
        }
        return currentTotal;
    }
}
//# sourceMappingURL=volume-discount.strategy.js.map
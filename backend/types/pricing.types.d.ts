export interface PricingContext {
    baseRatePerHour: number;
    hours: number;
    dayOfWeek: number;
    userMembershipTypeId: number;
    spacesMembershipTypeId: number;
}
export interface PricingResult {
    subtotal: number;
    discounts: {
        name: string;
        amount: number;
    }[];
    total: number;
}
export interface PricingStrategy {
    name: string;
    apply(ctx: PricingContext, currentTotal: number): number;
}
//# sourceMappingURL=pricing.types.d.ts.map
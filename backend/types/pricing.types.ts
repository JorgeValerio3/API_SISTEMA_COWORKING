export interface PricingContext {
    baseRatePerHour: number;
    hours: number;
    dayOfWeek: number;              // 0=Sunday, 6=Saturday
    userMembershipTypeId: number;   // 1=Basic, 2=Premium, 3=Enterprise
    spacesMembershipTypeId: number;
}

export interface PricingResult {
    subtotal: number;
    discounts: { name: string; amount: number }[];
    total: number;
}

export interface PricingStrategy {
    name: string;
    apply(ctx: PricingContext, currentTotal: number): number;
}

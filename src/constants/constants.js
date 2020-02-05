export const PRE_BUDGET_SLAB = [
  {
    percentage: 30,
    start: 1000001,
    end: Infinity,
    rebate: false
  },
  {
    percentage: 20,
    start: 500001,
    end: 1000000,
    rebate: false
  },
  {
    percentage: 5,
    start: 250001,
    end: 500000,
    rebate: true
  },
  {
    percentage: 0,
    start: 0,
    end: 250000,
    rebate: false
  }
];

export const POST_BUDGET_SLAB = [
  {
    percentage: 30,
    start: 1500001,
    end: Infinity,
    rebate: false
  },
  {
    percentage: 25,
    start: 1250001,
    end: 1500000,
    rebate: false
  },
  {
    percentage: 20,
    start: 1000001,
    end: 1250000,
    rebate: false
  },
  {
    percentage: 15,
    start: 750001,
    end: 1000000,
    rebate: false
  },
  {
    percentage: 10,
    start: 500001,
    end: 750001,
    rebate: false
  },
  {
    percentage: 5,
    start: 250001,
    end: 500000,
    rebate: true
  },
  {
    percentage: 0,
    start: 0,
    end: 250000,
    rebate: false
  }
];
export const DEFAULT_SALARY_BREAKUP = {
  basic: 40,
  HRA: 50,
  HRA_CLAIM: 60,
  CLAIM_80C: 100,
  metro: false
};
export const HEALTH_EDU_CESS = 4;
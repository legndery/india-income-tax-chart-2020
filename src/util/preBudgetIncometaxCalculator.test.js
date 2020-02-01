import { preBudgetTaxCalculator } from './preBudgetIncometaxCalculator'

describe('income tax prebudget', ()=>{
  it('calculations check', () => {
    expect(preBudgetTaxCalculator(1200000)).toBe(163800);
    expect(preBudgetTaxCalculator(1900000)).toBe(382200);
  });
})


import {
  POST_BUDGET_SLAB,
} from "../constants/constants";

const calculateInslabSalary = (currentSalary, slab, slabStarted) => {
  const salary_in_slab = {
    start: currentSalary - slab.start < 0 ? 0 : currentSalary - slab.start,
    end: currentSalary - slab.end < 0 ? 0 : currentSalary - slab.end
  };
  if (!slabStarted && slab.rebate) {
    return 0;
  }
  return salary_in_slab.start - salary_in_slab.end;
};

const roundPrecision = (preciseTax, precision) =>{
  return Math.round(preciseTax / precision) * precision;
}

const postBudgetTaxCalculator = (salary) => {
  let currentSalary = salary;
  let slabStarted = false;

  const totalIncomeTax = POST_BUDGET_SLAB.reduce((p, c) => {
    const salary_in_slab = calculateInslabSalary(currentSalary, c, slabStarted);
    slabStarted = salary_in_slab > 0;
    p += (salary_in_slab * c.percentage) / 100;
    return p;
  }, 0);

  return roundPrecision(totalIncomeTax, 10);
};

export { postBudgetTaxCalculator };

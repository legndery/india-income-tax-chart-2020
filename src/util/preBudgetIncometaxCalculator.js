import { PRE_BUDGET_SLAB, HEALTH_EDU_CESS } from "../constants/constants";
import { generateDeduction } from "../modules/deductions";
import _ from "lodash";

const totalDeductions = (salary, deductionArr) => {

  return generateDeduction({
    d80CAmt: _.get(deductionArr, "d80CAmt") || 0,
    totalSalary: salary,
    salaryBreakup: _.get(deductionArr, "salaryBreakup") || {
      basic: 0,
      HRA: 0,
      HRA_CLAIM: 0,
      CLAIM_80C: 0,
      metro: false
    }
  });
};

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

const roundPrecision = (preciseTax, precision) => {
  return Math.round(preciseTax / precision) * precision;
};

const preBudgetTaxCalculator = (salary, deductionArray) => {
  let currentSalary = salary;
  let slabStarted = false;
  currentSalary -= totalDeductions(salary, deductionArray);

  const totalIncomeTax = PRE_BUDGET_SLAB.reduce((p, c) => {
    const salary_in_slab = calculateInslabSalary(currentSalary, c, slabStarted);
    slabStarted = salary_in_slab > 0;
    p += (salary_in_slab * c.percentage) / 100;
    return p;
  }, 0);

  //health and education cess
  const preciseTax = (totalIncomeTax * (100 + HEALTH_EDU_CESS)) / 100;
  return roundPrecision(preciseTax, 10);
};

export { preBudgetTaxCalculator };

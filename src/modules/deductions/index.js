export class Deduction {
  constructor() {}
  formula(amount) {
    return amount;
  }
  calculateDeduction(amount) {
    return this.formula(amount);
  }
}

export class DeductionStandard extends Deduction {
  formula() {
    return 50000;
  }
}
export class Deduction80C extends Deduction {
  constructor() {
    super();
    this.max = 150000;
  }
  formula(amount) {
    return amount > this.max ? this.max : amount;
  }
}
export class HRADeduction extends Deduction {
  constructor(totalSalary, /** @type {{
    basic: 100,
    HRA: 50,
    Special: 100,
    HRA_CLAIM: 60,
    CLAIM_80C: 100,
    metro: false
  })}*/salaryBreakup){
    super();
    this.totalSalary = totalSalary;
    this.salaryBreakup = salaryBreakup;
  }
  formula(){
    let basic = this.totalSalary*(this.salaryBreakup.basic/100);
    basic = basic < 0? 0:basic;
    let hra = basic*(this.salaryBreakup.HRA/100);
    hra = hra < 0? 0: hra;
    let hraConsumed = hra*(this.salaryBreakup.HRA_CLAIM/100);
    hraConsumed = hraConsumed<0?0:hraConsumed;
    const actualHra = Math.min(
      basic*(this.salaryBreakup.metro?0.5:0.4),
      hra,
      hraConsumed - (0.1*basic)<0?0:hraConsumed - (0.1*basic)
    )
    return actualHra;
  }
}

export function generateDeduction({ d80CAmt, salaryBreakup, totalSalary }) {
  // console.log(d80CAmt);
  // console.log(salaryBreakup);
  const d80c = new Deduction80C().calculateDeduction(d80CAmt);
  const dStd = new DeductionStandard().calculateDeduction();
  const hra = new HRADeduction(totalSalary, salaryBreakup).calculateDeduction();
  // console.log(hra);
  return d80c + dStd + hra;
}

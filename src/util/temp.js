const c = {
  start: 100,
  end: 150
};
[100, 105, 110, 120, 125, 130, 145, 180, 190].forEach(currentSalary => {
  const salary_in_slab = {
    start: (currentSalary - c.start)<=0? 0: (currentSalary - c.start),
    end: (currentSalary - c.end)<=0? 0: (currentSalary - c.end),
  }
  console.log()
  console.log(currentSalary);
  console.log(salary_in_slab);
  console.log(salary_in_slab.start - salary_in_slab.end);
});


export function CalcTotal(val)
{

const total = val.reduce((a, { currentYear, lastYear, type }) => {
  const mult = type === '+' ? 1 : -1;
  a.currentYear += mult * currentYear;
  a.lastYear += mult * lastYear;
  return a;
}, { currentYear: 0, lastYear: 0});
console.log('real total',total);
//debugger
   
    return total
}
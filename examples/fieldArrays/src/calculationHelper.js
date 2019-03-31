export function CalcTotal(val)
{
//todo create calc

//const items = [{amount1: '100', amount2: '50', name: 'Ruud'}, {amount1: '40', amount2: '60', name: 'Ted'}];
// let val = [{
//     currentYear: '11',
//     lastYear: '12',
//     name: 'Bert',
//     type: '+'
//   },
//   {
//     currentYear: '2',
//     lastYear: '4',
//     name: 'Ed',
//     type: '-'
//   }
// ];
const total = val.reduce((a, { currentYear, lastYear, type }) => {
  const mult = type === '+' ? 1 : -1;
  a.currentYear += mult * currentYear;
  a.lastYear += mult * lastYear;
  return a;
}, { currentYear: 0, lastYear: 0});
console.log('real total',total);
//debugger
   
    return 2
}
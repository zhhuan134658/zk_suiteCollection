const fpMul = (num1: number, num2: number) => {
  let m = 0;
  const s1 = Number(num1).toString();
  const s2 = Number(num2).toString();
  try {
    m += s1.split('.')[1].length;
  } catch (e) {}
  try {
    m += s2.split('.')[1].length;
  } catch (e) {}
  return (
    (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
    Math.pow(10, m)
  );
};

const fpAdd = (num1: number, num2: number) => {
  let r1: number, r2: number;
  try {
    r1 = Number(num1).toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = Number(num2).toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  const m = Math.pow(10, Math.max(r1, r2));
  // return (num1*m+num2*m)/m;
  return Math.round(num1 * m + num2 * m) / m;
};

const fpDivide = (num1: number, num2: number) => {
  let t1: number, t2: number;
  try {
    t1 = Number(num1).toString().split('.')[1].length;
  } catch (e) {
    t1 = 0;
  }
  try {
    t2 = Number(num2).toString().split('.')[1].length;
  } catch (e) {
    t2 = 0;
  }
  const r1 = Number(num1.toString().replace('.', ''));
  const r2 = Number(num2.toString().replace('.', ''));
  return (r1 / r2) * Math.pow(10, t2 - t1);
};

const toFixed = (digits: number, bits: number) => {
  return Math.round(digits * Math.pow(10, bits)) / Math.pow(10, bits);
};

export { fpAdd, fpDivide, fpMul, toFixed };

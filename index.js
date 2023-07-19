const polyModes = { 1: 'Access', 2: 'Trunk', 3: 'Hybrid' };
const balances = [
  'src-mac',
  'dst-mac',
  'src-dst-mac',
  'src-ip',
  'dst-ip',
  'src-dst-ip',
];
const isUndef = (v) => v === undefined || v === null || v === '';
function getSysTzTime(v) {
  const gap = __tz__ || (__tz__ = parseInt(storage('__tz__') || 0));

  return v ? v + gap * 60 * 60 : '';
}
export default function (Vue) {
  Vue.filter('isRail', (v, u) => (isUndef(v) ? '--' : u ? `${v}${u}` : v));

  Vue.filter('isNa', (v, u) => (isUndef(v) ? 'N/A' : u ? `${v}${u}` : v));

  Vue.filter('toFixed', (v, u) =>
    typeof v === 'number' ? v.toFixed(isUndef(u) ? 2 : u) : v
  );

  Vue.filter('isMode', (v, a, b) =>
    [undefined, null, ''].includes(v) ? '--' : v ? a : b
  );

  Vue.filter('isNaMode', (v, a, b) =>
    [undefined, null, NaN].includes(v) ? 'N/A' : v ? a : b
  );

  Vue.filter('status', (v) => ['Down', '', 'Up', 'Shutoff'][v] || '--');

  Vue.filter('formatTime', (v) =>
    v && typeof v === 'number'
      ? new Date(parseInt(v) * 1000).toLocaleString().replace(/\//g, '-')
      : '--'
  );

  Vue.filter('formatTimeNa', (v) =>
    v && typeof v === 'number'
      ? new Date(parseInt(v) * 1000).toLocaleString().replace(/\//g, '-')
      : 'N/A'
  );

  Vue.filter('isKongNa', (v, u) =>
    !v && v !== 0 ? 'N/A' : u ? `${v}${u}` : v
  );

  Vue.filter('isKongRail', (v, u) =>
    !v && v !== 0 ? '--' : u ? `${v}${u}` : v
  );

  Vue.filter('toUpper', (v) => v.toUpperCase());

  Vue.filter('isPolyMode', (v) => polyModes[v] || v);

  Vue.filter('isBalanceMode', (v) => balances[v] || v);

  Vue.filter('toSysTzTime', (v) => getSysTzTime(v));
}

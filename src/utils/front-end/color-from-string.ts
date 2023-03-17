const colors = [
  "magenta",
  "red",
  "volcano",
  "blue",
  "orange",
  "gold",
  "green",
  "cyan",
  "geekblue",
  "purple",
] as const;

type AntDColor = typeof colors[number];

export default function colorFromString(string: string): AntDColor {
  let sum = 0;
  for (let i = 0; i < string.length; i++) sum += string.charCodeAt(i);
  return colors[sum % colors.length];
}

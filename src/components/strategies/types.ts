
export interface Strategy {
  id: string;
  name: string;
  description: string;
  roulette: string;
  numbers: number[];
  color: string;
}

export const availableColors = [
  { name: "Roxo", value: "bg-purple-600" },
  { name: "Azul", value: "bg-blue-600" },
  { name: "Verde", value: "bg-emerald-600" },
  { name: "Âmbar", value: "bg-amber-600" },
  { name: "Rosa", value: "bg-rose-600" }
];

export const defaultStrategies: Strategy[] = [
  {
    id: "1",
    name: "Estratégia Pares",
    description: "Apostando em números pares",
    roulette: "Qualquer",
    numbers: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36],
    color: "bg-purple-600"
  },
  {
    id: "2",
    name: "Grupo 123",
    description: "Apostando no grupo 123",
    roulette: "Roleta Europeia",
    numbers: [1, 2, 3, 11, 12, 13, 21, 22, 23, 31, 32, 33],
    color: "bg-blue-600"
  }
];

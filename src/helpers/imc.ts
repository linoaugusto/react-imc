export type Level = {
  title: string;
  color: string;
  icon: "down" | "up";
  imc: number[];
  yourImc?: number;
};

export const levels: Level[] = [
  { title: "Magreza", color: "#96A3AB", icon: "down", imc: [0, 18.5] },
  { title: "Normal", color: "#0EAD69", icon: "up", imc: [18.5, 25] },
  { title: "Sobrepeso", color: "#E2B039", icon: "down", imc: [25, 30] },
  { title: "Obesidade", color: "#C3423F", icon: "down", imc: [30, 100] },
];

export const calculateImc = (altura: number, peso: number) => {
  const imc = peso / (altura * altura);
  for (let i = 0; i < levels.length; i++) {
    if (imc > levels[i].imc[0] && imc <= levels[i].imc[1]) {
      let levelCopy: Level = { ...levels[i] };
      levelCopy.yourImc = imc;

      return levelCopy;
    }
  }
  return null;
};

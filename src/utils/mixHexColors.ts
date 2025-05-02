export function mixHexColors(
  hex1: string,
  hex2: string,
  ratio: number = 0.5
): string {
  // hexからRGBへ
  const hexToRgb = (hex: string) => {
    const cleanHex = hex.replace("#", "");
    const num = parseInt(cleanHex, 16);
    return [(num >> 16) & 0xff, (num >> 8) & 0xff, num & 0xff];
  };
  // RGBからhexへ
  const rgbToHex = (rgb: number[]) =>
    "#" +
    rgb
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();

  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  // 比率で混ぜる
  const mixed = rgb1.map((v, i) =>
    Math.round(v * ratio + rgb2[i] * (1 - ratio))
  );

  return rgbToHex(mixed);
}

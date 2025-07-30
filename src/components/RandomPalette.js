export default function defaultCardSetter() {
  let n = Math.floor(Math.random() * 18);
  const paletteList = [
    {
      id: 0,
      text: {
        clr1: "#5E936C",
        clr2: "#93DA97",
        clr3: "#E8FFD7",
      },
    },
    {
      id: 1,
      text: {
        clr1: "#D9A490",
        clr2: "#EBD4B9",
        clr3: "#EEEEEE",
      },
    },
    {
      id: 2,
      text: {
        clr1: "#86B6F6",
        clr2: "#B4D4FF",
        clr3: "#EEF5FF",
      },
    },
    {
      id: 3,
      text: {
        clr1: "#D25D5D",
        clr2: "#E7D3D3",
        clr3: "#EEEEEE",
      },
    },
    {
      id: 4,
      text: {
        clr1: "#D34A4A",
        clr2: "#E57979",
        clr3: "#F6CFCF",
      },
    },
    {
      id: 5,
      text: {
        clr1: "#748DAE",
        clr2: "#F5CBCB",
        clr3: "#FFEAEA",
      },
    },
    {
      id: 6,
      text: {
        clr1: "#A2AADB",
        clr2: "#C0C9EE",
        clr3: "#FFF2E0",
      },
    },
    {
      id: 7,
      text: {
        clr1: "#B0DB9C",
        clr2: "#DDF6D2",
        clr3: "#FFFFFF",
      },
    },
    {
      id: 8,
      text: {
        clr1: "#86A788",
        clr2: "#EEE7DA",
        clr3: "#FFFFFF",
      },
    },
    {
      id: 9,
      text: {
        clr1: "#A5DD9B",
        clr2: "#F2C18D",
        clr3: "#F6F193",
      },
    },
    {
      id: 10,
      text: {
        clr1: "#BC9F8B",
        clr2: "#CADABF",
        clr3: "#E7E8D8",
      },
    },
    {
      id: 11,
      text: {
        clr1: "#8455DD",
        clr2: "#BA9DF1",
        clr3: "#F3EEFC",
      },
    },
    {
      id: 12,
      text: {
        clr1: "#FA812F",
        clr2: "#FFB22C",
        clr3: "#FEF3E2",
      },
    },
    {
      id: 13,
      text: {
        clr1: "#3E3232",
        clr2: "#7E6363",
        clr3: "#A87C7C",
      },
    },
    {
      id: 14,
      text: {
        clr1: "#363062",
        clr2: "#818FB4",
        clr3: "#F5E8C7",
      },
    },
    {
      id: 15,
      text: {
        clr1: "#5C5470",
        clr2: "#B9B4C7",
        clr3: "#FAF0E6",
      },
    },
    {
      id: 16,
      text: {
        clr1: "#352F44",
        clr2: "#5C5470",
        clr3: "#FAF0E6",
      },
    },
    {
      id: 17,
      text: {
        clr1: "#CE88B7",
        clr2: "#E6B2BA",
        clr3: "#FFF7F3",
      },
    },
  ];

  let chosenPalette = paletteList.find((items) => items.id === n);
  return {
    color_1: chosenPalette.text.clr1,
    color_2: chosenPalette.text.clr2,
    color_3: chosenPalette.text.clr3,
  };
}

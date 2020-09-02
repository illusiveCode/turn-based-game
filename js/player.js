import { weapon0 } from "./assets";

class Player {
  constructor(name, image, lastId = 0) {
    this.id = lastId + 1;
    this.name = name;
    this.image = image;
  }

  // Generating players with their inital stats
  generate = () => {
    return {
      id: this.id,
      name: this.name,
      image: `<img src="${this.image}" alt="${this.name}" />`,
      weapon: {
        image: `<img src="${weapon0}" alt="" data-damage="10" />`,
        damage: 10,
      },
      lifePoints: 100,
      location: {
        row: 0,
        column: 0,
      },
      shield: false,
    };
  };
}

export default Player;

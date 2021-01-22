class Player {
  constructor(name, image, weapon, lastId = 0) {
      this.id = lastId + 1;
      this.name = name;
      this.image = image;
      this.weapon = weapon;
  }

  // Generating players with their inital stats
  generate = () => {
      return {
          id: this.id,
          name: this.name,
          image: `<img src="${this.image}" alt="${this.name}" />`,
          weapon: {
              image: `<img src="${this.weapon}" alt="" data-damage="10" />`,
              damage: 10,
              oldWeapon: "",
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

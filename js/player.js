class Player {
  constructor(name, image, lastId = 0) {
    this.id = lastId + 1;
    this.name = name;
    this.image = image;
  }

  generate = () => {
    return {
      id: this.id,
      name: this.name,
      image: `<img src="${this.image}" alt="${this.name}" />`,
      weapon: {
        name: "gauntlet",
      },
      lifePoints: 100,
      location: {
        row: 0,
        column: 0,
      },
    };
  };
}

export default Player;

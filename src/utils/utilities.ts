export const objectToQueryParams = (params): string => {
    if(!params){
        return null
    }
    let queryString = ''
    Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => queryString = queryString+`${key}=${v}&`);
        } else {
            queryString = queryString+`${key}=${value}&`
        }
      })
      return queryString.slice(0,-1);
};

export const MAIN_URL = `https://frontend-take-home-service.fetch.com`;

export const messages = {
  noDogsFound: "No Dogs Found",
  NoDogsFoundMessage:"🐾 Oops! We couldn't find any furry friends that match your search criteria. But don’t worry! You can try adjusting your filters or searching for different breeds. Your perfect companion might just be a click away! Happy searching! 🐶💕"
}

export const noFavFound = "Uh-oh, your favorites list is feeling a little lonely! 🐾 Why not browse through the adorable dogs and find your next furry friend to add? Your future best buddy is just a click away!"

export const MatchMessages = [
  "I love chasing frisbees in the park! Nothing beats a good game of fetch. 🎾🐕",
  "Cuddles are my specialty. I'm the perfect snuggle buddy after a long day. 🐶❤️",
  "Catch me zooming around the yard! I’ve got lots of energy and love to play. 🏃‍♂️🐾",
  "I’m a water lover! Splashing in the lake is my idea of a perfect day. 💦🐕",
  "Treats? Did someone say treats? I’ll do anything for a yummy snack. 🍖🐾",
  "I might look tough, but I’m a total softie at heart. Belly rubs are my weakness! 🐾💕",
  "I’m super friendly and love making new friends—humans and dogs alike! 🐕👫",
  "Adventure awaits! I’m always ready for a hike or a long walk in the woods. 🌲🐕‍🦺",
  "I’m a curious explorer, always sniffing out new things and places. 🐕👃",
  "I’m a couch potato at heart. Let’s relax and watch some TV together! 📺🐾"
];

const customCardColors = [
    "#ffccb0",
    "#ffdbe0",
    "#e0c4c8",
    "hsla(41, 100.00%, 76.34%, 1.00)",
    "#ecc3ee",
    "#ff8d7b",
    "#fddbff",
    "#ffccb0",
    "#ffe8d0",
    "rgb(236, 195, 238)",
    "rgb(151, 181, 255)"
  ];
export const getColorClass = (index:number) => {
    const randomIndex = Math.floor(index%customCardColors.length);
    return customCardColors[randomIndex];
  };
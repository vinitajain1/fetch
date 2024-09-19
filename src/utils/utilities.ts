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
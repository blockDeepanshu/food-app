export const useMenuCardList = (menu, isVeg) => {
  const itemcards = menu.categories
    ? menu.categories.map((item) => item.itemCards).flat(1)
    : menu.carousel
    ? menu.carousel.map((item) => item.dish)
    : menu.itemCards;

  let cardInfoList = itemcards.map((item) => {
    return item.card ? item.card.info : item.info;
  });

  // console.log("cardInfoList", cardInfoList);

  if (isVeg) {
    cardInfoList = cardInfoList.filter((item) => {
      return item.isVeg === 1;
    });
  }

  return cardInfoList;
};

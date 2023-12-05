export const useMenuCardList = (menu) => {
  const itemcards = menu.categories
    ? menu.categories.map((item) => item.itemCards).flat(1)
    : menu.carousel
    ? menu.carousel.map((item) => item.dish)
    : menu.itemCards;

  console.log(itemcards);

  const cardInfoList = itemcards.map((item) => {
    return item.card ? item.card.info : item.info;
  });

  return cardInfoList;
};

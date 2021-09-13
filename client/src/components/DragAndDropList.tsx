import { useState } from "react";
import Sortable from "sortablejs";

export const DragAndDropList = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      text: "Write a cool JS library",
    },
    {
      id: 2,
      text: "Make it generic enough",
    },
    {
      id: 3,
      text: "Write README",
    },
    {
      id: 4,
      text: "Create some examples",
    },
    {
      id: 5,
      text: "Spam in Twitter and IRC to promote it (note that this element is taller than the others)",
    },
    {
      id: 6,
      text: "???",
    },
    {
      id: 7,
      text: "PROFIT",
    },
  ]);

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const dragCard = cards[dragIndex];
    // setCards(
    //   update(cards, {
    //     $splice: [
    //       [dragIndex, 1],
    //       [hoverIndex, 0, dragCard],
    //     ],
    //   })
    // );
  };

  const el =
    typeof document != undefined &&
    (document.getElementById("items") as HTMLElement);
  const s =
    el &&
    Sortable.create(el, {
      group: "items",
      animation: 100,
    });

  console.log("%c  ", "background: purple; color: white", s);

  return (
    <div>
      <div id="items">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </div>
    </div>
  );
};

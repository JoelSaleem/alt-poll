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
      onUpdate: (e) => {
        console.log("%c e ", "background: purple; color: white", e);
      },
    });

  //   console.log(
  //     "%c test ",
  //     "background: purple; color: white",
  //     ?.map((el) => el?.id)
  //   );

  // @ts-ignore
  const a = Array.from(s?.el?.children ?? []);

  console.log(
    "%c a ",
    "background: purple; color: white",
    // @ts-ignore
    a.map((el) => el?.id)
  );

  return (
    <div>
      <div id="items">
        <div id="asdfasf">1</div>
        <div id="aaaa">2</div>
        <div id="asdfafd">3</div>
      </div>
    </div>
  );
};

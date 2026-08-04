export const DEMO_COUNTS = {
  categories: 6,
  items: 32,
  suppliers: 5,
  warehouses: 2,
};

export const DEMO_WAREHOUSES = [
  {
    id: "w-main",
    items: [
      {
        id: "it-1",
        imageUrl: "/item-placeholder.svg",
        quantity: 120,
        title: "Lốp xe Nhật",
      },
      {
        id: "it-2",
        imageUrl: "/item-placeholder.svg",
        quantity: 40,
        title: "Dầu động cơ",
      },
      {
        id: "it-3",
        imageUrl: "/item-placeholder.svg",
        quantity: 30,
        title: "Bộ lọc gió",
      },
    ],
    stockQuantity: 190,
    title: "Kho chính",
  },
  {
    id: "w-cys",
    items: [
      {
        id: "it-4",
        imageUrl: "/item-placeholder.svg",
        quantity: 50,
        title: "Phanh đĩa",
      },
      {
        id: "it-5",
        imageUrl: "/item-placeholder.svg",
        quantity: 30,
        title: "Bugi đánh lửa",
      },
    ],
    stockQuantity: 80,
    title: "Kho chi nhánh",
  },
];

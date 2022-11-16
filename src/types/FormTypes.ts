export type TDishType = string;

export type TDish =
  | object
  | {
      name: string;
      preparation_time: string;
      type: TDishType;
      no_of_slices?: number;
      diameter?: number;
      spiciness_scale?: number;
      slices_of_bread?: number;
    };

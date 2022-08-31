export type CreateOrder = {
  from: {
    code: string;
    name: string;
    amount: number;
  };
  to: {
    code: string;
    name: string;
    amount: number;
  };
  email: string;
  requisites: string;
  userName: string;
};

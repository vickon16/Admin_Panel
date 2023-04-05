export const data = [
  {
    name: "January",
    total : 1200,
    get deviation () {
      return (this.total + this.expenses) / 2
    },
    expenses : 1200,
  },
  {
    name: "Febuary",
    total : 1500,
    get deviation () {
      return (this.total + this.expenses) / 2
    },
    expenses : 1800,
  },
  {
    name: "March",
    total : 1000,
    get deviation () {
      return (this.total + this.expenses) / 2
    },
    expenses : 800,
  },
  {
    name: "April",
    total : 1900,
    get deviation () {
      return (this.total + this.expenses) / 2
    },
    expenses : 1600,
  },
  {
    name: "May",
    total : 1600,
    get deviation () {
      return (this.total + this.expenses) / 2
    },
    expenses : 900,
  },
  {
    name: "June",
    total : 1100,
    get deviation () {
      return (this.total + this.expenses) / 2
    },
    expenses : 1100,
  },
];

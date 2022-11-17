import ICar from '../Interfaces/ICar';

class Car {
  protected id: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status: boolean;
  protected buyValue: number;
  private doorsQty: number;
  private seatsQty: number;

  constructor(
    {
      id,
      model,
      year,
      color,
      buyValue,
      doorsQty,
      seatsQty,
      status,
    }:ICar,
  ) {
    this.id = id;
    this.model = model;
    this.year = year;
    this.color = color;
    this.buyValue = buyValue;
    this.doorsQty = doorsQty;
    this.seatsQty = seatsQty;
    this.status = status || false;
  }

  // public setId(id: string) {
  //   this.id = id;
  // }

  // public getId() {
  //   return this.id;
  // }

  // public setModel(model: string) {
  //   this.model = model;
  // }

  // public getModel() {
  //   return this.model;
  // }

  // public setYear(year: number) {
  //   this.year = year;
  // }

  // public getYear() {
  //   return this.year;
  // }

  // public setColor(color: string) {
  //   this.color = color;
  // }

  // public getColor() {
  //   return this.color;
  // }

  // public setBuyValue(buyValue: number) {
  //   this.buyValue = buyValue;
  // }

  // public getBuyValue() {
  //   return this.buyValue;
  // }

  // public setDoorsQty(doorsQty: number) {
  //   this.doorsQty = doorsQty;
  // }

  // public getDoorsQty() {
  //   return this.doorsQty;
  // }

  // public setSeatsQty(seatsQty: number) {
  //   this.seatsQty = seatsQty;
  // }

  // public getSeatsQty() {
  //   return this.seatsQty;
  // }

  // public setStatus(status: boolean) {
  //   this.status = status;
  // }

  // public getStatus() {
  //   return this.status;
  // }
}

export default Car;
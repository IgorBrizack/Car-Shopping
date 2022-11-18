import IVehicle from './IVehicle';

export default interface IMotocycle extends IVehicle {
  category: 'Street' | 'Custom' | 'Trail';
  engineCapacity: number;
}
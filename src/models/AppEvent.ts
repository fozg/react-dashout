interface IAppEventModel {
  key: String;
  action: Function;
  payload?: Object;
}
export class AppEvent {
  key: String;
  action: Function;
  payload?: Object;

  constructor ({
    key, 
    action, 
    payload
  }: IAppEventModel) {
    this.key = key;
    this.action = action; 
    this.payload = payload;
  }
}
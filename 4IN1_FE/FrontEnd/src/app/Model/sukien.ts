export class Sukien {
  private _ID: number;
  private _event_name: string;
  private _organizer: string;
  private _Date: Date;
  private _place: string;
  private _describe_of_event: string;
  private _img: string;
  private _plan_file: string;
  private _number_of_collaborators: number;
  private _riteria: string;
  private _end_day: Date;
  private _status_of_event: string;
  private _owner_event_id: number;
  private _hot: boolean;


  get ID(): number {
    return this._ID;
  }

  set ID(value: number) {
    this._ID = value;
  }

  get event_name(): string {
    return this._event_name;
  }

  set event_name(value: string) {
    this._event_name = value;
  }

  get organizer(): string {
    return this._organizer;
  }

  set organizer(value: string) {
    this._organizer = value;
  }

  get Date(): Date {
    return this._Date;
  }

  set Date(value: Date) {
    this._Date = value;
  }

  get place(): string {
    return this._place;
  }

  set place(value: string) {
    this._place = value;
  }

  get describe_of_event(): string {
    return this._describe_of_event;
  }

  set describe_of_event(value: string) {
    this._describe_of_event = value;
  }

  get img(): string {
    return this._img;
  }

  set img(value: string) {
    this._img = value;
  }

  get plan_file(): string {
    return this._plan_file;
  }

  set plan_file(value: string) {
    this._plan_file = value;
  }

  get number_of_collaborators(): number {
    return this._number_of_collaborators;
  }

  set number_of_collaborators(value: number) {
    this._number_of_collaborators = value;
  }

  get riteria(): string {
    return this._riteria;
  }

  set riteria(value: string) {
    this._riteria = value;
  }

  get end_day(): Date {
    return this._end_day;
  }

  set end_day(value: Date) {
    this._end_day = value;
  }

  get status_of_event(): string {
    return this._status_of_event;
  }

  set status_of_event(value: string) {
    this._status_of_event = value;
  }

  get owner_event_id(): number {
    return this._owner_event_id;
  }

  set owner_event_id(value: number) {
    this._owner_event_id = value;
  }

  get hot(): boolean {
    return this._hot;
  }

  set hot(value: boolean) {
    this._hot = value;
  }

  constructor(ID: number, event_name: string, organizer: string, Date: Date, place: string, describe_of_event: string, img: string, plan_file: string, number_of_collaborators: number, riteria: string, end_day: Date, status_of_event: string, owner_event_id: number, hot: boolean) {
    this._ID = ID;
    this._event_name = event_name;
    this._organizer = organizer;
    this._Date = Date;
    this._place = place;
    this._describe_of_event = describe_of_event;
    this._img = img;
    this._plan_file = plan_file;
    this._number_of_collaborators = number_of_collaborators;
    this._riteria = riteria;
    this._end_day = end_day;
    this._status_of_event = status_of_event;
    this._owner_event_id = owner_event_id;
    this._hot = hot;
  }
}

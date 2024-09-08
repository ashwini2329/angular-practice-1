import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'any'
})

export class UserService {
  allowLinks = true;

  constructor() {}

  getAllowLinks() {
    return this.allowLinks;
  }
}

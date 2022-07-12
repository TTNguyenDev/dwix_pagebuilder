import * as ko from "knockout";
import template from "./buttonConnectWallet.html";
import { Component } from "@paperbits/common/ko/decorators";

@Component({
  selector: "button-connect-wallet",
  template: template,
})
export class ButtonConnectWallet {
  public readonly runtimeConfig: ko.Observable<string>;

  constructor() {
    this.runtimeConfig = ko.observable();
  }
}

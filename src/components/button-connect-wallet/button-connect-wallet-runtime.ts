import * as ko from "knockout";
import template from "./button-connect-wallet-runtime.html";
import {
  Component,
  RuntimeComponent,
  Param,
  OnMounted,
  OnDestroyed,
} from "@paperbits/common/ko/decorators";
import { NearConnector } from "../../utils/blockchain/NearConnector";

@RuntimeComponent({
  selector: "button-connect-wallet-runtime",
})
@Component({
  selector: "button-connect-wallet-runtime",
  template: template,
})
export class ButtonConnectWalletRuntime {
  public readonly loading: ko.Observable<boolean>;

  constructor() {
    this.loading = ko.observable(false);
  }

  @OnMounted()
  public async initialize(): Promise<void> {
    // Your initialization logic
    this.loading(false);
  }

  @OnDestroyed()
  public async dispose(): Promise<void> {
    // Your cleanup widget logic
  }

  public handleBtnConnectClick(): void {
    this.loading(true);
    const near: NearConnector = window.near;
    near.walletConnection.requestSignIn();
  }
}

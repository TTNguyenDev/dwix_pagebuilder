import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { ButtonConnectWalletModelBinder } from "./buttonConnectWalletModelBinder";
import { ButtonConnectWalletViewModelBinder } from "./buttonConnectWalletViewModelBinder";
import { ButtonConnectWallet } from "./buttonConnectWallet";

export class ButtonConnectWalletModule implements IInjectorModule {
  public register(injector: IInjector): void {
    injector.bind("buttonConnectWallet", ButtonConnectWallet);
    injector.bindToCollection("modelBinders", ButtonConnectWalletModelBinder);
    injector.bindToCollection(
      "viewModelBinders",
      ButtonConnectWalletViewModelBinder
    );
  }
}


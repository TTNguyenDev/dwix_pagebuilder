import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { ButtonConnectWalletEditor } from "./buttonConnectWalletEditor";
import { ButtonConnectWalletHandlers } from "./buttonConnectWalletHandlers";
import { ButtonConnectWalletModelBinder } from "./buttonConnectWalletModelBinder";
import { ButtonConnectWalletViewModelBinder } from "./buttonConnectWalletViewModelBinder";
import { ButtonConnectWallet } from "./buttonConnectWallet";

export class ButtonConnectWalletDesignModule implements IInjectorModule {
  public register(injector: IInjector): void {
    injector.bind("buttonConnectWalletEditor", ButtonConnectWalletEditor);
    injector.bindToCollection("widgetHandlers", ButtonConnectWalletHandlers);
    injector.bind("buttonConnectWallet", ButtonConnectWallet);
    injector.bindToCollection("modelBinders", ButtonConnectWalletModelBinder);
    injector.bindToCollection(
      "viewModelBinders",
      ButtonConnectWalletViewModelBinder
    );
  }
}

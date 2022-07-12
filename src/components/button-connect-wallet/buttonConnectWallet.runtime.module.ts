import { IInjector, IInjectorModule } from "@paperbits/common/injection";
import { ButtonConnectWalletRuntime } from "./button-connect-wallet-runtime";

export class ButtonConnectWalletRuntimeModule implements IInjectorModule {
  public register(injector: IInjector): void {
    injector.bind("buttonConnectWalletRuntime", ButtonConnectWalletRuntime);
  }
}

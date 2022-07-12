import { Bag } from "@paperbits/common";
import { ComponentFlow, IWidgetBinding } from "@paperbits/common/editing";
import { EventManager, Events } from "@paperbits/common/events";
import { ViewModelBinder } from "@paperbits/common/widgets";
import { ButtonConnectWalletModel } from "./buttonConnectWalletModel";
import { ButtonConnectWallet } from "./buttonConnectWallet";

export class ButtonConnectWalletViewModelBinder
  implements ViewModelBinder<ButtonConnectWalletModel, ButtonConnectWallet>
{
  constructor(private readonly eventManager: EventManager) {}

  public async modelToViewModel(
    model: ButtonConnectWalletModel,
    viewModel?: ButtonConnectWallet,
    bindingContext?: Bag<any>
  ): Promise<ButtonConnectWallet> {
    if (!viewModel) {
      viewModel = new ButtonConnectWallet();
    }

    viewModel.runtimeConfig(
      JSON.stringify({ initialCount: model.initialCount })
    );

    const binding: IWidgetBinding<
      ButtonConnectWalletModel,
      ButtonConnectWallet
    > = {
      name: "button-connect-wallet",
      displayName: "Button connect wallet",
      readonly: bindingContext ? bindingContext.readonly : false,
      model: model,
      flow: ComponentFlow.Block,
      draggable: true,
      editor: "button-connect-wallet-editor",
      applyChanges: async () => {
        await this.modelToViewModel(model, viewModel, bindingContext);
        this.eventManager.dispatchEvent(Events.ContentUpdate);
      },
    };

    viewModel["widgetBinding"] = binding;

    return viewModel;
  }

  public canHandleModel(model: ButtonConnectWalletModel): boolean {
    return model instanceof ButtonConnectWalletModel;
  }
}

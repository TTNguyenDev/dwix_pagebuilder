/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import { IModelBinder } from "@paperbits/common/editing";
import { ButtonConnectWalletModel } from "./buttonConnectWalletModel";
import { Contract } from "@paperbits/common";
import { ButtonConnectWalletContract } from "./buttonConnectWalletContract";

export class ButtonConnectWalletModelBinder
  implements IModelBinder<ButtonConnectWalletModel>
{
  public canHandleContract(contract: Contract): boolean {
    return contract.type === "button-connect-wallet";
  }

  public canHandleModel(model: ButtonConnectWalletModel): boolean {
    return model instanceof ButtonConnectWalletModel;
  }

  public async contractToModel(
    contract: ButtonConnectWalletContract
  ): Promise<ButtonConnectWalletModel> {
    const model = new ButtonConnectWalletModel();
    model.initialCount = contract.initialCount;
    model.styles = contract.styles;
    return model;
  }

  public modelToContract(model: ButtonConnectWalletModel): Contract {
    const contract: ButtonConnectWalletContract = {
      type: "button-connect-wallet",
      initialCount: model.initialCount,
      styles: model.styles,
    };

    return contract;
  }
}

/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import { IWidgetOrder, IWidgetHandler } from "@paperbits/common/editing";
import { ButtonConnectWalletModel } from "./buttonConnectWalletModel";

export class ButtonConnectWalletHandlers implements IWidgetHandler {
  public async getWidgetOrder(): Promise<IWidgetOrder> {
    const widgetOrder: IWidgetOrder = {
      name: "buttonConnectWallet",
      displayName: "Button connect wallet",
      iconClass: "widget-icon widget-icon-component",
      requires: ["html", "js"],
      createModel: async () => {
        return new ButtonConnectWalletModel();
      },
    };

    return widgetOrder;
  }
}

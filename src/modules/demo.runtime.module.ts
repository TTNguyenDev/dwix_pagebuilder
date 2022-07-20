/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import "@paperbits/core/ko/bindingHandlers/bindingHandlers.component";
import { IInjector, IInjectorModule } from "@paperbits/common/injection";
import { StaticUserService } from "../user/staticUserService";
import { StaticRoleService } from "../user/staticRoleService";
import { ClickCounterRuntimeModule } from "../components/click-counter/clickCounter.runtime.module";
import { ButtonConnectWalletRuntimeModule } from "../components/button-connect-wallet/buttonConnectWallet.runtime.module";
import { BlockChainConnector } from "../utils/blockchain";

export class DemoRuntimeModule implements IInjectorModule {
  public register(injector: IInjector): void {
    BlockChainConnector.instance.initNear();
    // @ts-ignore
    window.near = BlockChainConnector.instance;
    console.log("BlockChainConnector.instance", BlockChainConnector.instance);
    injector.bindModule(new ClickCounterRuntimeModule());
    injector.bindModule(new ButtonConnectWalletRuntimeModule());
    injector.bindSingleton("userService", StaticUserService);
    injector.bindSingleton("roleService", StaticRoleService);
  }
}

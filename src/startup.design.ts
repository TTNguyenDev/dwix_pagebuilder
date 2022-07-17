/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import "./polyfills";
import * as ko from "knockout";
import { InversifyInjector } from "@paperbits/common/injection";
import { CoreDesignModule } from "@paperbits/core/core.design.module";
import { FormsDesignModule } from "@paperbits/forms/forms.design.module";
import { EmailsDesignModule } from "@paperbits/emails/emails.design.module";
import { StylesDesignModule } from "@paperbits/styles/styles.design.module";
import { ProseMirrorModule } from "@paperbits/prosemirror/prosemirror.module";
import { OfflineModule } from "@paperbits/common/persistence/offline.module";
import { DemoDesignModule } from "./modules/demo.design.module";
import { BlockChainConnector } from "./utils/blockchain";
import { LoadingEffectUtils } from "./utils/loadingEffect";

/* Uncomment to enable Firebase module */
// import { FirebaseModule } from "@paperbits/firebase/firebase.module";

/* Initializing dependency injection  */
(async () => {
  const injector = new InversifyInjector();
  injector.bindModule(new CoreDesignModule());
  injector.bindModule(new FormsDesignModule());
  injector.bindModule(new EmailsDesignModule());
  injector.bindModule(new StylesDesignModule());
  injector.bindModule(new ProseMirrorModule());
  injector.bindModule(new DemoDesignModule());

  /* Uncomment to enable Firebase module */
  // injector.bindModule(new FirebaseModule());

  injector.bindModule(new OfflineModule({ autosave: false }));
  injector.resolve("autostart");
  document.addEventListener("DOMContentLoaded", () => {
    syncStorage(() => {
      setImmediate(() => ko.applyBindings(undefined, document.body));
    });
  });
})();

function syncStorage(onSuccess: () => void) {
  LoadingEffectUtils.show();
  const iframe = document.getElementById("iframe-sync-storage");

  iframe.addEventListener("load", () => {
    // @ts-ignore
    iframe?.contentWindow?.postMessage(
      {
        action: "get_data",
      },
      "*"
    );
  });

  window.addEventListener(
    "message",
    (event) => {
      console.log(event);
      const { action, data } = event.data;
      if (action == "return_data") {
        iframe.remove();
        console.log(data);
        Object.keys(data).forEach((key) => {
          localStorage.setItem(key, data[key]);
        });
        BlockChainConnector.instance.initNear();
        LoadingEffectUtils.hide();
        onSuccess();
      }
    },
    false
  );
}

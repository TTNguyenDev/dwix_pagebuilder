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
    setImmediate(() => ko.applyBindings(undefined, document.body));

    window.addEventListener(
      "message",
      (event) => {
        console.log(event);
        const { action, data } = event.data;
        if (action == "return_data") {
          console.log(data);
          Object.keys(data).forEach((key) => {
            localStorage.setItem(key, data[key]);
          });
        }
      },
      false
    );

    console.log("AAAAAAAAAAAAAAAAAAAAAAa");
    const iframe = document.getElementById("iframe-sync-storage");
    console.log(iframe);
    iframe.addEventListener("load", () => {
      console.log("LOADEDDDDDDDDDDDDDDDDDDDD");
      // @ts-ignore
      iframe?.contentWindow?.postMessage(
        {
          action: "get_data",
        },
        "*"
      );
    });
  });
})();

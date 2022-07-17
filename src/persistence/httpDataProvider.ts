/**
 * @license
 * Copyright Paperbits. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file and at https://paperbits.io/license/mit.
 */

import { HttpClient } from "@paperbits/common/http";
import { BlockChainConnector } from "../utils/blockchain";
import { IPFSUtils } from "../utils/ipfsUtils";

export class HttpDataProvider {
  private initPromise: Promise<void>;
  private dataObject: Object;

  constructor(private readonly httpClient: HttpClient) {}

  private async initialize(): Promise<void> {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = new Promise<void>(async (resolve) => {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");
      window.localStorage.setItem("project_id", id);
      // @ts-ignore
      window.process = { env: {} };

      let project: any;
      if (id) {
        try {
          project = await BlockChainConnector.instance.contract.get_project({
            project_id: id,
          });
          console.log(project);
        } catch (err) {
          console.log(err);
        }

        if (project?.data) {
          const response = await IPFSUtils.getDataByCID(project.data);
          this.dataObject = JSON.parse(response);
        } else {
          const response = await this.httpClient.send({
            url: "/data/demo.json",
            method: "GET",
          });
          this.dataObject = response.toObject();
        }
      } else {
        const response = await this.httpClient.send({
          url: "/data/demo.json",
          method: "GET",
        });
        this.dataObject = response.toObject();
      }

      resolve();
    });

    return this.initPromise;
  }

  public async getDataObject(): Promise<Object> {
    await this.initialize();

    return this.dataObject;
  }

  public async setDataObject(dataObject: Object): Promise<void> {
    this.dataObject = dataObject;
  }
}

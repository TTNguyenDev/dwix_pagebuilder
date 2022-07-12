import * as ko from "knockout";
import template from "./buttonConnectWalletEditor.html";
import { ButtonConnectWalletModel } from "./buttonConnectWalletModel";
import {
  Component,
  OnMounted,
  Param,
  Event,
} from "@paperbits/common/ko/decorators";
import { WidgetEditor } from "@paperbits/common/widgets";
import { ChangeRateLimit } from "@paperbits/common/ko/consts";
import { BackgroundStylePluginConfig } from "@paperbits/styles/plugins";
import { StyleHelper } from "@paperbits/styles";

@Component({
  selector: "button-connect-wallet-editor",
  template: template,
})
export class ButtonConnectWalletEditor
  implements WidgetEditor<ButtonConnectWalletModel>
{
  public readonly initialCount: ko.Observable<number>;
  public readonly background: ko.Observable<BackgroundStylePluginConfig>;

  constructor() {
    this.initialCount = ko.observable(0);
    this.background = ko.observable<BackgroundStylePluginConfig>();
  }

  @Param()
  public model: ButtonConnectWalletModel;

  @Event()
  public onChange: (model: ButtonConnectWalletModel) => void;

  @OnMounted()
  public async initialize(): Promise<void> {
    /*
           This method is called after component created. At this moment all the parameters,
           includinig "model", are available.
        */

    this.initialCount(this.model.initialCount);
    this.initialCount.extend(ChangeRateLimit).subscribe(this.applyChanges);

    const backgroundStyleConfig = StyleHelper.getPluginConfigForLocalStyles(
      this.model.styles,
      "background"
    );
    this.background(backgroundStyleConfig);
  }

  private applyChanges(): void {
    this.model.initialCount = this.initialCount();
    this.onChange(this.model);
  }

  public onBackgroundChange(pluginConfig: BackgroundStylePluginConfig): void {
    StyleHelper.setPluginConfigForLocalStyles(
      this.model.styles,
      "background",
      pluginConfig
    );
    this.onChange(this.model);
  }
}

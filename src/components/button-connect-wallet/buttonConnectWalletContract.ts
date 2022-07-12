import { Contract } from "@paperbits/common";
import { LocalStyles } from "@paperbits/common/styles";

export interface ButtonConnectWalletContract extends Contract {
  /**
   * Initial count.
   */
  initialCount: number;

  /**
   * Widget local styles.
   */
  styles?: LocalStyles;
}


export class LoadingEffectUtils {
  static show() {
    document.getElementById("full-page-loading").style.display = "flex";
  }

  static hide() {
    document.getElementById("full-page-loading").style.display = "none";
  }
}

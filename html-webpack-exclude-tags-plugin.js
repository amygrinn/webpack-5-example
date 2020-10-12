/**
 * Tyler J Grinn
 * tylergrinn@gmail.com
 * License: MIT
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { JSDOM } = require('jsdom');

/**
 * Remove all tags from your html webpack template which have an attribute named `dev`
 */
module.exports = class HtmlWebpackExcludeTagsPlugin {
  static PLUGIN_NAME = 'Html webpack exclude tags plugin';

  /**
   *
   * @param  {...string} selectors ***Selectors:** A list of css selectors to use to exclude tags from
   * an html-webpack-plugin template. By default, any html tag with the 'dev' attribute will be
   * removed
   */
  constructor(...selectors) {
    this.selectors = selectors.length > 0 ? selectors : ['[dev]'];
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(
      HtmlWebpackExcludeTagsPlugin.PLUGIN_NAME,
      (compilation) => {
        HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tap(
          HtmlWebpackExcludeTagsPlugin.PLUGIN_NAME,
          (data) => {
            const dom = new JSDOM(data.html);
            this.selectors.forEach((selector) => {
              dom.window.document.querySelectorAll(selector).forEach((node) => {
                node.parentNode.removeChild(node);
              });
            });

            data.html = dom.serialize();
            return data;
          }
        );
      }
    );
  }
};

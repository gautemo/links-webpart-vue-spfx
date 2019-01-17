import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'LinksWebpartVueSpfxWebPartStrings';

// Importing Vue.js
import Vue from 'vue';
// Improting Vue.js SFC
import LinksWebpartVueSpfxComponent from './components/LinksWebpartVueSpfx.vue';

export interface ILinksWebpartVueSpfxWebPartProps {
  description: string;
  list: string;
}

export default class LinksWebpartVueSpfxWebPart extends BaseClientSideWebPart<ILinksWebpartVueSpfxWebPartProps> {

  public render(): void {
    const id: string = `wp-${this.instanceId}`;
    this.domElement.innerHTML = `<div id="${id}"></div>`;

    const el = new Vue({
      el: `#${id}`,
      render: h => h(LinksWebpartVueSpfxComponent, {
        props: {
          description: this.properties.description,
          list: this.properties.list,
          context: this.context,
        }
      })
    });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('list', {
                  label: strings.PropertyPaneList
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
